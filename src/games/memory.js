import { readGameScore, resetGameScore, writeGameScore } from '../storage.js';
import { createDeck, emojiPool, resetMemoryState } from './memoryState.js';
import { getGameText, memoryText } from './translations.js';
import { memoryBoard, memoryScore, memoryTemplate } from './templates.js';

export function createMemoryGame(language = 'es') {
  const text = getGameText(memoryText, language);
  const state = { deck: createDeck(), opened: [], moves: 0, solved: 0, status: text.searchPairs, best: readGameScore('memory', { best: 0 }).best, checkingPair: false, turnId: 0 };
  const wrapper = memoryTemplate(text, language);
  const attempts = wrapper.querySelector('.game-card__meta strong');
  const board = wrapper.querySelector('.memory-board');
  const status = wrapper.querySelector('.game-card__status');
  const scoreRow = wrapper.querySelector('.score-row');

  function updateStatus(message) {
    state.status = message;
    status.textContent = message;
  }

  function render() {
    board.innerHTML = memoryBoard(state.deck, state.checkingPair, text);
    board.querySelectorAll('[data-card-id]').forEach((button) => button.addEventListener('click', () => handleTurn(button.dataset.cardId)));
    attempts.textContent = state.moves;
    scoreRow.innerHTML = memoryScore(text, state.solved, state.best);
  }

  function saveBestScore() {
    state.best = state.best ? Math.min(state.best, state.moves) : state.moves;
    writeGameScore('memory', { best: state.best });
  }

  function hideUnmatched(first, second, turnId) {
    setTimeout(() => {
      if (turnId !== state.turnId) return;
      first.flipped = false;
      second.flipped = false;
      state.opened = [];
      state.checkingPair = false;
      render();
    }, 600);
  }

  function comparePair() {
    const [first, second] = state.opened;
    state.moves += 1;
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
      updateStatus(text.noMatch);
      hideUnmatched(first, second, state.turnId);
    }
  }

  function handleTurn(cardId) {
    const card = state.deck.find((item) => item.id === cardId);
    if (state.checkingPair || !card || card.flipped || card.matched) return;
    card.flipped = true;
    state.opened.push(card);
    if (state.opened.length === 2) comparePair();
    render();
  }

  wrapper.querySelector('[data-action="reset-memory"]').addEventListener('click', () => {
    resetMemoryState(state, text.searchPairs);
    render();
    updateStatus(state.status);
  });
  wrapper.querySelector('[data-action="clear-score"]').addEventListener('click', () => {
    state.best = 0;
    resetGameScore('memory');
    render();
    updateStatus(text.scoreCleared);
  });
  render();
  return wrapper;
}
