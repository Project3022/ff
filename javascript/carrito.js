

const menuToggle = document.getElementById('menu-toggle');
const sideMenu = document.getElementById('side-menu');

menuToggle.addEventListener('click', () => {
  sideMenu.classList.toggle('open');
});

// Submenú funcional si usas <a>
const submenuLinks = document.querySelectorAll('.submenu-buttons a');
submenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    submenuLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});



let mensaje = "*🧾 FACTURA DE COMPRA*%0A%0A";
let productosParaFactura = [];

cart.forEach((product, index) => {
  mensaje += `*${index + 1}. ${product.name}*%0A`;
  mensaje += `📏 Talla: ${product.size}%0A`;
  mensaje += `💵 Precio: $${product.price.toFixed(2)}%0A%0A`;

  total += product.price;

  productosParaFactura.push({
    name: product.name,
    size: product.size,
    price: product.price,
    img: product.img
  });
});

mensaje += `*💰 Total: $${total.toFixed(2)}*%0A%0A`;
mensaje += `📸 Ver factura con fotos aquí:%0A`;

// REEMPLAZA ESTA URL con tu URL real de GitHub Pages
const urlBase = "https://tuusuario.github.io/tu-repo/factura.html";
const facturaURL = `${urlBase}?productos=${encodeURIComponent(JSON.stringify(productosParaFactura))}&total=${total.toFixed(2)}`;
mensaje += facturaURL;

comprarBtn.href = `https://wa.me/8292308873?text=${mensaje}`;








const carritoDiv = document.getElementById("carrito");
    const totalSpan = document.getElementById("total");
    const comprarBtn = document.getElementById("comprarBtn");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCart() {
      carritoDiv.innerHTML = "";
      let total = 0;
      let mensaje = "Hola, quiero comprar:%0A";

      if (cart.length === 0) {
        carritoDiv.innerHTML = "<p style='text-align:center;'>🛒 Tu carrito está vacío.</p>";
        totalSpan.textContent = "0";
        comprarBtn.style.display = "none";
        return;
      }

      cart.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
          <img src="${product.img}" alt="${product.name}">
          <div class="product-info">
            <p><strong>${product.name}</strong></p>
            <p>Talla: ${product.size}</p>
            <p>Precio: <strong>$${product.price.toFixed(2)}</strong></p>
          </div>
          <button class="eliminar-btn" data-id="${product.id}">Eliminar</button>
        `;

        carritoDiv.appendChild(card);
        total += product.price;
        mensaje += `• ${product.name} (Talla ${product.size}) - $${product.price.toFixed(2)}%0A`;
      });

      totalSpan.textContent = total.toFixed(2);
      mensaje += `%0ATotal: $${total.toFixed(2)}`;
      comprarBtn.href = `https://wa.me/8292308873?text=${mensaje}`; // ← Reemplaza con tu número

      document.querySelectorAll(".eliminar-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-id");
          cart = cart.filter(product => product.id != id);
          localStorage.setItem("cart", JSON.stringify(cart));
          renderCart();
        });
      });
    }

    renderCart();

