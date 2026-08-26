import { createElementFromHTML } from './dom.js';

const socials = [['Instagram', 'https://www.instagram.com/goldilocks1013x/'], ['X (Twitter)', 'https://x.com/AraceliFradejas'], ['TikTok', 'https://www.tiktok.com/@arucci1'], ['YouTube', 'https://www.youtube.com/@aracelifradejasmunoz2758'], ['LinkedIn', 'https://www.linkedin.com/in/araceli-fradejas-munoz-transformaciondigital/'], ['Medium', 'https://medium.com/@araceli.fradejas']];
const notes = {
  es: ['NOTA IMPORTANTE:', 'Estoy aprendiendo programación y esto lo hago para divertirme durante las vacaciones. Es un proyecto personal, creativo y experimental dentro del módulo "Web Design Advanced" de ThePower Tech. No es una aplicación oficial ni un producto comercial, sino una forma de practicar, aprender y disfrutar haciendo cosas con código.'],
  en: ['IMPORTANT NOTE:', 'I am learning programming and I am doing this to have fun during my holidays. This is a personal, creative and experimental project for the "Web Design Advanced" module at ThePower Tech. It is not an official app or a commercial product, but a way to practise, learn and enjoy creating things with code.'],
};

export function createFooter(text, language) {
  const [title, note] = notes[language] || notes.es;
  return createElementFromHTML(`<footer class="footer"><div class="footer__socials"><p class="footer__title">${text.footerTitle}</p><div class="footer__links">${socials.map(([name, url]) => `<a href="${url}" target="_blank" rel="noreferrer" aria-label="${name}">${name}</a>`).join('')}</div></div><div class="footer__meta"><p>© 2026 Araceli Fradejas Muñoz</p></div><div class="footer__note"><p><strong>${title}</strong> ${note}</p></div></footer>`);
}
