import { createElementFromHTML } from './dom.js';

export function createGamesSection(games, language, gameFactories) {
  const section = createElementFromHTML(`<section class="games-section" id="games">${games.map((game) => `
    <article class="game-card game-card--${game.accent}"><div class="game-card__header"><span class="game-tag">${game.badge[language]}</span><h2>${game.title[language]}</h2></div>
      <p class="game-card__description">${game.description[language]}</p><div class="game-card__slot" data-slot="${game.id}"></div>
    </article>`).join('')}</section>`);
  Object.entries(gameFactories).forEach(([key, factory]) => section.querySelector(`[data-slot="${key}"]`)?.append(factory(language)));
  return section;
}
