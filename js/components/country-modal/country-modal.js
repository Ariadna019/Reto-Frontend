class CountryModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.country = null;
  }

  connectedCallback() {
     // Abre el modal cuando se recibe el evento
    window.addEventListener('open-country', (e) => {
      this.country = e.detail;
      this.render();
      this.open();
    });
    //Cerrar con ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });

    this.render();
  }

  render() {
    const country = this.country;

    // Convertir arrays/objetos a texto plano
    const languages = country?.languages
      ? Array.isArray(country.languages)
        ? country.languages.join(', ')
        : country.languages
      : 'N/A';

    const currencies = country?.currencies
      ? Array.isArray(country.currencies)
        ? country.currencies.join(', ')
        : country.currencies
      : 'N/A';

    const population = country?.population
      ? Number(country.population).toLocaleString()
      : 'N/A';

    this.shadowRoot.innerHTML = `
  <style>
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: none;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .overlay.active { display: flex; animation: fadeIn 0.2s; }
        @keyframes fadeIn { from {opacity: 0;} to {opacity:1;} }

        .modal {
          background: white;
          border-radius: 12px;
          width: 90%;
          max-width: 420px;
          padding: 24px;
          position: relative;
          box-shadow: 0 10px 40px rgba(0,0,0,0.35);
          text-align: center;
        }
       
          
      
          .close-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: none;       
          border: none;          
          color: #374151;        
          font-size: 22px;       
          font-weight: bold;
          cursor: pointer;
          transition: color 0.2s ease, transform 0.2s ease;
        }
        .close-btn:hover {
          color: #111827;         
          transform: scale(1.1);  
        }

        img { width: 70%; 
        height: 160px; 
        object-fit: cover;
         border-radius: 8px; 
         margin-bottom: 18px; 
         }
       
        h2 { 
        font-size: 22px;
         margin-bottom: 12px; 
         }
        p { 
        font-size: 14px; 
        color: #374151; 
        margin: 6px 0; }
        strong { color: #111827; }
     
        </style>

      <div class="overlay" id="overlay">
        <div class="modal">
          <button class="close-btn" id="close">✕</button>

          ${country ? `
            <img src="${country.flag}" alt="${country.name}">
            <h2>${country.name}</h2>
            <div class="info">
              <p><strong>Capital:</strong> ${country.capital || 'N/A'}</p>
              <p><strong>Población:</strong> ${population}</p>
              <p><strong>Región:</strong> ${country.region || 'N/A'}</p>
              <p><strong>Subregión:</strong> ${country.subregion || 'N/A'}</p>
              <p><strong>Idiomas:</strong> ${languages}</p>
              <p><strong> Monedas:</strong> ${currencies}</p>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    // Cerrar modal
    const overlay = this.shadowRoot.getElementById('overlay');
    const closeBtn = this.shadowRoot.getElementById('close');

    closeBtn?.addEventListener('click', () => this.close());
    overlay?.addEventListener('click', (e) => {
      if (e.target === overlay) this.close();
    });
  }

  open() {
    const overlay = this.shadowRoot.getElementById('overlay');
    if (overlay) overlay.classList.add('active');
  }

  close() {
    const overlay = this.shadowRoot.getElementById('overlay');
    if (overlay) overlay.classList.remove('active');
  }
}

customElements.define('country-modal', CountryModal);
