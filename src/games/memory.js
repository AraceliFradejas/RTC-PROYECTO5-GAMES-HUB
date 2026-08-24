import { readGameScore, writeGameScore } from '../storage.js';

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

  const wrapper = document.createElement('div');
  wrapper.className = 'game-card__body';

  const infoRow = document.createElement('div');
  infoRow.className = 'game-card__meta';
  infoRow.innerHTML = `
    <span>${text.attempts}: <strong>${state.moves}</strong></span>
    <button type="button" class="mini-button" data-action="reset-memory">${text.reset}</button>
  `;

  const board = document.createElement('div');
  board.className = 'memory-board';
  board.setAttribute('role', 'group');
  board.setAttribute('aria-label', language === 'es' ? 'Tablero de memoria' : 'Memory board');

  const status = document.createElement('p');
  status.className = 'game-card__status';
  status.setAttribute('aria-live', 'polite');
  status.textContent = state.status;

  const scoreRow = document.createElement('div');
  scoreRow.className = 'score-row';
  scoreRow.innerHTML = `
    <div class="score-chip"><span>${text.pairs}</span><strong>${state.solved}/8</strong></div>
    <div class="score-chip score-chip--muted"><span>${text.best}</span><strong>${state.best || '—'}</strong></div>
  `;

  function renderBoard() {
    board.innerHTML = '';
    state.deck.forEach((card) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `memory-card ${card.flipped || card.matched ? 'is-visible' : ''} ${card.matched ? 'is-matched' : ''}`;
      button.textContent = card.flipped || card.matched ? card.symbol : '?';
      const cardLabel = card.matched
        ? `${text.matchedCard} ${card.symbol}`
        : card.flipped
          ? `${text.visibleCard} ${card.symbol}`
          : text.hiddenCard;
      button.setAttribute('aria-label', cardLabel);
      button.disabled = state.checkingPair || card.matched || card.flipped;
      button.addEventListener('click', () => handleTurn(card.id));
      board.appendChild(button);
    });

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

  renderBoard();
  wrapper.append(infoRow, board, status, scoreRow);

  return wrapper;
}
