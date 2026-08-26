import { createElementFromHTML } from './dom.js';

export function createHeader(text, language, onLanguageChange) {
  const header = createElementFromHTML(`
    <header class="topbar">
      <a href="#top" class="brand" aria-label="${language === 'es' ? 'Ir al inicio' : 'Go to top'}">
        <span class="brand__mark">AFM</span><span class="brand__text"><strong>Games Hub</strong></span>
      </a>
      <div class="header__controls">
        <nav class="main-nav" aria-label="${language === 'es' ? 'Navegación principal' : 'Main navigation'}">
          <a href="#games">${text.nav[0]}</a><a href="#scores">${text.nav[1]}</a><a href="#about">${text.nav[2]}</a>
        </nav>
        <button type="button" class="lang-switch">${text.toggle}</button>
      </div>
    </header>`);
  header.querySelector('.lang-switch').addEventListener('click', onLanguageChange);
  return header;
}
