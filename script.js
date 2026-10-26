// HYACINTHETIC CROCHET SHOP
// SAMPLE PRODUCTS
// Change the names, prices, colors, and pictures to your own.
const products = [
  {
    id: 1,
    name: "JELLYFISH BAG",
    category: "Bags",
    price: 500,
    description: "A handmade tote bag for everyday use and inspired by jellyfish.",
    colors: [
      "Deep blue",
      "light blue",
      "orange",
      "pink",
      "Lavender Purple",
      "Sunflower Yellow",
    
    ],
    images: [
      "photo 1.jpg",  
      "photo 2.jpg", 
      "photo 3.jpg",  
      "photo 4.jpg", 
      "photo 5.jpg",  
      "photo 6.jpg"   
    ]
  },
  {
    id: 2,
    name: "JELLYFISH KEYCHAIN",
    category: "Keychain",
    price: 150,
    description: "Tiny jellyfish charm — handmade to match your bag. Soft, squishy, and totally adorable.",
    colors: ["Deep blue", "green", "Butter Yellow", "pink", "purple", "yellow"],
    images: [
      "photo 7.jpg",  
      "photo 8.jpg", 
      "photo 9.jpg",  
      "photo 10.jpg", 
      "photo 11.jpg",  
      "photo 12.jpg"   
    ]
  },
  {
    id: 3,
    name: "ANIMAL PLUSHIE",
    category: "Plushie",
    price: 180,
    description: "Meet your new stress reliever! Hand-crocheted cat and pig plushie made with soft, smooth yarn — perfectly sized to hold, display, or gift. Stuffed plump and sewn securely so it stays for years  — a warm, quiet friend to keep you company every day.",
    colors: ["CAT", "PIG"],
    images: [
      "photo 13.jpg",  
      "photo 14.jpg"
    
    ]
  },
  {
    id: 4,
    name: "FLOWER BANDANA",
    category: "Wearable",
    price: 380,
    description: "Handmade floral bandana — soft, pretty, and easy to tie.",
    colors: ["green (daisy)", "white (sunflower)"],
    images: [
      "photo 15.jpg",  
      "photo 16.jpg", 
      "photo 17.jpg",  
      "photo 18.jpg"  
    ]
  },
  {
    id: 5,
    name: "TULIP HEADBAND ",
    category: "Wearable",
    price: 150,
    description: "Handmade tulip headband features delicate floral details and a soft, stretchy fit. It adds a sweet, charming touch to any outfit while staying comfortable all day.",
    colors: ["blue", "Brown", "purple", "red"],
   images: [
      "photo 19.jpg",  
      "photo 20.jpg", 
      "photo 21.jpg",  
      "photo 22.jpg",
      "photo 23.jpg"
    ]
  },
  {
    id: 6,
    name: "VINTAGE FLOWER CLIP",
    category: "Wearable",
    price: 80   ,
    description: "Handmade vintage flower clip with delicate retro charm and soft textured petals. It’s a timeless little accent that beautifully elevates your hair, bag, or outfit.",
    colors: ["blue", "pink", "purple", "red", "yellow"],
    images: [
      "photo 24.jpg",  
      "photo 25.jpg", 
      "photo 26.jpg",  
      "photo 27.jpg",
      "photo 28.jpg",
      "photo 29.jpg"
    ]
  },
 
];

// VARIABLES
let selectedProduct = null;
let selectedColor = "";
let selectedQuantity = 1;
let toastTimer;
const productGrid = document.getElementById("productGrid");
const productModal = document.getElementById("productModal");
const cartCount = document.getElementById("cartCount");
const toast = document.getElementById("toast");

// LOAD SAVED CART
let cart = [];
try {
  cart = JSON.parse(localStorage.getItem("hyacintheticCart")) || [];
} catch (error) {
  cart = [];
}

// FORMAT PRICE
function formatPrice(price) {
  return "₱" + price.toLocaleString("en-PH");
}

// SAVE CART
function saveCart() {
  localStorage.setItem("hyacintheticCart", JSON.stringify(cart));
  updateCartCount();
}

// UPDATE NUMBER ON CART BUTTON
function updateCartCount() {
  let totalItems = 0;
  cart.forEach(function(item) {
    totalItems += item.quantity;
  });
  cartCount.textContent = totalItems;
}

// SHOW MESSAGE
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function() {
    toast.classList.remove("show");
  }, 2500);
}

// SWITCH BETWEEN PAGES
function showPage(pageName) {
  document.querySelectorAll(".page").forEach(function(page) {
    page.classList.add("hidden");
  });
  document.getElementById(pageName + "Page").classList.remove("hidden");
  document.getElementById("mainNav").classList.remove("open");
  if (pageName === "cart") {
    renderCart();
  }
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// DISPLAY PRODUCTS
function renderProducts(category = "All") {
  let filteredProducts = products;
  if (category !== "All") {
    filteredProducts = products.filter(function(product) {
      return product.category === category;
    });
  }
  document.getElementById("productHeading").textContent =
    category === "All" ? "Our products" : category;
  document.getElementById("productEyebrow").textContent =
    category === "All" ? "MADE WITH CARE" : "EXPLORE THE COLLECTION";
  document.querySelectorAll(".category-card").forEach(function(card) {
    card.classList.toggle(
      "active",
      card.dataset.category === category
    );
  });
  productGrid.innerHTML = "";
  filteredProducts.forEach(function(product) {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-image-wrap">
        <img
          class="product-image"
          src="${product.images[0]}"
          alt="${product.name}"
          loading="lazy">
        <span class="product-tag">${product.category}</span>
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.colors.length} color options available</p>
        <div class="product-bottom">
          <span class="price">${formatPrice(product.price)}</span>
          <button class="view-button">
            View product
          </button>
        </div>
      </div>
    `;
    card.querySelector(".view-button").addEventListener("click", function() {
      openProduct(product.id);
    });
    productGrid.appendChild(card);
  });
}

// OPEN PRODUCT DETAILS
function openProduct(productId) {
  selectedProduct = products.find(function(product) {
    return product.id === productId;
  });
  if (!selectedProduct) return;
  selectedColor = selectedProduct.colors[0];
  selectedQuantity = 1;
  document.getElementById("modalCategory").textContent =
    selectedProduct.category;
  document.getElementById("modalTitle").textContent =
    selectedProduct.name;
  document.getElementById("modalPrice").textContent =
    formatPrice(selectedProduct.price);
  document.getElementById("modalDescription").textContent =
    selectedProduct.description;
  document.getElementById("modalQuantity").textContent = selectedQuantity;

  // MAIN PRODUCT PHOTO
  const mainImage = document.getElementById("mainProductImage");
  mainImage.src = selectedProduct.images[0];
  mainImage.alt = selectedProduct.name;

  // PRODUCT PHOTO THUMBNAILS
  const thumbnails = document.getElementById("thumbnailRow");
  thumbnails.innerHTML = "";
  selectedProduct.images.forEach(function(image, index) {
    const button = document.createElement("button");
    if (index === 0) {
      button.classList.add("active");
    }
    button.innerHTML = `<img src="${image}" alt="Product photo ${index + 1}">`;
    button.addEventListener("click", function() {
      mainImage.src = image;
      thumbnails.querySelectorAll("button").forEach(function(item) {
        item.classList.remove("active");
      });
      button.classList.add("active");
    });
    thumbnails.appendChild(button);
  });

  // COLOR OPTIONS
  const colorOptions = document.getElementById("colorOptions");
  colorOptions.innerHTML = "";
  selectedProduct.colors.forEach(function(color) {
    const button = document.createElement("button");
    button.className = "color-chip";
    button.textContent = color;
    if (color === selectedColor) {
      button.classList.add("selected");
    }
    button.addEventListener("click", function() {
      selectedColor = color;
      colorOptions.querySelectorAll("button").forEach(function(item) {
        item.classList.remove("selected");
      });
      button.classList.add("selected");
    });
    colorOptions.appendChild(button);
  });

  productModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

// CLOSE PRODUCT POPUP
function closeProduct() {
  productModal.classList.add("hidden");
  document.body.style.overflow = "";
}

// ADD PRODUCT TO CART
function addSelectedProduct(goToCart = false) {
  if (!selectedProduct) return;
  const existingItem = cart.find(function(item) {
    return item.productId === selectedProduct.id &&
           item.color === selectedColor;
  });
  if (existingItem) {
    existingItem.quantity += selectedQuantity;
  } else {
    cart.push({
      productId: selectedProduct.id,
      name: selectedProduct.name,
      category: selectedProduct.category,
      price: selectedProduct.price,
      image: selectedProduct.images[0],
      color: selectedColor,
      quantity: selectedQuantity
    });
  }
  saveCart();
  const productName = selectedProduct.name;
  closeProduct();
  showToast(productName + " added to your cart!");
  if (goToCart) {
    showPage("cart");
  }
}

// CHANGE CART QUANTITY
function changeCartQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
  renderCart();
}

// DELETE CART ITEM
function deleteCartItem(index) {
  const removedName = cart[index].name;
  cart.splice(index, 1);
  saveCart();
  renderCart();
  showToast(removedName + " removed from cart.");
}

// FIND SIMILAR PRODUCTS
function findSimilar(category) {
  closeProduct();
  showPage("home");
  renderProducts(category);
  document.getElementById("productSection").scrollIntoView({
    behavior: "smooth"
  });
}

// DISPLAY SHOPPING CART
function renderCart() {
  const cartContents = document.getElementById("cartContents");
  if (cart.length === 0) {
    cartContents.innerHTML = `
      <div class="empty-cart">
        <h2>Your cart is waiting for something cute.</h2>
        <p class="muted">You haven't added any products yet.</p>
        <button class="primary-button" id="continueShopping">
          Explore products
        </button>
      </div>
    `;
    document.getElementById("continueShopping").addEventListener("click", function() {
      showPage("home");
    });
    return;
  }
  let subtotal = 0;
  let totalQuantity = 0;
  let rows = "";
  cart.forEach(function(item, index) {
    const total = item.price * item.quantity;
    subtotal += total;
    totalQuantity += item.quantity;
    rows += `
      <tr>
        <td>
          <div class="cart-product">
            <img src="${item.image}" alt="${item.name}">
            <div>
              <strong>${item.name}</strong>
              <small>${item.color}</small>
            </div>
          </div>
        </td>
        <td>${formatPrice(item.price)}</td>
        <td>
          <div class="quantity-control">
            <button data-action="minus" data-index="${index}">−</button>
            <span>${item.quantity}</span>
            <button data-action="plus" data-index="${index}">+</button>
          </div>
        </td>
        <td><strong>${formatPrice(total)}</strong></td>
        <td>
          <button class="delete-button"
            data-action="delete" data-index="${index}">
            Delete
          </button>
          <button class="similar-button"
            data-action="similar" data-category="${item.category}">
            Find similar
          </button>
        </td>
      </tr>
    `;
  });
  cartContents.innerHTML = `
    <div class="cart-table-wrap">
      <table class="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Unit price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="cart-summary">
      <div class="summary-card">
        <div class="summary-line">
          <span>Items</span>
          <span>${totalQuantity}</span>
        </div>
        <div class="summary-line">
          <span>Subtotal</span>
          <span>${formatPrice(subtotal)}</span>
        </div>
        <div class="summary-line">
          <span>Shipping</span>
          <span>Calculated separately</span>
        </div>
        <div class="summary-total">
          <span>Total</span>
          <span>${formatPrice(subtotal)}</span>
        </div>
        <button class="primary-button full-button" id="checkoutButton">
          Proceed to checkout
        </button>
        <button class="secondary-button full-button" id="continueShoppingButton">
          Continue shopping
        </button>
      </div>
    </div>
  `;
  // CART BUTTONS
  cartContents.querySelectorAll("[data-action]").forEach(function(button) {
    button.addEventListener("click", function() {
      const index = Number(button.dataset.index);
      const action = button.dataset.action;
      if (action === "minus") {
        changeCartQuantity(index, -1);
      }
      if (action === "plus") {
        changeCartQuantity(index, 1);
      }
      if (action === "delete") {
        deleteCartItem(index);
      }
      if (action === "similar") {
        findSimilar(button.dataset.category);
      }
    });
  });
  document.getElementById("continueShoppingButton").addEventListener("click", function() {
    showPage("home");
  });
  document.getElementById("checkoutButton").addEventListener("click", function() {
    showToast("Checkout is a demo. Connect an order service to receive real orders.");
  });
}

// NAVIGATION LINKS
document.querySelectorAll("[data-page]").forEach(function(link) {
  link.addEventListener("click", function(event) {
    event.preventDefault();
    showPage(link.dataset.page);
  });
});

// CATEGORY BUTTONS
document.querySelectorAll(".category-card").forEach(function(card) {
  card.addEventListener("click", function() {
    renderProducts(card.dataset.category);
    document.getElementById("productSection").scrollIntoView({
      behavior: "smooth"
    });
  });
});

// SHOW ALL PRODUCTS
document.getElementById("showAll").addEventListener("click", function() {
  renderProducts("All");
});

// EXPLORE BUTTON
document.getElementById("shopNow").addEventListener("click", function() {
  document.getElementById("collections").scrollIntoView({
    behavior: "smooth"
  });
});

// MOBILE MENU
document.getElementById("menuToggle").addEventListener("click", function() {
  document.getElementById("mainNav").classList.toggle("open");
});

// CLOSE PRODUCT POPUP
document.getElementById("closeModal").addEventListener("click", closeProduct);
productModal.addEventListener("click", function(event) {
  if (event.target === productModal) {
    closeProduct();
  }
});

// DECREASE QUANTITY
document.getElementById("modalMinus").addEventListener("click", function() {
  if (selectedQuantity > 1) {
    selectedQuantity--;
  }
  document.getElementById("modalQuantity").textContent = selectedQuantity;
});

// INCREASE QUANTITY
document.getElementById("modalPlus").addEventListener("click", function() {
  selectedQuantity++;
  document.getElementById("modalQuantity").textContent = selectedQuantity;
});

// ADD TO CART BUTTON
document.getElementById("addToCartButton").addEventListener("click", function() {
  addSelectedProduct(false);
});

// BUY NOW BUTTON
document.getElementById("buyNowButton").addEventListener("click", function() {
  addSelectedProduct(true);
});

// CURRENT YEAR IN FOOTER
document.getElementById("year").textContent = new Date().getFullYear();

// START WEBSITE
renderProducts();
updateCartCount();