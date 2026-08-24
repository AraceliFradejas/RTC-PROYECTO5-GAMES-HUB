import test from 'node:test';
import assert from 'node:assert/strict';
import { checkWinner } from '../src/games/ticTacToe.js';
import { getWinner } from '../src/games/rps.js';

test('tres en raya detecta las ocho líneas ganadoras', () => {
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

  winningLines.forEach((line) => {
    const board = Array(9).fill('');
    line.forEach((index) => {
      board[index] = 'X';
    });
    assert.equal(checkWinner(board), 'X');
  });
});

test('tres en raya diferencia empate y partida sin terminar', () => {
  assert.equal(checkWinner(['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X']), 'draw');
  assert.equal(checkWinner(['X', 'O', '', '', 'X', '', '', '', 'O']), null);
});

test('piedra, papel o tijera calcula victorias y empates', () => {
  assert.equal(getWinner('rock', 'scissors'), 'player');
  assert.equal(getWinner('paper', 'rock'), 'player');
  assert.equal(getWinner('scissors', 'paper'), 'player');
  assert.equal(getWinner('rock', 'paper'), 'machine');
  assert.equal(getWinner('paper', 'paper'), 'draw');
});
