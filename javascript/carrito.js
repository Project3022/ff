// 👉 Menú lateral
const menuToggle = document.getElementById('menu-toggle');
const sideMenu = document.getElementById('side-menu');

menuToggle.addEventListener('click', () => {
  sideMenu.classList.toggle('open');
});

// 👉 Submenú (si existe .submenu-buttons)
const submenuLinks = document.querySelectorAll('.submenu-buttons a');
submenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    submenuLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// 👉 Carrito
const carritoDiv = document.getElementById("carrito");
const totalSpan = document.getElementById("total");
const comprarBtn = document.getElementById("comprarBtn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  carritoDiv.innerHTML = "";
  let total = 0;
  let mensaje = "*🧾 FACTURA DE COMPRA*%0A%0A";
  let productosParaFactura = [];

  if (cart.length === 0) {
    carritoDiv.innerHTML = "<p style='text-align:center;'>🛒 Tu carrito está vacío.</p>";
    totalSpan.textContent = "0";
    comprarBtn.style.display = "none";
    return;
  }

  cart.forEach((product, index) => {
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
    mensaje += `*${index + 1}. ${product.name}*%0A📏 Talla: ${product.size}%0A💵 Precio: $${product.price.toFixed(2)}%0A%0A`;

    productosParaFactura.push({
      name: product.name,
      size: product.size,
      price: product.price,
      img: product.img
    });
  });

  mensaje += `*💰 Total: $${total.toFixed(2)}*%0A%0A📸 Ver factura con fotos aquí:%0A`;

  // ⚠️ CAMBIA esta URL a la real de tu GitHub Pages
  const urlBase = "https://TUUSUARIO.github.io/TUREPO/factura.html";
  const facturaURL = `${urlBase}?productos=${encodeURIComponent(JSON.stringify(productosParaFactura))}&total=${total.toFixed(2)}`;
  mensaje += facturaURL;

  totalSpan.textContent = total.toFixed(2);
  comprarBtn.style.display = "block";
  comprarBtn.href = `https://wa.me/8292308873?text=${mensaje}`;

  document.querySelectorAll(".eliminar-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      cart = cart.filter(product => product.id != id);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });
  });
}

// ✅ Ejecutar al cargar
renderCart();
