import './style.css';
import { games, translations } from './data.js';
import { createTicTacToeGame } from './games/ticTacToe.js';
import { createMemoryGame } from './games/memory.js';
import { createRpsGame } from './games/rps.js';
import { readAllScores } from './storage.js';

const app = document.querySelector('#app');
const slotMap = {
  tictactoe: createTicTacToeGame,
  memory: createMemoryGame,
  rps: createRpsGame,
};

const savedLanguage = localStorage.getItem('gamesHubLanguage') || 'es';
let currentLang = savedLanguage === 'en' ? 'en' : 'es';

function renderApp() {
  const lang = currentLang;
  const text = translations[lang];
  const gameCards = games
    .map(
      (game) => `
        <article class="game-card game-card--${game.accent}" data-game-card="${game.id}">
          <div class="game-card__header">
            <span class="game-tag">${game.badge[lang]}</span>
            <h2>${game.title[lang]}</h2>
          </div>
          <p class="game-card__description">${game.description[lang]}</p>
          <div class="game-card__slot" data-slot="${game.id}"></div>
        </article>
      `,
    )
    .join('');

  document.documentElement.lang = lang;

  app.innerHTML = `
    <div class="page-shell">
      <header class="topbar">
        <a href="#top" class="brand" aria-label="${lang === 'es' ? 'Ir al inicio' : 'Go to top'}">
          <span class="brand__mark">AFM</span>
          <span class="brand__text">
            <strong>Games Hub</strong>
          </span>
        </a>
        <div class="header__controls">
          <nav class="main-nav" aria-label="${lang === 'es' ? 'Navegación principal' : 'Main navigation'}">
            <a href="#games">${text.nav[0]}</a>
            <a href="#scores">${text.nav[1]}</a>
            <a href="#about">${text.nav[2]}</a>
          </nav>
          <button type="button" class="lang-switch" data-lang-toggle="${lang === 'es' ? 'en' : 'es'}">
            ${text.toggle}
          </button>
        </div>
      </header>

      <main id="top">
        <section class="hero">
          <div class="hero__copy">
            <span class="eyebrow">${text.eyebrow}</span>
            <h1>${text.heroTitle}</h1>
            <p>${text.heroText}</p>
            <div class="hero__badges" aria-label="${lang === 'es' ? 'Detalles del proyecto' : 'Project details'}">
              ${text.badges.map((badge) => `<span>${badge}</span>`).join('')}
            </div>
            <div class="hero__actions">
              <a href="#games" class="button button--primary">${text.primaryButton}</a>
              <a href="#about" class="button button--ghost">${text.secondaryButton}</a>
            </div>
          </div>

          <div class="hero__panel" id="scores" aria-label="${lang === 'es' ? 'Resumen general de puntuación' : 'Overall score summary'}">
            <div class="hero__art" aria-hidden="true">
              <svg viewBox="0 0 420 260">
                <path d="M40 175 C 90 140, 120 155, 160 120 S 250 70, 310 115 S 355 150, 380 142" fill="none" stroke="#5f4b4b" stroke-width="3" stroke-linecap="round" stroke-dasharray="6 8" opacity="0.6"/>
                <path d="M85 190 C 120 160, 150 165, 185 138 S 255 92, 315 140" fill="none" stroke="#b78f77" stroke-width="3" stroke-linecap="round" stroke-dasharray="3 10" opacity="0.7"/>
                <g transform="translate(56 42)">
                  <rect x="0" y="0" width="92" height="92" rx="20" fill="#fef8ee" stroke="#5f4b4b" stroke-width="2.5"/>
                  <path d="M26 25 h40 M26 46 h40 M26 67 h30" stroke="#5f4b4b" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
                  <circle cx="71" cy="63" r="12" fill="none" stroke="#d28f6d" stroke-width="3"/>
                </g>
                <g transform="translate(170 38)">
                  <rect x="0" y="0" width="102" height="112" rx="20" fill="#fffaf4" stroke="#5f4b4b" stroke-width="2.5"/>
                  <g stroke="#d28f6d" stroke-width="3" stroke-linecap="round" fill="none">
                    <path d="M25 25 L55 55 L85 25"/>
                    <path d="M25 70 L55 40 L85 70"/>
                    <path d="M25 40 L55 65 L85 40"/>
                  </g>
                </g>
                <g transform="translate(295 48)">
                  <path d="M6 60 L48 18 L92 62 L50 98 Z" fill="#f6ece0" stroke="#5f4b4b" stroke-width="2.5"/>
                  <circle cx="50" cy="58" r="16" fill="none" stroke="#c98e7c" stroke-width="3"/>
                  <path d="M50 42 v32 M34 58 h32" stroke="#5f4b4b" stroke-width="3" stroke-linecap="round"/>
                </g>
                <g transform="translate(120 150)">
                  <path d="M0 32 C 48 10, 96 10, 147 30" fill="none" stroke="#5f4b4b" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
                  <circle cx="26" cy="33" r="15" fill="#f6d5c8"/>
                  <circle cx="116" cy="33" r="15" fill="#dfe9fb"/>
                </g>
              </svg>
            </div>
            <p>${lang === 'es' ? 'Tu tablero de progreso' : 'Your progress board'}</p>
            <div class="summary-grid" aria-live="polite">
              <div>
                <span class="summary-label">${text.summary.tictactoe}</span>
                <strong data-summary="tictactoe">0</strong>
              </div>
              <div>
                <span class="summary-label">${text.summary.memory}</span>
                <strong data-summary="memory">0</strong>
              </div>
              <div>
                <span class="summary-label">${text.summary.rps}</span>
                <strong data-summary="rps">0</strong>
              </div>
            </div>
          </div>
        </section>

        <section class="games-section" id="games">
          ${gameCards}
        </section>

        <section class="about-section" id="about">
          <div class="about-panel">
            <span class="eyebrow">${text.aboutEyebrow}</span>
            <h3>${text.aboutTitle}</h3>
            <p>${text.aboutText}</p>
          </div>
        </section>
      </main>

      <footer class="footer">
        <div class="footer__socials">
          <p class="footer__title">${text.footerTitle}</p>
          <div class="footer__links">
            <a href="https://www.instagram.com/goldilocks1013x/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <span class="social-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5Zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5Zm5.25-3.25a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25Z"/></svg></span>
              Instagram
            </a>
            <a href="https://x.com/AraceliFradejas" target="_blank" rel="noreferrer" aria-label="X">
              <span class="social-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M18.9 2h3.38l-7.38 8.43L22.5 22h-6.7l-5.24-7.19L4.5 22H1.1l7.9-9.02L1.5 2h6.86l4.74 6.64L18.9 2Zm-1.18 18h1.86L7.2 3.9H5.24L17.72 20Z"/></svg></span>
              X (Twitter)
            </a>
            <a href="https://www.tiktok.com/@arucci1" target="_blank" rel="noreferrer" aria-label="TikTok">
              <span class="social-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M16.5 3c.49 1.7 1.86 3.02 3.77 3.32v2.8a7.5 7.5 0 0 1-3.77-1.06v6.55A5.32 5.32 0 1 1 8.23 9.16v2.8A2.56 2.56 0 1 0 11.55 14.7V2h4.95Z"/></svg></span>
              TikTok
            </a>
            <a href="https://www.youtube.com/@aracelifradejasmunoz2758" target="_blank" rel="noreferrer" aria-label="YouTube">
              <span class="social-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M23 12c0-1.7-.16-3.33-.46-4.86-.42-2.13-2.23-3.77-4.37-4.14A151.64 151.64 0 0 0 12 2c-2.09 0-4.15.08-6.16.28-2.15.38-3.96 2.01-4.38 4.14A31.6 31.6 0 0 0 1 12c0 1.7.16 3.33.46 4.86.42 2.13 2.23 3.77 4.38 4.14A151.64 151.64 0 0 0 12 22c2.09 0 4.15-.08 6.16-.28 2.15-.38 3.96-2.01 4.38-4.14.3-1.53.46-3.16.46-4.86ZM10 15.5v-7l6 3.5-6 3.5Z"/></svg></span>
              YouTube
            </a>
            <a href="https://www.linkedin.com/in/araceli-fradejas-munoz-transformaciondigital/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <span class="social-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M6.94 8.5A1.56 1.56 0 1 1 6.93 5.4a1.56 1.56 0 0 1 .01 3.1ZM5.5 10h2.9v9H5.5v-9Zm5.4 0h2.77v1.23h.04c.39-.73 1.33-1.5 2.74-1.5 2.93 0 3.47 1.93 3.47 4.44V19h-2.9v-17.7c0-1.95-.04-4.45-2.71-4.45-2.72 0-3.14 2.12-3.14 4.3V19h-2.9v-9Z"/></svg></span>
              LinkedIn
            </a>
            <a href="https://medium.com/@araceli.fradejas" target="_blank" rel="noreferrer" aria-label="Medium">
              <span class="social-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-11Zm2.5-.5a.5.5 0 0 0-.5.5v9.8l1.56-1.65a.78.78 0 0 1 .23-.17l3.34-1.72v-6.26a.5.5 0 0 0-.82-.38L6.5 9.48 6 9.05v-2.1Zm5.53 9.13 3.24-1.66a.7.7 0 0 0 .28-.28l2.8-4.9v8.21a.5.5 0 0 1-.5.5h-5.82Zm7.47-9.48a.5.5 0 0 1 .5-.5h.5a.5.5 0 0 1 .5.5v9.5a.5.5 0 0 1-.5.5h-.5a.5.5 0 0 1-.5-.5V6.5Z"/></svg></span>
              Medium
            </a>
          </div>
        </div>

        <div class="footer__meta">
          <p>© 2026 Araceli Fradejas Muñoz</p>
        </div>

        <div class="footer__note">
          <p>${lang === 'es'
            ? 'Proyecto realizado para practicar lógica de programación, manipulación del DOM y persistencia de datos con JavaScript vanilla.'
            : 'A project made to practise programming logic, DOM manipulation and data persistence with vanilla JavaScript.'}</p>
        </div>
      </footer>
    </div>
  `;

  const toggle = app.querySelector('[data-lang-toggle]');
  toggle?.addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    localStorage.setItem('gamesHubLanguage', currentLang);
    renderApp();
    updateSummary();
  });

  Object.entries(slotMap).forEach(([gameKey, createGame]) => {
    const slot = app.querySelector(`[data-slot="${gameKey}"]`);
    if (slot) {
      slot.appendChild(createGame(currentLang));
    }
  });
}

function updateSummary() {
  const stored = readAllScores();

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
window.addEventListener('scoresupdated', updateSummary);
renderApp();
updateSummary();
