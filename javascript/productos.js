const menuToggle = document.getElementById('menu-toggle');
const sideMenu = document.getElementById('side-menu');

menuToggle.addEventListener('click', () => {
  sideMenu.classList.toggle('open');
});


  const buttons = document.querySelectorAll('.submenu-buttons button');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      button.classList.add('active');

      const targetPage = button.getAttribute('data-url');
      window.location.href = targetPage; // Redirección
    });
  });





const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImage");
const modalClose = document.getElementById("modalClose");

document.querySelectorAll('.product-card img').forEach(img => {
  img.addEventListener('click', () => {
    modal.style.display = "block";
    modalImg.src = img.src;
    modalImg.alt = img.alt;
  });
});

modalClose.addEventListener('click', () => {
  modal.style.display = "none";
});

modal.addEventListener('click', e => {
  if (e.target === modal) modal.style.display = "none";
});


document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".product-card");

    const selectedTalla = card.querySelector(".product-info .talla.selected");
    let size = selectedTalla ? selectedTalla.dataset.talla : null;

    let name = card.querySelector(".tituloo")?.innerText || card.querySelector("img").alt || "Producto";
    let description = card.querySelector(".tallas")?.innerText || "";

    const priceText = card.querySelector(".precio strong").innerText;
    const price = parseFloat(priceText.replace("$", ""));

    const img = card.querySelector("img").src;

    // Si no hay talla seleccionada y el producto tiene tallas,
    // puedes asignar la primera talla automáticamente (para evitar null)
    if (!size) {
      const firstTalla = card.querySelector(".product-info .talla");
      size = firstTalla ? firstTalla.dataset.talla : description;
    }

    const id = Date.now() + Math.random();

    const product = { id, img, name, size, price };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${name} (Detalle: ${size}) agregado al carrito`);
    renderCart();
  });
});





document.querySelectorAll(".product-card").forEach(card => {
  let selectedTalla = null; // 🔴 esta variable vive dentro del scope del producto

  const tallas = card.querySelectorAll(".talla");
  tallas.forEach(span => {
    span.addEventListener("click", () => {
      tallas.forEach(t => t.classList.remove("selected"));
      span.classList.add("selected");
      selectedTalla = span.dataset.talla; // ✅ guarda la talla seleccionada
    });
  });

  const addToCartBtn = card.querySelector(".add-to-cart");
  addToCartBtn.addEventListener("click", () => {
    if (!selectedTalla) return; // ✅ verifica si hay talla seleccionada

    const product = {
      id: Date.now(),
      name: "Top Vital Seamless",
      size: selectedTalla,
      price: 1500,
      img: card.querySelector("img").src
    };

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  });
});

