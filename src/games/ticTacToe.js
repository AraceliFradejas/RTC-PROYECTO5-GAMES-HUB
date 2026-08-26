import { readGameScore, resetGameScore, writeGameScore } from '../storage.js';
import { createElementFromHTML } from '../components/dom.js';

const scoreDefaults = { X: 0, O: 0, draws: 0 };
const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const strings = {
  es: {
    reset: 'Reiniciar',
    starts: 'Empieza la partida.',
    draws: 'Empates',
    clearScore: 'Borrar puntuación',
    turnLabel: 'Turno de',
    drawMessage: 'Empate. La partida queda nivelada.',
    xWins: 'Gana X. Muy bien jugado.',
    oWins: 'Gana O. Buen duelo.',
    finished: 'Partida terminada',
    cell: 'Casilla',
  },
  en: {
    reset: 'Reset',
    starts: 'The round starts here.',
    draws: 'Draws',
    clearScore: 'Clear score',
    turnLabel: 'Turn of',
    drawMessage: 'Draw. The round stays even.',
    xWins: 'X wins. Nice move.',
    oWins: 'O wins. Good match.',
    finished: 'Round finished',
    cell: 'Cell',
  },
};

export function checkWinner(board) {
  for (const [a, b, c] of winningLines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return board.every(Boolean) ? 'draw' : null;
}

export function createTicTacToeGame(language = 'es') {
  const text = strings[language] || strings.es;
  const gameState = {
    board: Array(9).fill(''),
    currentPlayer: 'X',
    active: true,
    scores: readGameScore('tictactoe', scoreDefaults),
  };

  const wrapper = createElementFromHTML(`<div class="game-card__body game-card__body--board">
    <div class="game-card__meta"><span data-turn-label>${text.turnLabel} <strong>X</strong></span><button type="button" class="mini-button" data-action="reset-board">${text.reset}</button></div>
    <div class="tic-tac-toe" role="group" aria-label="${language === 'es' ? 'Tablero de tres en raya' : 'Tic-tac-toe board'}"></div>
    <p class="game-card__status" aria-live="polite">${text.starts}</p><div class="score-row"></div>
    <button type="button" class="mini-button mini-button--ghost" data-action="clear-score">${text.clearScore}</button>
  </div>`);
  const heading = wrapper.querySelector('.game-card__meta');
  const turnText = wrapper.querySelector('[data-turn-label]');
  const board = wrapper.querySelector('.tic-tac-toe');
  const status = wrapper.querySelector('.game-card__status');
  const scoreBoard = wrapper.querySelector('.score-row');

  function paintBoard() {
    board.innerHTML = gameState.board.map((value, index) => `<button type="button" class="cell ${value ? 'cell--filled' : ''}" data-index="${index}" aria-label="${text.cell} ${index + 1}${value ? `: ${value}` : ''}" ${!gameState.active || value ? 'disabled' : ''}>${value}</button>`).join('');
    board.querySelectorAll('[data-index]').forEach((button) => button.addEventListener('click', () => makeMove(Number(button.dataset.index))));

    const turnLabel = heading.querySelector('strong');
    turnLabel.textContent = gameState.currentPlayer;
    turnLabel.style.color = gameState.currentPlayer === 'X' ? '#f5d5a5' : '#c4d4ff';
    turnText.firstChild.textContent = gameState.active ? `${text.turnLabel} ` : `${text.finished} `;
    turnLabel.hidden = !gameState.active;
  }

  function updateScores() {
    scoreBoard.innerHTML = `
      <div class="score-chip"><span>X</span><strong>${gameState.scores.X}</strong></div>
      <div class="score-chip score-chip--muted"><span>${text.draws}</span><strong>${gameState.scores.draws}</strong></div>
      <div class="score-chip"><span>O</span><strong>${gameState.scores.O}</strong></div>
    `;
    writeGameScore('tictactoe', gameState.scores);
  }

  function finishRound(result) {
    gameState.active = false;

    if (result === 'draw') {
      gameState.scores.draws += 1;
      status.textContent = text.drawMessage;
    } else {
      if (result === 'X') {
        gameState.scores.X += 1;
        status.textContent = text.xWins;
      } else {
        gameState.scores.O += 1;
        status.textContent = text.oWins;
      }
    }

    updateScores();
  }

  function makeMove(index) {
    if (!gameState.active || gameState.board[index]) return;

    gameState.board[index] = gameState.currentPlayer;
    const result = checkWinner(gameState.board);

    if (result) {
      finishRound(result);
      paintBoard();
      return;
    }

    gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `${text.turnLabel} ${gameState.currentPlayer}`;
    paintBoard();
  }

  function resetBoard() {
    gameState.board = Array(9).fill('');
    gameState.currentPlayer = 'X';
    gameState.active = true;
    status.textContent = text.starts;
    paintBoard();
  }

  heading.querySelector('[data-action="reset-board"]').addEventListener('click', resetBoard);
  wrapper.querySelector('[data-action="clear-score"]').addEventListener('click', () => {
    gameState.scores = { X: 0, O: 0, draws: 0 };
    resetGameScore('tictactoe');
    updateScores();
  });

  paintBoard();
  return wrapper;
}
