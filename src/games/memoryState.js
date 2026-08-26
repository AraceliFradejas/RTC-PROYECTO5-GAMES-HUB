export const emojiPool = ['☕', '✦', '🎧', '🌙', '💡', '🪩', '🌿', '✨'];

export function shuffle(array) {
  const copy = [...array];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

export function createDeck() {
  return shuffle([...emojiPool, ...emojiPool]).map((symbol, index) => ({
    id: `${symbol}-${index}`,
    symbol,
    matched: false,
    flipped: false,
  }));
}

export function resetMemoryState(state, status) {
  Object.assign(state, { deck: createDeck(), opened: [], moves: 0, solved: 0, checkingPair: false, status });
  state.turnId += 1;
}
