import './styles/index.css';
import { games, translations } from './data.js';
import { createHeader } from './components/Header.js';
import { createHero } from './components/Hero.js';
import { createGamesSection } from './components/GamesSection.js';
import { createAbout } from './components/About.js';
import { createFooter } from './components/Footer.js';
import { createTicTacToeGame } from './games/ticTacToe.js';
import { createMemoryGame } from './games/memory.js';
import { createRpsGame } from './games/rps.js';
import { readAllScores } from './storage.js';

const app = document.querySelector('#app');
const gameFactories = { tictactoe: createTicTacToeGame, memory: createMemoryGame, rps: createRpsGame };
let currentLanguage = localStorage.getItem('gamesHubLanguage') === 'en' ? 'en' : 'es';

function updateSummary() {
  const scores = readAllScores();
  const totals = {
    tictactoe: (scores.tictactoe?.X || 0) + (scores.tictactoe?.O || 0) + (scores.tictactoe?.draws || 0),
    memory: scores.memory?.best || 0,
    rps: (scores.rps?.wins || 0) + (scores.rps?.losses || 0) + (scores.rps?.draws || 0),
  };
  Object.entries(totals).forEach(([key, value]) => {
    const element = app.querySelector(`[data-summary="${key}"]`);
    if (element) element.textContent = value;
  });
}

function changeLanguage() {
  currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
  localStorage.setItem('gamesHubLanguage', currentLanguage);
  renderApp();
}

function renderApp() {
  const text = translations[currentLanguage];
  document.documentElement.lang = currentLanguage;
  const shell = document.createElement('div');
  const main = document.createElement('main');
  shell.className = 'page-shell';
  main.id = 'top';
  main.append(createHero(text, currentLanguage), createGamesSection(games, currentLanguage, gameFactories), createAbout(text));
  shell.append(createHeader(text, currentLanguage, changeLanguage), main, createFooter(text, currentLanguage));
  app.replaceChildren(shell);
  updateSummary();
}

window.addEventListener('storage', updateSummary);
window.addEventListener('scoresupdated', updateSummary);
renderApp();
