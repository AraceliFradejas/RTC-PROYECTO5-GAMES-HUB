import './style.css';
import { games } from './data.js';
import { createTicTacToeGame } from './games/ticTacToe.js';
import { createMemoryGame } from './games/memory.js';
import { createRpsGame } from './games/rps.js';

const app = document.querySelector('#app');

app.innerHTML = `
  <div class="page-shell">
    <header class="topbar">
      <a href="#top" class="brand" aria-label="Ir al inicio">
        <span class="brand__mark">AFM</span>
        <span class="brand__text">
          <strong>Araceli Fradejas</strong>
          <small>Games Hub</small>
        </span>
      </a>
      <nav class="main-nav" aria-label="Navegación principal">
        <a href="#games">Juegos</a>
        <a href="#scores">Puntuación</a>
        <a href="#about">Sobre el proyecto</a>
      </nav>
    </header>

    <main id="top">
      <section class="hero">
        <div class="hero__copy">
          <span class="eyebrow">Tu rincón para desconectar</span>
          <h1>Pequeñas victorias <span>para un rato muy bonito.</span></h1>
          <p>
            Aquí no hay prisa ni presión: solo juegos sencillos, un diseño amable y esa sensación de
            “me apetece una partida más”. Porque a veces el mejor descanso es jugar sin complicarlo.
          </p>
          <div class="hero__actions">
            <a href="#games" class="button button--primary">Jugar ahora</a>
            <a href="#about" class="button button--ghost">Sobre este rincón</a>
          </div>
        </div>

        <div class="hero__panel" id="scores" aria-label="Resumen general de puntuación">
          <p>Tu tablero de progreso</p>
          <div class="summary-grid">
            <div>
              <span class="summary-label">Tres en raya</span>
              <strong data-summary="tictactoe">0</strong>
            </div>
            <div>
              <span class="summary-label">Memoria</span>
              <strong data-summary="memory">0</strong>
            </div>
            <div>
              <span class="summary-label">Piedra / Papel / Tijera</span>
              <strong data-summary="rps">0</strong>
            </div>
          </div>
        </div>
      </section>

      <section class="games-section" id="games">
        ${games
          .map(
            (game) => `
              <article class="game-card game-card--${game.accent}" data-game-card="${game.id}">
                <div class="game-card__header">
                  <span class="game-tag">${game.badge}</span>
                  <h2>${game.title}</h2>
                </div>
                <p class="game-card__description">${game.description}</p>
                <div class="game-card__slot" data-slot="${game.id}"></div>
              </article>
            `,
          )
          .join('')}
      </section>

      <section class="about-section" id="about">
        <div class="about-panel">
          <span class="eyebrow">Sobre este rincón</span>
          <h3>Un sitio para jugar, reírse y volver a probar.</h3>
          <p>
            Games Hub nació con una idea muy simple: que jugar no tenga que ser complicado ni frío.
            Aquí cada partida invita a relajarse, concentrarse y pasar un buen rato sin perder la
            personalidad. Un espacio de contraste, de color suave y de pequeñas victorias que hacen
            sonreír entre una tarea y otra.
          </p>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>Games Hub — para jugar un rato y volver con mejor energía.</p>
    </footer>
  </div>
`;

const slotMap = {
  tictactoe: createTicTacToeGame,
  memory: createMemoryGame,
  rps: createRpsGame,
};

Object.entries(slotMap).forEach(([gameKey, createGame]) => {
  const slot = document.querySelector(`[data-slot="${gameKey}"]`);
  if (slot) {
    slot.appendChild(createGame());
  }
});

function updateSummary() {
  const stored = JSON.parse(localStorage.getItem('gamesHubScores') || '{}');

  const tictactoe = stored.tictactoe || { X: 0, O: 0, draws: 0 };
  const memory = stored.memory || { best: 0 };
  const rps = stored.rps || { wins: 0, losses: 0, draws: 0 };

  const tttNode = document.querySelector('[data-summary="tictactoe"]');
  const memoryNode = document.querySelector('[data-summary="memory"]');
  const rpsNode = document.querySelector('[data-summary="rps"]');

  if (tttNode) {
    tttNode.textContent = (tictactoe.X || 0) + (tictactoe.O || 0) + (tictactoe.draws || 0);
  }

  if (memoryNode) {
    memoryNode.textContent = memory.best || 0;
  }

  if (rpsNode) {
    rpsNode.textContent = (rps.wins || 0) + (rps.losses || 0) + (rps.draws || 0);
  }
}

window.addEventListener('storage', updateSummary);
updateSummary();
