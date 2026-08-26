import { readGameScore, resetGameScore, writeGameScore } from '../storage.js';
import { createElementFromHTML } from '../components/dom.js';

const emojiPool = ['☕', '✦', '🎧', '🌙', '💡', '🪩', '🌿', '✨'];

const strings = {
  es: {
    attempts: 'Intentos',
    reset: 'Reiniciar',
    pairs: 'Pares',
    best: 'Récord',
    searchPairs: 'Busca los pares.',
    matchFound: 'Pareja encontrada.',
    noMatch: 'No coincide. Inténtalo de nuevo.',
    complete: '¡Lo has completado!',
    hiddenCard: 'Carta oculta',
    visibleCard: 'Carta con',
    matchedCard: 'Pareja encontrada con',
    clearScore: 'Borrar récord',
    scoreCleared: 'El récord se ha borrado.',
  },
  en: {
    attempts: 'Attempts',
    reset: 'Reset',
    pairs: 'Pairs',
    best: 'Best',
    searchPairs: 'Find the matches.',
    matchFound: 'Match found.',
    noMatch: 'No match. Try again.',
    complete: 'You completed it!',
    hiddenCard: 'Hidden card',
    visibleCard: 'Card showing',
    matchedCard: 'Matched card showing',
    clearScore: 'Clear best score',
    scoreCleared: 'The best score has been cleared.',
  },
};

function shuffle(array) {
  const copy = [...array];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

export function createMemoryGame(language = 'es') {
  const text = strings[language] || strings.es;
  const state = {
    deck: shuffle([...emojiPool, ...emojiPool]).map((symbol, index) => ({
      id: `${symbol}-${index}`,
      symbol,
      matched: false,
      flipped: false,
    })),
    opened: [],
    moves: 0,
    solved: 0,
    status: text.searchPairs,
    best: readGameScore('memory', { best: 0 }).best,
    checkingPair: false,
    turnId: 0,
  };

  const wrapper = createElementFromHTML(`<div class="game-card__body">
    <div class="game-card__meta"><span>${text.attempts}: <strong>${state.moves}</strong></span><button type="button" class="mini-button" data-action="reset-memory">${text.reset}</button></div>
    <div class="memory-board" role="group" aria-label="${language === 'es' ? 'Tablero de memoria' : 'Memory board'}"></div>
    <p class="game-card__status" aria-live="polite">${state.status}</p><div class="score-row score-row--memory"></div>
    <button type="button" class="mini-button mini-button--ghost" data-action="clear-score">${text.clearScore}</button>
  </div>`);
  const infoRow = wrapper.querySelector('.game-card__meta');
  const board = wrapper.querySelector('.memory-board');
  const status = wrapper.querySelector('.game-card__status');
  const scoreRow = wrapper.querySelector('.score-row');

  function renderBoard() {
    board.innerHTML = state.deck.map((card) => {
      const cardLabel = card.matched
        ? `${text.matchedCard} ${card.symbol}`
        : card.flipped
          ? `${text.visibleCard} ${card.symbol}`
          : text.hiddenCard;
      return `<button type="button" class="memory-card ${card.flipped || card.matched ? 'is-visible' : ''} ${card.matched ? 'is-matched' : ''}" data-card-id="${card.id}" aria-label="${cardLabel}" ${state.checkingPair || card.matched || card.flipped ? 'disabled' : ''}>${card.flipped || card.matched ? card.symbol : '?'}</button>`;
    }).join('');
    board.querySelectorAll('[data-card-id]').forEach((button) => button.addEventListener('click', () => handleTurn(button.dataset.cardId)));

    infoRow.querySelector('strong').textContent = state.moves;
    scoreRow.innerHTML = `
      <div class="score-chip"><span>${text.pairs}</span><strong>${state.solved}/8</strong></div>
      <div class="score-chip score-chip--muted"><span>${text.best}</span><strong>${state.best || '—'}</strong></div>
    `;
  }

  function updateStatus(message) {
    state.status = message;
    status.textContent = message;
  }

  function saveBestScore() {
    const current = state.best ? Math.min(state.best, state.moves) : state.moves;
    state.best = current;
    writeGameScore('memory', { best: current });
  }

  function handleTurn(cardId) {
    const selectedCard = state.deck.find((card) => card.id === cardId);
    if (state.checkingPair || !selectedCard || selectedCard.flipped || selectedCard.matched) return;

    selectedCard.flipped = true;
    state.opened.push(selectedCard);

    if (state.opened.length === 2) {
      state.moves += 1;
      const [first, second] = state.opened;

      if (first.symbol === second.symbol) {
        first.matched = true;
        second.matched = true;
        state.solved += 1;
        state.opened = [];
        updateStatus(text.matchFound);

        if (state.solved === emojiPool.length) {
          saveBestScore();
          updateStatus(text.complete);
        }
      } else {
        state.checkingPair = true;
        const currentTurnId = state.turnId;
        updateStatus(text.noMatch);
        setTimeout(() => {
          if (currentTurnId !== state.turnId) return;
          first.flipped = false;
          second.flipped = false;
          state.opened = [];
          state.checkingPair = false;
          renderBoard();
        }, 600);
      }
    }

    renderBoard();
  }

  function resetGame() {
    state.turnId += 1;
    state.deck = shuffle([...emojiPool, ...emojiPool]).map((symbol, index) => ({
      id: `${symbol}-${index}`,
      symbol,
      matched: false,
      flipped: false,
    }));
    state.opened = [];
    state.moves = 0;
    state.solved = 0;
    state.checkingPair = false;
    state.status = text.searchPairs;
    renderBoard();
    updateStatus(state.status);
  }

  infoRow.querySelector('[data-action="reset-memory"]').addEventListener('click', resetGame);
  wrapper.querySelector('[data-action="clear-score"]').addEventListener('click', () => {
    state.best = 0;
    resetGameScore('memory');
    renderBoard();
    updateStatus(text.scoreCleared);
  });

  renderBoard();
  return wrapper;
}
