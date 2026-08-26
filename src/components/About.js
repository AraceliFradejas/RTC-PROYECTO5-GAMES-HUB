import { createElementFromHTML } from './dom.js';

export function createAbout(text) {
  return createElementFromHTML(`<section class="about-section" id="about"><div class="about-panel"><span class="eyebrow">${text.aboutEyebrow}</span><h2>${text.aboutTitle}</h2><p>${text.aboutText}</p></div></section>`);
}
