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
      const img = card.querySelector("img").getAttribute("src");
      const name = "Producto"; // Aquí reemplazas el nombre original
      const size = card.querySelector(".tallas")?.innerText || "Sin talla";
      const priceText = card.querySelector(".precio strong").innerText;
      const price = parseFloat(priceText.replace("$", ""));
      const id = Date.now() + Math.random(); // ID único

      const product = { id, img, name, size, price };
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));

      alert(`${name} agregado al carrito`);
    });
  });

