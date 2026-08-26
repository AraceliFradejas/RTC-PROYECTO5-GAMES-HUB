import { createElementFromHTML } from '../components/dom.js';

export function ticTacToeTemplate(text, language) {
  const label = language === 'es' ? 'Tablero de tres en raya' : 'Tic-tac-toe board';
  return createElementFromHTML(`<div class="game-card__body game-card__body--board">
    <div class="game-card__meta"><span data-turn-label>${text.turnLabel} <strong>X</strong></span><button type="button" class="mini-button" data-action="reset-board">${text.reset}</button></div>
    <div class="tic-tac-toe" role="group" aria-label="${label}"></div><p class="game-card__status" aria-live="polite">${text.starts}</p><div class="score-row"></div>
    <button type="button" class="mini-button mini-button--ghost" data-action="clear-score">${text.clearScore}</button>
  </div>`);
}

export function ticTacToeBoard(state, text) {
  return state.board.map((value, index) => `<button type="button" class="cell ${value ? 'cell--filled' : ''}" data-index="${index}" aria-label="${text.cell} ${index + 1}${value ? `: ${value}` : ''}" ${!state.active || value ? 'disabled' : ''}>${value}</button>`).join('');
}

export function threePartScore(labels, values) {
  return labels.map((label, index) => `<div class="score-chip ${index === 1 ? 'score-chip--muted' : ''}"><span>${label}</span><strong>${values[index]}</strong></div>`).join('');
}

export function memoryTemplate(text, language) {
  const label = language === 'es' ? 'Tablero de memoria' : 'Memory board';
  return createElementFromHTML(`<div class="game-card__body"><div class="game-card__meta"><span>${text.attempts}: <strong>0</strong></span><button type="button" class="mini-button" data-action="reset-memory">${text.reset}</button></div>
    <div class="memory-board" role="group" aria-label="${label}"></div><p class="game-card__status" aria-live="polite">${text.searchPairs}</p><div class="score-row score-row--memory"></div>
    <button type="button" class="mini-button mini-button--ghost" data-action="clear-score">${text.clearScore}</button></div>`);
}

export function memoryBoard(deck, checkingPair, text) {
  return deck.map((card) => {
    const visible = card.flipped || card.matched;
    const label = card.matched ? `${text.matchedCard} ${card.symbol}` : card.flipped ? `${text.visibleCard} ${card.symbol}` : text.hiddenCard;
    return `<button type="button" class="memory-card ${visible ? 'is-visible' : ''} ${card.matched ? 'is-matched' : ''}" data-card-id="${card.id}" aria-label="${label}" ${checkingPair || visible ? 'disabled' : ''}>${visible ? card.symbol : '?'}</button>`;
  }).join('');
}

export function memoryScore(text, solved, best) {
  return `<div class="score-chip"><span>${text.pairs}</span><strong>${solved}/8</strong></div><div class="score-chip score-chip--muted"><span>${text.best}</span><strong>${best || '—'}</strong></div>`;
}

export function rpsTemplate(text) {
  const controls = text.options.map((option) => `<button type="button" class="rps-button" data-choice="${option.value}">${option.emoji}<span>${option.label}</span></button>`).join('');
  return createElementFromHTML(`<div class="game-card__body"><div class="rps-controls">${controls}</div><p class="game-card__status" aria-live="polite">${text.chooseMove}</p><div class="score-row"></div><button type="button" class="mini-button mini-button--ghost" data-action="clear-score">${text.clearScore}</button></div>`);
}
