import { readGameScore, resetGameScore, writeGameScore } from '../storage.js';
import { getGameText, rpsText } from './translations.js';
import { rpsTemplate, threePartScore } from './templates.js';

export function getWinner(player, machine) {
  if (player === machine) return 'draw';
  const wins = { rock: 'scissors', paper: 'rock', scissors: 'paper' };
  return wins[player] === machine ? 'player' : 'machine';
}

export function createRpsGame(language = 'es') {
  const text = getGameText(rpsText, language);
  const state = readGameScore('rps', { wins: 0, losses: 0, draws: 0 });
  const wrapper = rpsTemplate(text);
  const result = wrapper.querySelector('.game-card__status');
  const scoreBoard = wrapper.querySelector('.score-row');

  function refreshScores() {
    scoreBoard.innerHTML = threePartScore(
      [text.wins, text.draws, text.losses],
      [state.wins, state.draws, state.losses],
    );
    writeGameScore('rps', state);
  }

  function play(option) {
    const machineChoice = text.options[Math.floor(Math.random() * text.options.length)];
    const outcome = getWinner(option.value, machineChoice.value);
    if (outcome === 'player') {
      state.wins += 1;
      result.textContent = text.playerWins.replace('{player}', option.label).replace('{machine}', machineChoice.label);
    } else if (outcome === 'machine') {
      state.losses += 1;
      result.textContent = text.machineWins.replace('{machine}', machineChoice.label);
    } else {
      state.draws += 1;
      result.textContent = text.draw.replace('{choice}', option.label);
    }
    refreshScores();
  }

  text.options.forEach((option) => {
    wrapper.querySelector(`[data-choice="${option.value}"]`).addEventListener('click', () => play(option));
  });
  wrapper.querySelector('[data-action="clear-score"]').addEventListener('click', () => {
    Object.assign(state, { wins: 0, losses: 0, draws: 0 });
    resetGameScore('rps');
    result.textContent = text.resetTable;
    refreshScores();
  });
  refreshScores();
  return wrapper;
}
