import './components/country-card/country-card.js';
import './components/country-modal/country-modal.js';
import './components/footer.js'; 
import './components/wc-main.js';


document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('change-view', (e) => {
    document.getElementById('title-main').textContent =
      e.detail === 'Inicio'
        ? '🌎 Todos los Paises de America '
        : 'Países Favoritos 🌎';
  });
});
