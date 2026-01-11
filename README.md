# Reto Frontend: Aplicación Web de Países de América

## Descripción
Esta aplicación permite explorar información detallada de los países del continente americano usando la API pública [restcountries.com](https://restcountries.com/).  
Está desarrollada con **JavaScript nativo y Web Components**, sin frameworks.

## Características principales
- Listado de países de América con paginación.
- Visualización de bandera, nombre, capital y población.
- Modal con información detallada del país: capital, población, región, subregión, idiomas y monedas.
- Sistema de favoritos que se guarda en **localStorage**.
- Navegación sin recargar la página.

## Navegación
- **Inicio:** muestra todos los países.
- **Favoritos:** muestra únicamente los países marcados con la estrella amarilla.

## Uso del sistema de favoritos
1. Se hace clic en la estrella de un país para marcarlo como favorito.
2. La estrella cambia de color indicando que se guardó.
3. Los favoritos se mantienen incluso al cerrar o recargar el navegador.

## Modal de detalle
- Se hace clic en el nombre de un país para abrir un modal con información ampliada.
- Cierra el modal haciendo clic en la **X**, fuera del contenido o presionando **ESC**.

## Estado sin favoritos
Si no hay países favoritos, se muestra un mensaje y un botón para volver al inicio.

## Tecnologías
- JavaScript ES6+
- Web Components y Shadow DOM
- HTML5 y CSS3
- API REST pública: [restcountries.com](https://restcountries.com/)

## Enlaces
- **Código fuente:** [GitHub](https://github.com/Ariadna019/Reto-Frontend)  
- **Sitio en línea:** [GitHub Pages](https://ariadna019.github.io/Reto-Frontend/)

## Notas
- No requiere Node ni compiladores.  
- Se puede abrir directamente `index.html` o usar una extensión como **Live Server** en VS Code.
