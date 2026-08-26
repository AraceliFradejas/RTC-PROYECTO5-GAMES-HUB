import test from 'node:test';
import assert from 'node:assert/strict';
import { checkWinner } from '../src/games/ticTacToe.js';
import { getWinner } from '../src/games/rps.js';
import { readAllScores, resetGameScore } from '../src/storage.js';

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

test('resetGameScore borra solo la puntuación del juego indicado', () => {
  const values = new Map([
    ['gamesHubScores', JSON.stringify({ memory: { best: 12 }, rps: { wins: 3 } })],
  ]);
  global.localStorage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
  global.window = { dispatchEvent: () => {} };
  global.CustomEvent = class CustomEvent {};

  resetGameScore('memory');

  assert.deepEqual(readAllScores(), { rps: { wins: 3 } });
});
