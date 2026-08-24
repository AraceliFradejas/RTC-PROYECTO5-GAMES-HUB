import { readGameScore, writeGameScore } from '../storage.js';

const options = [
  { label: 'Piedra', value: 'rock', emoji: '✊' },
  { label: 'Papel', value: 'paper', emoji: '✋' },
  { label: 'Tijera', value: 'scissors', emoji: '✌️' },
];

function getWinner(player, machine) {
  if (player === machine) return 'draw';
  const wins = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper',
  };
  return wins[player] === machine ? 'player' : 'machine';
}

export function createRpsGame() {
  const state = readGameScore('rps', { wins: 0, losses: 0, draws: 0 });

  const wrapper = document.createElement('div');
  wrapper.className = 'game-card__body';

  const controls = document.createElement('div');
  controls.className = 'rps-controls';

  const result = document.createElement('p');
  result.className = 'game-card__status';
  result.textContent = 'Elige tu movimiento.';

  const scoreBoard = document.createElement('div');
  scoreBoard.className = 'score-row';
  scoreBoard.innerHTML = `
    <div class="score-chip"><span>Victorias</span><strong>${state.wins}</strong></div>
    <div class="score-chip score-chip--muted"><span>Empates</span><strong>${state.draws}</strong></div>
    <div class="score-chip"><span>Derrotas</span><strong>${state.losses}</strong></div>
  `;

  function refreshScores() {
    scoreBoard.innerHTML = `
      <div class="score-chip"><span>Victorias</span><strong>${state.wins}</strong></div>
      <div class="score-chip score-chip--muted"><span>Empates</span><strong>${state.draws}</strong></div>
      <div class="score-chip"><span>Derrotas</span><strong>${state.losses}</strong></div>
    `;
    writeGameScore('rps', state);
  }

  options.forEach((option) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'rps-button';
    button.innerHTML = `${option.emoji}<span>${option.label}</span>`;
    button.addEventListener('click', () => {
      const machineChoice = options[Math.floor(Math.random() * options.length)].value;
      const outcome = getWinner(option.value, machineChoice);
      const machineOption = options.find((item) => item.value === machineChoice);

      if (outcome === 'player') {
        state.wins += 1;
        result.textContent = `Tú eliges ${option.label} y ganas a ${machineOption.label}.`;
      } else if (outcome === 'machine') {
        state.losses += 1;
        result.textContent = `La máquina elige ${machineOption.label} y se lleva la victoria.`;
      } else {
        state.draws += 1;
        result.textContent = `Empate. Ambos habéis elegido ${option.label}.`;
      }

      refreshScores();
    });

    controls.appendChild(button);
  });

  const resetButton = document.createElement('button');
  resetButton.type = 'button';
  resetButton.className = 'mini-button mini-button--ghost';
  resetButton.textContent = 'Borrar puntuación';
  resetButton.addEventListener('click', () => {
    state.wins = 0;
    state.losses = 0;
    state.draws = 0;
    result.textContent = 'La tabla se ha reiniciado.';
    refreshScores();
  });

  wrapper.append(controls, result, scoreBoard, resetButton);
  return wrapper;
}
