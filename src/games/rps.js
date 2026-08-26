import { readGameScore, resetGameScore, writeGameScore } from '../storage.js';
import { createElementFromHTML } from '../components/dom.js';

const strings = {
  es: {
    options: [
      { label: 'Piedra', value: 'rock', emoji: '✊' },
      { label: 'Papel', value: 'paper', emoji: '✋' },
      { label: 'Tijera', value: 'scissors', emoji: '✌️' },
    ],
    chooseMove: 'Elige tu movimiento.',
    wins: 'Victorias',
    draws: 'Empates',
    losses: 'Derrotas',
    clearScore: 'Borrar puntuación',
    resetTable: 'La tabla se ha reiniciado.',
    playerWins: 'Tú eliges {player} y ganas a {machine}.',
    machineWins: 'La máquina elige {machine} y se lleva la victoria.',
    draw: 'Empate. Ambos habéis elegido {choice}.',
  },
  en: {
    options: [
      { label: 'Rock', value: 'rock', emoji: '✊' },
      { label: 'Paper', value: 'paper', emoji: '✋' },
      { label: 'Scissors', value: 'scissors', emoji: '✌️' },
    ],
    chooseMove: 'Choose your move.',
    wins: 'Wins',
    draws: 'Draws',
    losses: 'Losses',
    clearScore: 'Clear score',
    resetTable: 'The scoreboard has been reset.',
    playerWins: 'You pick {player} and beat {machine}.',
    machineWins: 'The machine picks {machine} and takes the round.',
    draw: 'Draw. You both picked {choice}.',
  },
};

export function getWinner(player, machine) {
  if (player === machine) return 'draw';
  const wins = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper',
  };
  return wins[player] === machine ? 'player' : 'machine';
}

export function createRpsGame(language = 'es') {
  const text = strings[language] || strings.es;
  const options = text.options;
  const state = readGameScore('rps', { wins: 0, losses: 0, draws: 0 });

  const wrapper = createElementFromHTML(`<div class="game-card__body"><div class="rps-controls">${options.map((option) => `<button type="button" class="rps-button" data-choice="${option.value}">${option.emoji}<span>${option.label}</span></button>`).join('')}</div><p class="game-card__status" aria-live="polite">${text.chooseMove}</p><div class="score-row"></div><button type="button" class="mini-button mini-button--ghost" data-action="clear-score">${text.clearScore}</button></div>`);
  const controls = wrapper.querySelector('.rps-controls');
  const result = wrapper.querySelector('.game-card__status');
  const scoreBoard = wrapper.querySelector('.score-row');

  function refreshScores() {
    scoreBoard.innerHTML = `
      <div class="score-chip"><span>${text.wins}</span><strong>${state.wins}</strong></div>
      <div class="score-chip score-chip--muted"><span>${text.draws}</span><strong>${state.draws}</strong></div>
      <div class="score-chip"><span>${text.losses}</span><strong>${state.losses}</strong></div>
    `;
    writeGameScore('rps', state);
  }

  options.forEach((option) => {
    const button = controls.querySelector(`[data-choice="${option.value}"]`);
    button.addEventListener('click', () => {
      const machineChoice = options[Math.floor(Math.random() * options.length)].value;
      const outcome = getWinner(option.value, machineChoice);
      const machineOption = options.find((item) => item.value === machineChoice);

      if (outcome === 'player') {
        state.wins += 1;
        result.textContent = text.playerWins.replace('{player}', option.label).replace('{machine}', machineOption.label);
      } else if (outcome === 'machine') {
        state.losses += 1;
        result.textContent = text.machineWins.replace('{machine}', machineOption.label);
      } else {
        state.draws += 1;
        result.textContent = text.draw.replace('{choice}', option.label);
      }

      refreshScores();
    });

  });

  const resetButton = wrapper.querySelector('[data-action="clear-score"]');
  resetButton.addEventListener('click', () => {
    state.wins = 0;
    state.losses = 0;
    state.draws = 0;
    resetGameScore('rps');
    result.textContent = text.resetTable;
    refreshScores();
  });

  refreshScores();
  return wrapper;
}
