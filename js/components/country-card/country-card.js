class CountryCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  toggleFavorite(name, e) {
    // Evitar que el click en la estrella abra el modal
    e.stopPropagation();

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.includes(name)) {
      favorites = favorites.filter(f => f !== name);
    } else {
      favorites.push(name);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));

    // Avisamos a la app que cambió algo
    window.dispatchEvent(new CustomEvent('favorites-updated'));

    this.render();
  }

  render() {
    const name = this.getAttribute('name');
    const flag = this.getAttribute('flag');
    const capital = this.getAttribute('capital');
    const population = this.getAttribute('population');
    const region = this.getAttribute('region');
    const subregion = this.getAttribute('subregion');
    const languages = this.getAttribute('languages');
    const currencies = this.getAttribute('currencies');

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFav = favorites.includes(name);

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
          text-align: center;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          position: relative;
          overflow: hidden;
           padding-bottom: 12px; 
          
        }
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }
        .star {
            position: absolute;
            top: 12px;       /* un poquito más abajo */
            right: 16px;     /* más alejada del borde derecho */
            cursor: pointer;
            font-size: 28px; /* ligeramente más pequeña para que no domine */
            color: ${isFav ? 'gold' : '#ccc'};
            transition: transform 0.2s;
            }

        .star:hover { transform: scale(1.2); }
        img {
          width: 100%;
          height: 140px;
          object-fit: cover;
        }
        h3 {
        margin: 10px 8px 6px 8px;  
         margin: 10px 0; 
         font-size: 18px; 
         color: #111827;
         text-align: center;
        width: calc(100% - 16px);  /* asegura que tenga espacio dentro de la tarjeta */
        line-height: 1.2em;  
          
         
         }

        p { 
        font-size: 14px;
         color: #374151; 
         margin: 4px 0; 
         font-bold; }

      </style>

      <div class="card">
        <span class="star">★</span>
        <img src="${flag}">
        <h3>${name}</h3>
        <p>${capital}</p>
        <p>👥 ${Number(population).toLocaleString()}</p>
      </div>
    `;

    // Click en estrella para favoritos
    this.shadowRoot.querySelector('.star')
      .addEventListener('click', (e) => this.toggleFavorite(name, e));

    // Click en nombre para abrir modal
    this.shadowRoot.querySelector('h3')
      .addEventListener('click', () => {
        const country = { name, flag, capital, population, region, subregion, languages, currencies };
        window.dispatchEvent(new CustomEvent('open-country', { detail: country }));
      });
  }
}

customElements.define('country-card', CountryCard);
