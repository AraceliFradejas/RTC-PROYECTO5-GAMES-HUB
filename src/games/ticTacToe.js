import { readGameScore, writeGameScore } from '../storage.js';

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

function checkWinner(board) {
  for (const [a, b, c] of winningLines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return board.every(Boolean) ? 'draw' : null;
}

export function createTicTacToeGame() {
  const gameState = {
    board: Array(9).fill(''),
    currentPlayer: 'X',
    active: true,
    scores: readGameScore('tictactoe', scoreDefaults),
  };

  const wrapper = document.createElement('div');
  wrapper.className = 'game-card__body game-card__body--board';

  const heading = document.createElement('div');
  heading.className = 'game-card__meta';
  heading.innerHTML = `
    <span>Turno de <strong>X</strong></span>
    <button type="button" class="mini-button" data-action="reset-board">Reiniciar</button>
  `;

  const board = document.createElement('div');
  board.className = 'tic-tac-toe';

  const status = document.createElement('p');
  status.className = 'game-card__status';
  status.textContent = 'Empieza la partida.';

  const scoreBoard = document.createElement('div');
  scoreBoard.className = 'score-row';
  scoreBoard.innerHTML = `
    <div class="score-chip"><span>X</span><strong>${gameState.scores.X}</strong></div>
    <div class="score-chip score-chip--muted"><span>Empates</span><strong>${gameState.scores.draws}</strong></div>
    <div class="score-chip"><span>O</span><strong>${gameState.scores.O}</strong></div>
  `;

  const resetScoresButton = document.createElement('button');
  resetScoresButton.type = 'button';
  resetScoresButton.className = 'mini-button mini-button--ghost';
  resetScoresButton.textContent = 'Borrar puntuación';

  function paintBoard() {
    board.innerHTML = '';

    gameState.board.forEach((cellValue, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `cell ${cellValue ? 'cell--filled' : ''}`;
      button.setAttribute('data-index', String(index));
      button.setAttribute('aria-label', `Casilla ${index + 1}`);
      button.textContent = cellValue;
      button.disabled = !gameState.active || Boolean(cellValue);
      button.addEventListener('click', () => makeMove(index));
      board.appendChild(button);
    });

    const turnLabel = heading.querySelector('strong');
    turnLabel.textContent = gameState.currentPlayer;
    turnLabel.style.color = gameState.currentPlayer === 'X' ? '#f5d5a5' : '#c4d4ff';
  }

  function updateScores() {
    scoreBoard.innerHTML = `
      <div class="score-chip"><span>X</span><strong>${gameState.scores.X}</strong></div>
      <div class="score-chip score-chip--muted"><span>Empates</span><strong>${gameState.scores.draws}</strong></div>
      <div class="score-chip"><span>O</span><strong>${gameState.scores.O}</strong></div>
    `;
    writeGameScore('tictactoe', gameState.scores);
  }

  function finishRound(result) {
    gameState.active = false;

    if (result === 'draw') {
      gameState.scores.draws += 1;
      status.textContent = 'Empate. La partida queda nivelada.';
    } else {
      if (result === 'X') {
        gameState.scores.X += 1;
        status.textContent = 'Gana X. Muy bien jugado.';
      } else {
        gameState.scores.O += 1;
        status.textContent = 'Gana O. Buen duelo.';
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
    status.textContent = `Turno de ${gameState.currentPlayer}`;
    paintBoard();
  }

  function resetBoard() {
    gameState.board = Array(9).fill('');
    gameState.currentPlayer = 'X';
    gameState.active = true;
    status.textContent = 'Empieza la partida.';
    paintBoard();
  }

  heading.querySelector('[data-action="reset-board"]').addEventListener('click', resetBoard);
  resetScoresButton.addEventListener('click', () => {
    gameState.scores = { X: 0, O: 0, draws: 0 };
    updateScores();
  });

  paintBoard();
  wrapper.append(heading, board, status, scoreBoard, resetScoresButton);

  return wrapper;
}
