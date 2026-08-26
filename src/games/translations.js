export const ticTacToeText = {
  es: { reset: 'Reiniciar', starts: 'Empieza la partida.', draws: 'Empates', clearScore: 'Borrar puntuación', turnLabel: 'Turno de', drawMessage: 'Empate. La partida queda nivelada.', xWins: 'Gana X. Muy bien jugado.', oWins: 'Gana O. Buen duelo.', finished: 'Partida terminada', cell: 'Casilla' },
  en: { reset: 'Reset', starts: 'The round starts here.', draws: 'Draws', clearScore: 'Clear score', turnLabel: 'Turn of', drawMessage: 'Draw. The round stays even.', xWins: 'X wins. Nice move.', oWins: 'O wins. Good match.', finished: 'Round finished', cell: 'Cell' },
};

export const memoryText = {
  es: { attempts: 'Intentos', reset: 'Reiniciar', pairs: 'Pares', best: 'Récord', searchPairs: 'Busca los pares.', matchFound: 'Pareja encontrada.', noMatch: 'No coincide. Inténtalo de nuevo.', complete: '¡Lo has completado!', hiddenCard: 'Carta oculta', visibleCard: 'Carta con', matchedCard: 'Pareja encontrada con', clearScore: 'Borrar récord', scoreCleared: 'El récord se ha borrado.' },
  en: { attempts: 'Attempts', reset: 'Reset', pairs: 'Pairs', best: 'Best', searchPairs: 'Find the matches.', matchFound: 'Match found.', noMatch: 'No match. Try again.', complete: 'You completed it!', hiddenCard: 'Hidden card', visibleCard: 'Card showing', matchedCard: 'Matched card showing', clearScore: 'Clear best score', scoreCleared: 'The best score has been cleared.' },
};

const choices = {
  es: [['Piedra', 'rock', '✊'], ['Papel', 'paper', '✋'], ['Tijera', 'scissors', '✌️']],
  en: [['Rock', 'rock', '✊'], ['Paper', 'paper', '✋'], ['Scissors', 'scissors', '✌️']],
};

export const rpsText = {
  es: { chooseMove: 'Elige tu movimiento.', wins: 'Victorias', draws: 'Empates', losses: 'Derrotas', clearScore: 'Borrar puntuación', resetTable: 'La tabla se ha reiniciado.', playerWins: 'Tú eliges {player} y ganas a {machine}.', machineWins: 'La máquina elige {machine} y se lleva la victoria.', draw: 'Empate. Ambos habéis elegido {choice}.' },
  en: { chooseMove: 'Choose your move.', wins: 'Wins', draws: 'Draws', losses: 'Losses', clearScore: 'Clear score', resetTable: 'The scoreboard has been reset.', playerWins: 'You pick {player} and beat {machine}.', machineWins: 'The machine picks {machine} and takes the round.', draw: 'Draw. You both picked {choice}.' },
};

Object.keys(choices).forEach((language) => {
  rpsText[language].options = choices[language].map(([label, value, emoji]) => ({ label, value, emoji }));
});

export function getGameText(dictionary, language) {
  return dictionary[language] || dictionary.es;
}
