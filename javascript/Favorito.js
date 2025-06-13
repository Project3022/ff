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









function renderFavorites() {
  const favoriteList = document.getElementById('favoriteList');
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

  if (favoritos.length === 0) {
    favoriteList.innerHTML = '<p>No tienes productos favoritos aún.</p>';
    return;
  }

  favoriteList.innerHTML = '';

  favoritos.forEach((product, index) => {
    const price = (typeof product.price === 'number' ? product.price : 0).toFixed(2);

    const card = document.createElement('div');
    card.className = 'favorite-card';

    card.innerHTML = `
    <div class="tarjeta">
      <button class="remove-btn" title="Eliminar favorito" data-index="${index}">&times;</button>
      <img src="${product.img}" alt="${product.name}" />
      <div class="favorite-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>Precio: <strong>$${price}</strong></p>
        <a href="${product.buyLink}" target="_blank" class="buy-link">
          <button class="buy-button">💵 Comprar Ahora</button>
        </a>
        <button class="add-to-cart" data-index="${index}">🛒 Agregar al carrito</button>
      </div>
      </div>
    `;

    favoriteList.appendChild(card);
  });

  // Manejar eliminación de favoritos
  favoriteList.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
      const idx = btn.getAttribute('data-index');
      favoritos.splice(idx, 1);
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
      renderFavorites();
    });
  });

  // Manejar agregar al carrito
  favoriteList.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.getAttribute('data-index');
      let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
      const product = favoritos[idx];
      if (!product) return;

      // Crear el producto para el carrito
      const cartProduct = {
        id: product.id || Date.now() + Math.random(),
        name: product.name,
        img: product.img,
        price: product.price,
        size: product.description || 'N/A' // Ajusta según necesites
      };

      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(cartProduct);
      localStorage.setItem('cart', JSON.stringify(cart));

      alert(`${cartProduct.name} agregado al carrito`);
      // Aquí puedes llamar a renderCart() si tienes esa función para actualizar la UI del carrito
    });
  });
}

document.addEventListener('DOMContentLoaded', renderFavorites);
