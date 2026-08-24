(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();const _=[{id:"tictactoe",title:"Tres en raya",accent:"sun",description:"El clásico de estrategia más limpio del tablero: dos jugadores, una sola línea y cero distracciones.",badge:"Obligatorio"},{id:"memory",title:"Memoria visual",accent:"rose",description:"Encuentra cada par antes de quedarte sin turnos y mantén la mente fina.",badge:"Casual"},{id:"rps",title:"Piedra, papel o tijera",accent:"gold",description:"Un duelo rápido y elegante contra la máquina: sencillísimo de jugar, imposible de dejar de repetir.",badge:"Rápido"}],w="gamesHubScores";function L(e){try{return e?JSON.parse(e):{}}catch{return{}}}function $(){try{return L(localStorage.getItem(w))}catch{return{}}}function C(e){try{localStorage.setItem(w,JSON.stringify(e))}catch{}}function h(e,t={}){const a=$();return{...t,...a[e]??{}}}function y(e,t){const a=$();a[e]=t,C(a)}const N={X:0,O:0,draws:0},M=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];function x(e){for(const[t,a,n]of M)if(e[t]&&e[t]===e[a]&&e[t]===e[n])return e[t];return e.every(Boolean)?"draw":null}function P(){const e={board:Array(9).fill(""),currentPlayer:"X",active:!0,scores:h("tictactoe",N)},t=document.createElement("div");t.className="game-card__body game-card__body--board";const a=document.createElement("div");a.className="game-card__meta",a.innerHTML=`
    <span>Turno de <strong>X</strong></span>
    <button type="button" class="mini-button" data-action="reset-board">Reiniciar</button>
  `;const n=document.createElement("div");n.className="tic-tac-toe";const s=document.createElement("p");s.className="game-card__status",s.textContent="Empieza la partida.";const r=document.createElement("div");r.className="score-row",r.innerHTML=`
    <div class="score-chip"><span>X</span><strong>${e.scores.X}</strong></div>
    <div class="score-chip score-chip--muted"><span>Empates</span><strong>${e.scores.draws}</strong></div>
    <div class="score-chip"><span>O</span><strong>${e.scores.O}</strong></div>
  `;const i=document.createElement("button");i.type="button",i.className="mini-button mini-button--ghost",i.textContent="Borrar puntuación";function d(){n.innerHTML="",e.board.forEach((l,m)=>{const p=document.createElement("button");p.type="button",p.className=`cell ${l?"cell--filled":""}`,p.setAttribute("data-index",String(m)),p.setAttribute("aria-label",`Casilla ${m+1}`),p.textContent=l,p.disabled=!e.active||!!l,p.addEventListener("click",()=>f(m)),n.appendChild(p)});const c=a.querySelector("strong");c.textContent=e.currentPlayer,c.style.color=e.currentPlayer==="X"?"#f5d5a5":"#c4d4ff"}function u(){r.innerHTML=`
      <div class="score-chip"><span>X</span><strong>${e.scores.X}</strong></div>
      <div class="score-chip score-chip--muted"><span>Empates</span><strong>${e.scores.draws}</strong></div>
      <div class="score-chip"><span>O</span><strong>${e.scores.O}</strong></div>
    `,y("tictactoe",e.scores)}function g(c){e.active=!1,c==="draw"?(e.scores.draws+=1,s.textContent="Empate. La partida queda nivelada."):c==="X"?(e.scores.X+=1,s.textContent="Gana X. Muy bien jugado."):(e.scores.O+=1,s.textContent="Gana O. Buen duelo."),u()}function f(c){if(!e.active||e.board[c])return;e.board[c]=e.currentPlayer;const l=x(e.board);if(l){g(l),d();return}e.currentPlayer=e.currentPlayer==="X"?"O":"X",s.textContent=`Turno de ${e.currentPlayer}`,d()}function o(){e.board=Array(9).fill(""),e.currentPlayer="X",e.active=!0,s.textContent="Empieza la partida.",d()}return a.querySelector('[data-action="reset-board"]').addEventListener("click",o),i.addEventListener("click",()=>{e.scores={X:0,O:0,draws:0},u()}),d(),t.append(a,n,s,r,i),t}const v=["☕","✦","🎧","🌙","💡","🪩","🌿","✨"];function E(e){const t=[...e];for(let a=t.length-1;a>0;a-=1){const n=Math.floor(Math.random()*(a+1));[t[a],t[n]]=[t[n],t[a]]}return t}function T(){const e={deck:E([...v,...v]).map((o,c)=>({id:`${o}-${c}`,symbol:o,matched:!1,flipped:!1})),opened:[],moves:0,solved:0,status:"Busca los pares.",best:h("memory",{best:0}).best},t=document.createElement("div");t.className="game-card__body";const a=document.createElement("div");a.className="game-card__meta",a.innerHTML=`
    <span>Intentos: <strong>${e.moves}</strong></span>
    <button type="button" class="mini-button" data-action="reset-memory">Reiniciar</button>
  `;const n=document.createElement("div");n.className="memory-board";const s=document.createElement("p");s.className="game-card__status",s.textContent=e.status;const r=document.createElement("div");r.className="score-row",r.innerHTML=`
    <div class="score-chip"><span>Pares</span><strong>${e.solved}/8</strong></div>
    <div class="score-chip score-chip--muted"><span>Récord</span><strong>${e.best||"—"}</strong></div>
  `;function i(){n.innerHTML="",e.deck.forEach(o=>{const c=document.createElement("button");c.type="button",c.className=`memory-card ${o.flipped||o.matched?"is-visible":""} ${o.matched?"is-matched":""}`,c.textContent=o.flipped||o.matched?o.symbol:"?",c.disabled=o.matched||o.flipped,c.addEventListener("click",()=>g(o.id)),n.appendChild(c)}),a.querySelector("strong").textContent=e.moves,r.innerHTML=`
      <div class="score-chip"><span>Pares</span><strong>${e.solved}/8</strong></div>
      <div class="score-chip score-chip--muted"><span>Récord</span><strong>${e.best||"—"}</strong></div>
    `}function d(o){e.status=o,s.textContent=o}function u(){const o=e.best?Math.min(e.best,e.moves):e.moves;e.best=o,y("memory",{best:o})}function g(o){const c=e.deck.find(l=>l.id===o);if(!(!c||c.flipped||c.matched)){if(c.flipped=!0,e.opened.push(c),e.opened.length===2){e.moves+=1;const[l,m]=e.opened;l.symbol===m.symbol?(l.matched=!0,m.matched=!0,e.solved+=1,e.opened=[],d("Pareja encontrada."),e.solved===v.length&&(u(),d("¡Lo has completado!"))):(d("No coincide. Inténtalo de nuevo."),setTimeout(()=>{l.flipped=!1,m.flipped=!1,e.opened=[],i()},600))}i()}}function f(){e.deck=E([...v,...v]).map((o,c)=>({id:`${o}-${c}`,symbol:o,matched:!1,flipped:!1})),e.opened=[],e.moves=0,e.solved=0,e.status="Busca los pares.",i(),d(e.status)}return a.querySelector('[data-action="reset-memory"]').addEventListener("click",f),i(),t.append(a,n,s,r),t}const b=[{label:"Piedra",value:"rock",emoji:"✊"},{label:"Papel",value:"paper",emoji:"✋"},{label:"Tijera",value:"scissors",emoji:"✌️"}];function O(e,t){return e===t?"draw":{rock:"scissors",paper:"rock",scissors:"paper"}[e]===t?"player":"machine"}function j(){const e=h("rps",{wins:0,losses:0,draws:0}),t=document.createElement("div");t.className="game-card__body";const a=document.createElement("div");a.className="rps-controls";const n=document.createElement("p");n.className="game-card__status",n.textContent="Elige tu movimiento.";const s=document.createElement("div");s.className="score-row",s.innerHTML=`
    <div class="score-chip"><span>Wins</span><strong>${e.wins}</strong></div>
    <div class="score-chip score-chip--muted"><span>Empates</span><strong>${e.draws}</strong></div>
    <div class="score-chip"><span>Losses</span><strong>${e.losses}</strong></div>
  `;function r(){s.innerHTML=`
      <div class="score-chip"><span>Wins</span><strong>${e.wins}</strong></div>
      <div class="score-chip score-chip--muted"><span>Empates</span><strong>${e.draws}</strong></div>
      <div class="score-chip"><span>Losses</span><strong>${e.losses}</strong></div>
    `,y("rps",e)}b.forEach(d=>{const u=document.createElement("button");u.type="button",u.className="rps-button",u.innerHTML=`${d.emoji}<span>${d.label}</span>`,u.addEventListener("click",()=>{const g=b[Math.floor(Math.random()*b.length)].value,f=O(d.value,g),o=b.find(c=>c.value===g);f==="player"?(e.wins+=1,n.textContent=`Tú eliges ${d.label} y ganas a ${o.label}.`):f==="machine"?(e.losses+=1,n.textContent=`La máquina elige ${o.label} y se lleva la victoria.`):(e.draws+=1,n.textContent=`Empate. Ambos habéis elegido ${d.label}.`),r()}),a.appendChild(u)});const i=document.createElement("button");return i.type="button",i.className="mini-button mini-button--ghost",i.textContent="Borrar puntuación",i.addEventListener("click",()=>{e.wins=0,e.losses=0,e.draws=0,n.textContent="La tabla se ha reiniciado.",r()}),t.append(a,n,s,i),t}const q=document.querySelector("#app");q.innerHTML=`
  <div class="page-shell">
    <header class="topbar">
      <a href="#top" class="brand" aria-label="Ir al inicio">
        <span class="brand__mark">AFM</span>
        <span class="brand__text">
          <strong>Araceli Fradejas</strong>
          <small>Games Hub</small>
        </span>
      </a>
      <nav class="main-nav" aria-label="Navegación principal">
        <a href="#games">Juegos</a>
        <a href="#scores">Puntuación</a>
        <a href="#about">Sobre el proyecto</a>
      </nav>
    </header>

    <main id="top">
      <section class="hero">
        <div class="hero__copy">
          <span class="eyebrow">Una pequeña colección personal</span>
          <h1>Juegos rápidos, elegantes y hechos <span>a mi manera.</span></h1>
          <p>
            Un rincón digital donde la lógica y el diseño se encuentran con una estética sobria,
            cercana y distinta. Porque incluso las ideas más simples pueden sentirse muy personales.
          </p>
          <div class="hero__actions">
            <a href="#games" class="button button--primary">Explorar juegos</a>
            <a href="#about" class="button button--ghost">Más sobre el proyecto</a>
          </div>
        </div>

        <div class="hero__panel" id="scores" aria-label="Resumen general de puntuación">
          <p>Panel general</p>
          <div class="summary-grid">
            <div>
              <span class="summary-label">Tres en raya</span>
              <strong data-summary="tictactoe">0</strong>
            </div>
            <div>
              <span class="summary-label">Memoria</span>
              <strong data-summary="memory">0</strong>
            </div>
            <div>
              <span class="summary-label">Piedra / Papel / Tijera</span>
              <strong data-summary="rps">0</strong>
            </div>
          </div>
        </div>
      </section>

      <section class="games-section" id="games">
        ${_.map(e=>`
              <article class="game-card game-card--${e.accent}" data-game-card="${e.id}">
                <div class="game-card__header">
                  <span class="game-tag">${e.badge}</span>
                  <h2>${e.title}</h2>
                </div>
                <p class="game-card__description">${e.description}</p>
                <div class="game-card__slot" data-slot="${e.id}"></div>
              </article>
            `).join("")}
      </section>

      <section class="about-section" id="about">
        <div class="about-panel">
          <span class="eyebrow">Sobre el proyecto</span>
          <h3>Un pequeño espacio para jugar, pensar y disfrutar.</h3>
          <p>
            Games Hub nació como una idea muy clara: construir una web de juegos con una sensibilidad
            más editorial que tecnológica. El objetivo no era crear algo excesivamente complejo, sino
            algo cómodo, elegante, útil y con personalidad propia. Cada juego tiene su lugar, su tono y
            su forma de invitar a jugar sin ruido visual innecesario.
          </p>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>Games Hub — diseño y lógica pensadas con calma.</p>
    </footer>
  </div>
`;const H={tictactoe:P,memory:T,rps:j};Object.entries(H).forEach(([e,t])=>{const a=document.querySelector(`[data-slot="${e}"]`);a&&a.appendChild(t())});function S(){const e=JSON.parse(localStorage.getItem("gamesHubScores")||"{}"),t=e.tictactoe||{X:0,O:0,draws:0},a=e.memory||{best:0},n=e.rps||{wins:0,losses:0,draws:0},s=document.querySelector('[data-summary="tictactoe"]'),r=document.querySelector('[data-summary="memory"]'),i=document.querySelector('[data-summary="rps"]');s&&(s.textContent=(t.X||0)+(t.O||0)+(t.draws||0)),r&&(r.textContent=a.best||0),i&&(i.textContent=(n.wins||0)+(n.losses||0)+(n.draws||0))}window.addEventListener("storage",S);S();
