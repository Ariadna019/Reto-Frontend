import './country-card/country-card.js';

class WcMain extends HTMLElement {

      // Constructor: inicializa variables y Shadow DOM
  constructor() {
    super();

    // Variables del componente
    this.attachShadow({ mode: 'open' });
    this.countries = [];
    this.view = 'Inicio'; // Vista actual: 'Inicio' o 'Favoritos'
    this.currentPage = 1;
    this.itemsPerPage = 10;
  }

  connectedCallback() {
    this.loadCountries(); // Carga los países al inicio

    window.addEventListener('change-view', e => {
      this.view = e.detail;
      this.currentPage = 1; // reinica la pagina al cambiar vista
      this.render();
    });

    //se actualiza la vista al actualizar los favoritos eso es ayutoamtico
    window.addEventListener('favorites-updated', () => {
      this.render();
    });
  }
// LISTADO DE PAISES
  async loadCountries() {
    try {
      const res = await fetch('https://restcountries.com/v3.1/region/americas');
      if (!res.ok) throw new Error(`Error ${res.status}`);
      this.countries = await res.json();
      this.render();
    } catch (error) {
      console.error('Error cargando países:', error);
      this.shadowRoot.innerHTML = '<p style="color:red;padding:20px;">Error al cargar países. Intenta recargar.</p>';
    }
  }




// Persistencia con LocalStorage
  render() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    //filtra la lista segun la vista de fvoritos 
    const list =
      this.view === 'Favoritos'
        ? this.countries.filter(c => favorites.includes(c.name.common))
        : this.countries;

    // esto permite que se haga la paginacion
    const totalPages = Math.ceil(list.length / this.itemsPerPage);
    if (this.currentPage > totalPages) this.currentPage = totalPages || 1;

    const start = (this.currentPage - 1) * this.itemsPerPage;

    
    const end = start + this.itemsPerPage;
    const pageItems = list.slice(start, end);


    // renderiza todo el html del coponente con el sahdow dow
    this.shadowRoot.innerHTML = `
         <style>
        .nav {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin: 20px 0;
          padding-left: 100px; 
        }
        .nav button {
          padding: 16px 16px;
          cursor: pointer;
          border-radius: 6px;
          border: none;
          font-weight: bold;
          transition: background 0.3s;
          background: #374151;
          color: white;
        }
        .nav button.active { background: #facc15; color: #1f2937; }

        .countries {
          display: flex;
          flex-wrap: wrap;
          justify-content: center; /* CENTRAR TODAS LAS CARDS */
          gap: 20px;
          margin: 0 auto;
        }

         .cards-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);  /* 3 columnas */
        gap: 20px;
        max-width: 1200px;
        margin: 0 auto;  /* ✅ CENTRA HORIZONTALMENTE */
    }

        .empty {
          text-align: center;
          margin-top: 40px;
          font-size: 18px;
          color: #374151;
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 14px;
          margin: 32px 0;
          font-family: system-ui, sans-serif;
        }

        .pagination button {
          padding: 6px 14px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          background: #374151;
          color: white;
          font-weight: bold;
          transition: background 0.3s;
        }

        .pagination button:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }
      </style>

 <!-- Barra de navegación -->

      <div class="nav">
        <button id="inicio" class="${this.view === 'Inicio' ? 'active' : ''}">Inicio</button>
        <button id="favoritos" class="${this.view === 'Favoritos' ? 'active' : ''}">Favoritos</button>
      </div>

      ${
        list.length === 0 && this.view === 'Favoritos'
          ? `<div class="empty">
                <p>No tienes países favoritos ⭐</p>
                <button id="volver">Volver a Inicio</button>
             </div>`
          : `<div class="countries">
                ${pageItems.map(country => `
                  <country-card
                    name="${country.name.common}"
                    flag="${country.flags.svg}"
                    capital="${country.capital?.[0] || 'N/A'}"
                    population="${country.population}"
                    region="${country.region || 'N/A'}"
                    subregion="${country.subregion || 'N/A'}"
                    languages="${country.languages ? Object.values(country.languages).join(', ') : 'N/A'}"
                    currencies="${country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}">
                  </country-card>
                `).join('')}
             </div>

             <div class="pagination">
               <button id="prev" ${this.currentPage === 1 ? 'disabled' : ''}>Anterior</button>
               <span>Página ${this.currentPage} de ${totalPages}</span>
               <button id="next" ${this.currentPage === totalPages ? 'disabled' : ''}>Siguiente</button>
             </div>`
      }
    `;

    // --- Eventos navegación ---
    this.shadowRoot.getElementById('inicio')
      ?.addEventListener('click', () => window.dispatchEvent(new CustomEvent('change-view', { detail: 'Inicio' })));

    this.shadowRoot.getElementById('favoritos')
      ?.addEventListener('click', () => window.dispatchEvent(new CustomEvent('change-view', { detail: 'Favoritos' })));

    this.shadowRoot.getElementById('volver')
      ?.addEventListener('click', () => window.dispatchEvent(new CustomEvent('change-view', { detail: 'Inicio' })));

    this.shadowRoot.getElementById('prev')
      ?.addEventListener('click', () => {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.render();
        }
      });

    this.shadowRoot.getElementById('next')
      ?.addEventListener('click', () => {
        if (this.currentPage < totalPages) {
          this.currentPage++;
          this.render();
        }
      });
  }
}

customElements.define('wc-main', WcMain);
