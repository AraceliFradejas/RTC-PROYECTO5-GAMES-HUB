const STORAGE_KEY = 'gamesHubScores';

function safeParse(rawValue) {
  try {
    return rawValue ? JSON.parse(rawValue) : {};
  } catch {
    return {};
  }
}

export function readAllScores() {
  try {
    return safeParse(localStorage.getItem(STORAGE_KEY));
  } catch {
    return {};
  }
}

export function writeAllScores(scores) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  } catch {
    // Ignore if storage is disabled in the browser.
  }
}

export function readGameScore(gameKey, fallback = {}) {
  const allScores = readAllScores();
  return { ...fallback, ...(allScores[gameKey] ?? {}) };
}

export function writeGameScore(gameKey, scoreState) {
  const allScores = readAllScores();
  allScores[gameKey] = scoreState;
  writeAllScores(allScores);
}

export function resetGameScore(gameKey) {
  const allScores = readAllScores();
  delete allScores[gameKey];
  writeAllScores(allScores);
}
