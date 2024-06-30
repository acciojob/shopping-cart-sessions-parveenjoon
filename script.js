// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Initialize cart from session storage or set to empty array
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price.toFixed(2)} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = "";
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-from-cart-btn");
    removeBtn.setAttribute("data-id", item.id);
    li.appendChild(removeBtn);
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const productToAdd = products.find((product) => product.id === productId);
  if (productToAdd) {
    cart.push({ id: productToAdd.id, name: productToAdd.name, price: productToAdd.price });
    saveCartToSessionStorage();
    renderCart();
  }
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCartToSessionStorage();
  renderCart();
}

// Clear cart
function clearCart() {
  cart = [];
  saveCartToSessionStorage();
  renderCart();
}

// Save cart to session storage
function saveCartToSessionStorage() {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Event delegation for Add to Cart and Remove from Cart buttons
productList.addEventListener("click", function(event) {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(event.target.getAttribute("data-id"));
    addToCart(productId);
  }
});

cartList.addEventListener("click", function(event) {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const productId = parseInt(event.target.getAttribute("data-id"));
    removeFromCart(productId);
  }
});

clearCartBtn.addEventListener("click", function() {
  clearCart();
});

// Initial render
renderProducts();
renderCart();
