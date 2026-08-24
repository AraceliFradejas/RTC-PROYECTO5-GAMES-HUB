# Games Hub

## Versión en castellano

Proyecto académico desarrollado dentro del máster de ThePower TECH, en el módulo de **Web Design Advanced**. La idea principal de este trabajo es crear una página única con varios mini juegos en JavaScript vanilla, combinando lógica, usabilidad y un diseño atractivo en una experiencia 100% responsive.

### Proyecto académico

Este ejercicio forma parte de la entrega del proyecto final del **Módulo 4: Web Design Advanced**, dentro del máster de ThePower TECH. El proyecto se desarrollará con **Vite** y **JavaScript vanilla**, aplicando una estructura modular, buenas prácticas de programación y una organización clara del código para facilitar el mantenimiento y la escalabilidad.

La propuesta consiste en una web de una sola página que integra **tres juegos distintos** en secciones independientes. Uno de ellos será un **tres en raya** obligatorio, mientras que los otros dos serán elegidos según la temática y la creatividad del proyecto. La experiencia se enfocará en ofrecer una interfaz moderna, rápida y accesible, con buena maquetación y diseño pensado para dispositivos móviles, tablets y escritorio.

### Demo

La demo del proyecto se publicará junto con la entrega final del repositorio cuando la aplicación esté desplegada.

### Funcionalidades

- Página principal con **3 secciones accesibles** y cada una mostrando un juego distinto.
- **Tres en raya** como juego obligatorio con lógica completa y validación del ganador.
- Dos juegos adicionales elegidos por la autora, con una temática clara y un diseño original.
- Diseño **full responsive** adaptado a distintas resoluciones.
- Interfaz moderna, visualmente cuidada y con buena maquetación.
- Puntuación persistente con **Local Storage**, para que la información se mantenga al recargar la página.
- Lógica de juego separada en módulos y estructura ordenada por componentes.
- Experiencia de usuario fluida, clara y accesible.
- Desarrollo pensado para una entrega académica de alto nivel dentro del máster.

### Estructura del proyecto

```text
├── public/
│   └── assets/
├── src/
│   ├── components/
│   │   ├── GameBoard/
│   │   ├── GameCard/
│   │   ├── Header/
│   │   ├── ScorePanel/
│   │   └── Footer/
│   ├── data/
│   │   └── gamesData.js
│   ├── games/
│   │   ├── ticTacToe/
│   │   ├── gameTwo/
│   │   └── gameThree/
│   ├── styles/
│   │   └── style.css
│   ├── utils/
│   │   └── storage.js
│   └── main.js
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
└── README.md
```

### Instalación local

1. Clona el repositorio:

   ```bash
   git clone https://github.com/AraceliFradejas/RTC-PROYECTO5-GAMES-HUB.git
   ```

2. Accede al proyecto e instala las dependencias:

   ```bash
   cd RTC-PROYECTO5-GAMES-HUB
   npm install
   ```

3. Ejecuta la aplicación en modo desarrollo:

   ```bash
   npm run dev
   ```

4. Comprueba la compilación para producción:

   ```bash
   npm run build
   ```

### Despliegue

El proyecto se desplegará en **Vercel** cuando esté finalizado y preparado para publicación.

### Tecnologías utilizadas

- Vite
- JavaScript ES Modules
- HTML5 semántico
- CSS3, Flexbox y CSS Grid
- Diseño responsive y variables CSS
- Manipulación del DOM y eventos
- Local Storage para la puntuación
- Git y GitHub
- Vercel

### Autora

**Araceli Fradejas Muñoz**

### Redes sociales y enlaces

- GitHub: https://github.com/AraceliFradejas
- LinkedIn: https://www.linkedin.com/in/araceli-fradejas-munoz-transformaciondigital/
- Instagram: https://www.instagram.com/goldilocks1013x/
- X (Twitter): https://x.com/AraceliFradejas
- TikTok: https://www.tiktok.com/@arucci1
- YouTube: https://www.youtube.com/@aracelifradejasmunoz2758
- Medium: https://medium.com/@araceli.fradejas

### Nota final

Este proyecto es una entrega académica desarrollada con fines formativos dentro del máster de ThePower TECH. La intención es crear una experiencia divertida, técnica y visualmente atractiva, donde la lógica y el diseño trabajen de la mano para ofrecer una web de juegos moderna y funcional.

---

## English version

Academic project developed within ThePower TECH master's program, in the **Web Design Advanced** module. The main idea of this project is to build a single-page web with several mini games in vanilla JavaScript, combining logic, usability and attractive design in a fully responsive experience.

### Academic project

This exercise is part of the final project for **Module 4: Web Design Advanced** within the ThePower TECH master's program. The project is developed with **Vite** and **vanilla JavaScript**, applying a modular structure, good programming practices and a clear organization of the code to improve maintainability and scalability.

The proposal consists of a one-page website that integrates **three different games** in independent sections. One of them is a mandatory **tic-tac-toe** game, while the other two are chosen according to the theme and creativity of the project. The experience focuses on delivering a modern, fast and accessible interface with a clean layout designed for mobile, tablet and desktop devices.

### Demo

The project demo will be published together with the final repository delivery once the application is deployed.

### Features

- Main page with **3 accessible sections**, each showing a different game.
- **Tic-tac-toe** as a mandatory game with full logic and winner validation.
- Two additional games selected by the author, with a clear theme and original design.
- **Fully responsive** design adapted to different screen sizes.
- Modern interface with a polished layout and strong visual identity.
- Score persistence using **Local Storage**, so the information remains available after reloading the page.
- Game logic separated into modules and organized structure by components.
- Smooth, clear and accessible user experience.
- Development designed for a high-level academic submission within the master's program.

### Project structure

```text
├── public/
│   └── assets/
├── src/
│   ├── components/
│   │   ├── GameBoard/
│   │   ├── GameCard/
│   │   ├── Header/
│   │   ├── ScorePanel/
│   │   └── Footer/
│   ├── data/
│   │   └── gamesData.js
│   ├── games/
│   │   ├── ticTacToe/
│   │   ├── gameTwo/
│   │   └── gameThree/
│   ├── styles/
│   │   └── style.css
│   ├── utils/
│   │   └── storage.js
│   └── main.js
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
└── README.md
```

### Local installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AraceliFradejas/RTC-PROYECTO5-GAMES-HUB.git
   ```

2. Open the project folder and install dependencies:

   ```bash
   cd RTC-PROYECTO5-GAMES-HUB
   npm install
   ```

3. Run the application in development mode:

   ```bash
   npm run dev
   ```

4. Verify the production build:

   ```bash
   npm run build
   ```

### Deployment

The project will be deployed on **Vercel** once it is finished and ready for publication.

### Technologies used

- Vite
- JavaScript ES Modules
- Semantic HTML5
- CSS3, Flexbox and CSS Grid
- Responsive design and CSS variables
- DOM manipulation and events
- Local Storage for scores
- Git and GitHub
- Vercel

### Author

**Araceli Fradejas Muñoz**

### Social links and profiles

- GitHub: https://github.com/AraceliFradejas
- LinkedIn: https://www.linkedin.com/in/araceli-fradejas-munoz-transformaciondigital/
- Instagram: https://www.instagram.com/goldilocks1013x/
- X (Twitter): https://x.com/AraceliFradejas
- TikTok: https://www.tiktok.com/@arucci1
- YouTube: https://www.youtube.com/@aracelifradejasmunoz2758
- Medium: https://medium.com/@araceli.fradejas

### Final note

This project is an academic assignment developed for educational purposes within ThePower TECH master's program. The goal is to create a fun, technical and visually appealing experience where logic and design work together to deliver a modern and functional games website.
