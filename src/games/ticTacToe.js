import { readGameScore, resetGameScore, writeGameScore } from '../storage.js';
import { getGameText, ticTacToeText } from './translations.js';
import { threePartScore, ticTacToeBoard, ticTacToeTemplate } from './templates.js';

const defaults = { X: 0, O: 0, draws: 0 };
const winningLines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

export function checkWinner(board) {
  const line = winningLines.find(([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c]);
  return line ? board[line[0]] : board.every(Boolean) ? 'draw' : null;
}

export function createTicTacToeGame(language = 'es') {
  const text = getGameText(ticTacToeText, language);
  const state = { board: Array(9).fill(''), currentPlayer: 'X', active: true, scores: readGameScore('tictactoe', defaults) };
  const wrapper = ticTacToeTemplate(text, language);
  const turnText = wrapper.querySelector('[data-turn-label]');
  const board = wrapper.querySelector('.tic-tac-toe');
  const status = wrapper.querySelector('.game-card__status');
  const scoreBoard = wrapper.querySelector('.score-row');

  function renderBoard() {
    board.innerHTML = ticTacToeBoard(state, text);
    board.querySelectorAll('[data-index]').forEach((button) => button.addEventListener('click', () => makeMove(Number(button.dataset.index))));
    const player = turnText.querySelector('strong');
    turnText.firstChild.textContent = state.active ? `${text.turnLabel} ` : text.finished;
    player.hidden = !state.active;
    player.textContent = state.currentPlayer;
    player.style.color = state.currentPlayer === 'X' ? '#f5d5a5' : '#c4d4ff';
  }

  function updateScores() {
    scoreBoard.innerHTML = threePartScore(['X', text.draws, 'O'], [state.scores.X, state.scores.draws, state.scores.O]);
    writeGameScore('tictactoe', state.scores);
  }

  function finishRound(result) {
    state.active = false;
    if (result === 'draw') {
      state.scores.draws += 1;
      status.textContent = text.drawMessage;
    } else {
      state.scores[result] += 1;
      status.textContent = result === 'X' ? text.xWins : text.oWins;
    }
    updateScores();
  }

  function makeMove(index) {
    if (!state.active || state.board[index]) return;
    state.board[index] = state.currentPlayer;
    const result = checkWinner(state.board);
    if (result) finishRound(result);
    else {
      state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
      status.textContent = `${text.turnLabel} ${state.currentPlayer}`;
    }
    renderBoard();
  }

  wrapper.querySelector('[data-action="reset-board"]').addEventListener('click', () => {
    Object.assign(state, { board: Array(9).fill(''), currentPlayer: 'X', active: true });
    status.textContent = text.starts;
    renderBoard();
  });
  wrapper.querySelector('[data-action="clear-score"]').addEventListener('click', () => {
    state.scores = { ...defaults };
    resetGameScore('tictactoe');
    updateScores();
  });
  renderBoard();
  updateScores();
  return wrapper;
}
