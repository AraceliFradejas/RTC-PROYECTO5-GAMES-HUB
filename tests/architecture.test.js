import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { extname, join } from 'node:path';
import { memoryText, ticTacToeText } from '../src/games/translations.js';
import { footerNotes } from '../src/components/Footer.js';

const sourceFiles = [
  ...readdirSync('src/components').map((file) => join('src/components', file)),
  ...readdirSync('src/games').map((file) => join('src/games', file)),
  ...readdirSync('src/styles').map((file) => join('src/styles', file)),
  'src/main.js',
  'src/data.js',
  'src/storage.js',
];

test('los módulos refactorizados no superan 100 líneas', () => {
  sourceFiles.forEach((file) => {
    const lines = readFileSync(file, 'utf8').trimEnd().split('\n').length;
    assert.ok(lines <= 100, `${file} tiene ${lines} líneas`);
  });
});

test('solo el helper DOM utiliza createElement', () => {
  sourceFiles.filter((file) => extname(file) === '.js' && !file.endsWith('dom.js')).forEach((file) => {
    assert.doesNotMatch(readFileSync(file, 'utf8'), /document\.createElement\(/, file);
  });
});

test('los textos corregidos existen en ambos idiomas', () => {
  assert.equal(memoryText.es.clearScore, 'Borrar récord');
  assert.equal(memoryText.en.clearScore, 'Clear best score');
  assert.equal(ticTacToeText.es.finished, 'Partida terminada');
  assert.equal(ticTacToeText.en.finished, 'Round finished');
  assert.match(footerNotes.es.join(' '), /Estoy aprendiendo programación/);
  assert.doesNotMatch(footerNotes.es.join(' '), /I am learning/);
  assert.match(footerNotes.en.join(' '), /I am learning/);
  assert.doesNotMatch(footerNotes.en.join(' '), /Estoy aprendiendo/);
});
