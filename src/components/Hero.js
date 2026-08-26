import { createElementFromHTML } from './dom.js';

const heroArt = `<svg viewBox="0 0 420 260" aria-hidden="true">
  <path d="M40 175C90 140 120 155 160 120S250 70 310 115S355 150 380 142" fill="none" stroke="#5f4b4b" stroke-width="3" stroke-dasharray="6 8" opacity=".6"/>
  <g transform="translate(56 42)"><rect width="92" height="92" rx="20" fill="#fef8ee" stroke="#5f4b4b" stroke-width="2.5"/><path d="M26 25h40M26 46h40M26 67h30" stroke="#5f4b4b" stroke-width="3"/><circle cx="71" cy="63" r="12" fill="none" stroke="#d28f6d" stroke-width="3"/></g>
  <g transform="translate(170 38)"><rect width="102" height="112" rx="20" fill="#fffaf4" stroke="#5f4b4b" stroke-width="2.5"/><path d="M25 25L55 55L85 25M25 70L55 40L85 70M25 40L55 65L85 40" stroke="#d28f6d" stroke-width="3" fill="none"/></g>
  <g transform="translate(295 48)"><path d="M6 60L48 18L92 62L50 98Z" fill="#f6ece0" stroke="#5f4b4b" stroke-width="2.5"/><circle cx="50" cy="58" r="16" fill="none" stroke="#c98e7c" stroke-width="3"/><path d="M50 42v32M34 58h32" stroke="#5f4b4b" stroke-width="3"/></g>
</svg>`;

export function createHero(text, language) {
  const details = language === 'es' ? 'Detalles del proyecto' : 'Project details';
  const scoreLabel = language === 'es' ? 'Resumen general de puntuación' : 'Overall score summary';
  const progress = language === 'es' ? 'Tu tablero de progreso' : 'Your progress board';
  return createElementFromHTML(`<section class="hero">
    <div class="hero__copy"><span class="eyebrow">${text.eyebrow}</span><h1>${text.heroTitle}</h1><p>${text.heroText}</p>
      <div class="hero__badges" aria-label="${details}">${text.badges.map((badge) => `<span>${badge}</span>`).join('')}</div>
      <div class="hero__actions"><a href="#games" class="button button--primary">${text.primaryButton}</a><a href="#about" class="button button--ghost">${text.secondaryButton}</a></div>
    </div>
    <div class="hero__panel" id="scores" aria-label="${scoreLabel}"><div class="hero__art">${heroArt}</div><p>${progress}</p>
      <div class="summary-grid" aria-live="polite">${Object.entries(text.summary).map(([key, label]) => `<div><span class="summary-label">${label}</span><strong data-summary="${key}">0</strong></div>`).join('')}</div>
    </div>
  </section>`);
}
