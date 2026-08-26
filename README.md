# Games Hub

Games Hub es mi proyecto final del módulo **Web Design Advanced** de **The Power TECH**. La propuesta consiste en reunir tres juegos hechos con JavaScript vanilla en una sola página: tres en raya, memoria visual y piedra, papel o tijera.

Quise darles una estética tranquila y colorida, alejada de la apariencia habitual de una web arcade. El reto principal ha sido controlar el estado de cada partida, actualizar el DOM sin recargar la página y conservar las puntuaciones entre sesiones.

## Demo

[Ver Games Hub en Vercel](https://rtc-proyecto-5-games-hub.vercel.app/)

## Juegos

- **Tres en raya:** partida local para dos jugadores. Guarda las victorias de X, las victorias de O y los empates.
- **Memoria visual:** tablero de 16 cartas. Guarda como récord la partida completada con menos intentos.
- **Piedra, papel o tijera:** partidas contra una elección aleatoria del navegador. Guarda victorias, derrotas y empates.

El panel situado al principio de la página muestra un resumen de la actividad y se actualiza mientras se juega. Las puntuaciones se almacenan en `localStorage`, por lo que siguen disponibles después de recargar.

## Decisiones del proyecto

- Separé cada juego en su propio módulo para que cada uno gestione su estado y sus eventos.
- Centralicé la lectura y escritura de puntuaciones en `storage.js`.
- Utilicé CSS Grid para los tableros y para adaptar la distribución a escritorio, tablet y móvil.
- Añadí una versión en inglés para practicar el renderizado dinámico de contenido.
- El juego de memoria bloquea el tablero mientras compara una pareja para evitar pulsaciones que alteren el turno.

## Tecnologías

- Vite
- JavaScript vanilla con ES Modules
- HTML generado dinámicamente desde JavaScript
- CSS, Flexbox y CSS Grid
- Local Storage

## Estructura real

```text
.
├── index.html
├── package.json
├── package-lock.json
└── src
    ├── data.js
    ├── components
    │   ├── About.js
    │   ├── Footer.js
    │   ├── GamesSection.js
    │   ├── Header.js
    │   ├── Hero.js
    │   └── dom.js
    ├── games
    │   ├── memory.js
    │   ├── memoryState.js
    │   ├── rps.js
    │   ├── templates.js
    │   ├── ticTacToe.js
    │   └── translations.js
    ├── main.js
    ├── storage.js
    └── styles
        ├── about.css
        ├── buttons.css
        ├── footer-meta.css
        ├── footer-social.css
        ├── game-cards.css
        ├── globals.css
        ├── header-brand.css
        ├── header-navigation.css
        ├── hero-intro.css
        ├── index.css
        ├── memory.css
        ├── panels.css
        ├── rps.css
        ├── summary.css
        ├── tic-tac-toe.css
        └── responsive.css
```

## Ejecutar el proyecto

```bash
git clone https://github.com/AraceliFradejas/RTC-PROYECTO5-GAMES-HUB.git
cd RTC-PROYECTO5-GAMES-HUB
npm install
npm run dev
```

Para comprobar la versión de producción:

```bash
npm run build
npm run preview
```

## Comprobaciones realizadas

- Victorias horizontales, verticales y diagonales en tres en raya.
- Empate, bloqueo del tablero terminado y reinicio de una partida.
- Bloqueo de cartas durante la comparación en memoria.
- Reinicio de memoria aunque haya una comparación pendiente.
- Actualización y borrado de las puntuaciones.
- Conservación de las puntuaciones después de recargar.
- Cambio de idioma sin perder los resultados guardados.
- Distribución responsive en móvil, tablet y escritorio.
- Navegación con teclado y mensajes de resultado anunciados mediante `aria-live`.
- Tests de arquitectura que impiden superar 100 líneas por módulo o volver a mezclar estrategias de creación del DOM.

## Refactorización tras la revisión

Se han aplicado todos los ajustes solicitados en la corrección:

- `main.js` se redujo de 231 líneas a un punto de entrada de unas 50 líneas. La cabecera, el hero, las tarjetas de juegos, la sección informativa y el footer son ahora componentes independientes dentro de `src/components`.
- La antigua hoja de estilos de 881 líneas se dividió en módulos temáticos de menos de 100 líneas, coordinados desde `styles/index.css`.
- Se unificó la construcción de interfaz: tanto la página como los juegos parten de plantillas HTML mediante el helper compartido `createElementFromHTML`; ya no se mezclan bloques creados manualmente con `createElement()` y otros con literales.
- Memoria visual incorpora el botón **Borrar récord / Clear best score**, actualiza el panel superior y conserva por separado el reinicio de la partida.
- El footer renderiza exclusivamente la nota y el encabezado correspondientes al idioma seleccionado.
- `resetGameScore` ya no es código sin uso: los tres juegos lo importan y utilizan para eliminar sus resultados guardados.
- Al terminar Tres en raya, el encabezado deja de anunciar el turno y muestra **Partida terminada / Round finished**. Al reiniciar vuelve a mostrar el turno de X.
- Se añadió una prueba automatizada para comprobar que el borrado elimina solo el resultado del juego solicitado.

## Autora

**Araceli Fradejas Muñoz**

- [GitHub](https://github.com/AraceliFradejas)
- [LinkedIn](https://www.linkedin.com/in/araceli-fradejas-munoz-transformaciondigital/)
- [Instagram](https://www.instagram.com/goldilocks1013x/)
- [X (Twitter)](https://x.com/AraceliFradejas)
- [TikTok](https://www.tiktok.com/@arucci1)
- [YouTube](https://www.youtube.com/@aracelifradejasmunoz2758)
- [Medium](https://medium.com/@araceli.fradejas)

---

# Games Hub — English version

Games Hub is my final project for the **Web Design Advanced** module at **The Power TECH**. It brings together three games made with vanilla JavaScript on a single page: tic-tac-toe, memory match, and rock paper scissors.

I chose a calm and colourful visual style instead of the usual arcade look. The main challenge was managing the state of each game, updating the DOM without reloading the page, and keeping scores between sessions.

## Demo

[View Games Hub on Vercel](https://rtc-proyecto-5-games-hub.vercel.app/)

## Games

- **Tic-tac-toe:** a local game for two players. It stores X wins, O wins and draws.
- **Memory match:** a board with 16 cards. It stores the completed game with the fewest attempts as the best score.
- **Rock paper scissors:** rounds against a random browser choice. It stores wins, losses and draws.

The progress panel at the top of the page shows a summary and updates while you play. Scores are stored in `localStorage`, so they remain available after reloading the page.

## Project decisions

- Each game has its own module and manages its own state and events.
- Score reading and writing are centralised in `storage.js`.
- CSS Grid is used for the boards and for the desktop, tablet and mobile layouts.
- The Spanish and English versions are rendered dynamically.
- The memory board is locked while a pair is being checked, preventing extra clicks from changing the turn.

## Technologies

- Vite
- Vanilla JavaScript with ES Modules
- HTML generated dynamically with JavaScript
- CSS, Flexbox and CSS Grid
- Local Storage

## Project structure

```text
.
├── index.html
├── package.json
├── package-lock.json
└── src
    ├── data.js
    ├── components
    │   ├── About.js
    │   ├── Footer.js
    │   ├── GamesSection.js
    │   ├── Header.js
    │   ├── Hero.js
    │   └── dom.js
    ├── games
    │   ├── memory.js
    │   ├── memoryState.js
    │   ├── rps.js
    │   ├── templates.js
    │   ├── ticTacToe.js
    │   └── translations.js
    ├── main.js
    ├── storage.js
    └── styles
        ├── about.css
        ├── buttons.css
        ├── footer-meta.css
        ├── footer-social.css
        ├── game-cards.css
        ├── globals.css
        ├── header-brand.css
        ├── header-navigation.css
        ├── hero-intro.css
        ├── index.css
        ├── memory.css
        ├── panels.css
        ├── rps.css
        ├── summary.css
        ├── tic-tac-toe.css
        └── responsive.css
```

## Run locally

```bash
git clone https://github.com/AraceliFradejas/RTC-PROYECTO5-GAMES-HUB.git
cd RTC-PROYECTO5-GAMES-HUB
npm install
npm run dev
```

To check the production version:

```bash
npm run build
npm run preview
```

## Checks completed

- Horizontal, vertical and diagonal tic-tac-toe wins.
- Draws, finished-board locking and round resets.
- Card locking while a memory pair is checked.
- Memory reset while a comparison is pending.
- Score updates and score resets.
- Score persistence after reloading.
- Language changes without losing saved results.
- Responsive layouts for mobile, tablet and desktop.
- Keyboard navigation and result messages announced with `aria-live`.
- Architecture tests that prevent modules from exceeding 100 lines or mixing DOM creation strategies again.

## Refactoring after the review

All the changes requested in the project review have been implemented:

- `main.js` was reduced from 231 lines to an entry point of approximately 50 lines. The header, hero, game cards, about section and footer are now independent components inside `src/components`.
- The former 881-line stylesheet was divided into focused modules of fewer than 100 lines, coordinated through `styles/index.css`.
- Interface construction was standardised: both the page and the games now use HTML templates through the shared `createElementFromHTML` helper instead of mixing manual `createElement()` blocks with template literals.
- Memory Match now includes a **Clear best score** button. It resets the stored record and updates the progress panel independently from the game reset.
- The footer renders only the note and heading belonging to the currently selected language.
- `resetGameScore` is no longer unused code: all three games import and call it when deleting their stored results.
- When Tic-Tac-Toe ends, its heading stops announcing the current turn and displays **Round finished**. Resetting the board restores X as the active player.
- An automated regression test verifies that clearing one game score does not delete the results belonging to the other games.

## Author

**Araceli Fradejas Muñoz**

- [GitHub](https://github.com/AraceliFradejas)
- [LinkedIn](https://www.linkedin.com/in/araceli-fradejas-munoz-transformaciondigital/)
- [Instagram](https://www.instagram.com/goldilocks1013x/)
- [X (Twitter)](https://x.com/AraceliFradejas)
- [TikTok](https://www.tiktok.com/@arucci1)
- [YouTube](https://www.youtube.com/@aracelifradejasmunoz2758)
- [Medium](https://medium.com/@araceli.fradejas)
