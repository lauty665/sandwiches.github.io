    const products = [
      // Sándwiches simples
      { id: 1, name: "Lomito Simple", description: "Con papas fritas", price: 8000, image: "IMAGENES/Lomito1.jpg" },
      { id: 2, name: "Milanesa Simple", description: "Con papas fritas", price: 7000, image: "IMAGENES/Milanesa1.jpg" },

      // Sándwiches completos
      { id: 3, name: "Lomito Completo", description: "Con papas fritas", price: 9500, image: "IMAGENES/Milanesa2.jpg" },
      { id: 4, name: "Milanesa Completo", description: "Con papas fritas", price: 8500, image: "IMAGENES/Completos.jpg" },

      // Promos
      { id: 5, name: "Promo 1", description: "Sandwiches + Bebidas", price: 15000, image: "IMAGENES/Menu.jpg" },
      { id: 6, name: "Promo 2", description: "Sandwiches + Papas + Gaseosa", price: 18000, image: "IMAGENES/Menupromo.jpg" }
    ];

    let cart = [];
    const productsGrid = document.getElementById("products-grid");
    const cartItemsList = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const cartCountElement = document.getElementById("cart-count");
    const cartToggleBtn = document.querySelector(".cart-toggle-btn");
    const cartContent = document.querySelector(".cart-content");

    function renderProducts() {
      productsGrid.innerHTML = "";
      products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <div class="card-content">
            <h3>${product.name}</h3>
            <p class="description">${product.description}</p>
            <p class="price">$${product.price.toLocaleString('es-AR')}</p>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Agregar al Carrito</button>
          </div>
        `;
        productsGrid.appendChild(card);
      });
    }

    function updateCart() {
      cartItemsList.innerHTML = "";
      let total = 0;
      if (cart.length === 0) {
        cartItemsList.innerHTML = "<p style='color:#999; font-size:.9rem; text-align:center;'>Tu carrito está vacío.</p>";
      } else {
        cart.forEach((item, index) => {
          const li = document.createElement("li");
          li.className = "cart-item";
          li.innerHTML = `
            <div class="item-info">
              <span class="name">${item.name}</span>
              <span class="price">$${item.price.toLocaleString('es-AR')}</span>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})">❌</button>
          `;
          cartItemsList.appendChild(li);
          total += item.price;
        });
      }
      totalPriceElement.textContent = `$${total.toLocaleString('es-AR')}`;
      cartCountElement.textContent = cart.length;
    }

    function addToCart(id) {
      const product = products.find(p => p.id === id);
      if (product) {
        cart.push(product);
        updateCart();
      }
    }

    function removeFromCart(index) {
      cart.splice(index, 1);
      updateCart();
    }

    cartToggleBtn.addEventListener("click", () => {
      cartContent.classList.toggle("show");
    });

    function sendToWhatsApp() {
      if (cart.length === 0) {
        alert("El carrito está vacío.");
        return;
      }
      const phone = "5493584924766";
      const messageItems = cart.map((item, i) => `${i + 1}. ${item.name} - $${item.price.toLocaleString('es-AR')}`).join("%0A");
      const total = cart.reduce((acc, item) => acc + item.price, 0);
      const url = `https://wa.me/${phone}?text=Pedido:%0A${messageItems}%0A%0ATotal: $${total.toLocaleString('es-AR')}`;
      window.open(url, "_blank");
    }

    document.addEventListener("DOMContentLoaded", () => {
      renderProducts();
      updateCart();
    });