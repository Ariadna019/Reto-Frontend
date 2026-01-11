class WcFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background: #111827; /* fondo oscuro */
          color: #f3f4f6;      /* texto claro */
          padding: 20px 40px;
          text-align: center;
          font-family: 'Inter', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        footer p {
          font-size: 14px;
          margin: 0;
        }

        footer a {
          color: #facc15; /* amarillo profesional */
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s;
        }

        footer a:hover {
          color: #fde68a; /* amarillo más claro al pasar el mouse */
        }

        @media (max-width: 600px) {
          footer {
            padding: 16px;
          }
        }
      </style>

      <footer>
        <p> Información de países proporcionada por <a href="https://restcountries.com" target="_blank">REST Countries API</a></p>
        <p>© 2026 Romina Romero. Todos los derechos reservados.</p>
      </footer>
    `;
  }
}

customElements.define('wc-footer', WcFooter);
