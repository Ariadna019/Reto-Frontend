import './Components/wc-main.js';
import './Components/country-modal/country-modal.js';
import './Components/footer.js';


document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('change-view', (e) => {
    document.getElementById('title-main').textContent =
      e.detail === 'Inicio'
        ? '🌎 Todos los Paises de America '
        : 'Países Favoritos 🌎';
  });
});
