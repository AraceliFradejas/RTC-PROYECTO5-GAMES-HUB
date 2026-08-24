# Games Hub

Games Hub es mi proyecto final del módulo **Web Design Advanced** de ThePower. La propuesta consiste en reunir tres juegos hechos con JavaScript vanilla en una sola página: tres en raya, memoria visual y piedra, papel o tijera.

Quise darles una estética tranquila y colorida, alejada de la apariencia habitual de una web arcade. El reto principal ha sido controlar el estado de cada partida, actualizar el DOM sin recargar la página y conservar las puntuaciones entre sesiones.

## Demo

[Ver Games Hub en Vercel](https://rtc-proyecto-5-games-hub.vercel.app/)

## Juegos

- **Tres en raya:** partida local para dos jugadores. Guarda las victorias de X, las victorias de O y los empates.
- **Memoria visual:** tablero de 16 cartas. Guarda como récord la partida completada con menos intentos.
- **Piedra, papel o tijera:** partidas contra una elección aleatoria del navegador. Guarda victorias, derrotas y empates.

El panel situado al principio de la página muestra un resumen de la actividad y se actualiza mientras se juega. Las puntuaciones se almacenan en `localStorage`, por lo que siguen disponibles después de recargar.

## Decisiones del proyecto

- Separé cada juego en su propio módulo para que cada uno gestione su estado y sus eventos.
- Centralicé la lectura y escritura de puntuaciones en `storage.js`.
- Utilicé CSS Grid para los tableros y para adaptar la distribución a escritorio, tablet y móvil.
- Añadí una versión en inglés para practicar el renderizado dinámico de contenido.
- El juego de memoria bloquea el tablero mientras compara una pareja para evitar pulsaciones que alteren el turno.

## Tecnologías

- Vite
- JavaScript vanilla con ES Modules
- HTML generado dinámicamente desde JavaScript
- CSS, Flexbox y CSS Grid
- Local Storage

## Estructura real

```text
.
├── index.html
├── package.json
├── package-lock.json
└── src
    ├── data.js
    ├── games
    │   ├── memory.js
    │   ├── rps.js
    │   └── ticTacToe.js
    ├── main.js
    ├── storage.js
    └── style.css
```

## Ejecutar el proyecto

```bash
git clone https://github.com/AraceliFradejas/RTC-PROYECTO5-GAMES-HUB.git
cd RTC-PROYECTO5-GAMES-HUB
npm install
npm run dev
```

Para comprobar la versión de producción:

```bash
npm run build
npm run preview
```

## Comprobaciones realizadas

- Victorias horizontales, verticales y diagonales en tres en raya.
- Empate, bloqueo del tablero terminado y reinicio de una partida.
- Bloqueo de cartas durante la comparación en memoria.
- Reinicio de memoria aunque haya una comparación pendiente.
- Actualización y borrado de las puntuaciones.
- Conservación de las puntuaciones después de recargar.
- Cambio de idioma sin perder los resultados guardados.
- Distribución responsive en móvil, tablet y escritorio.
- Navegación con teclado y mensajes de resultado anunciados mediante `aria-live`.

## Autora

**Araceli Fradejas Muñoz**

- [GitHub](https://github.com/AraceliFradejas)
- [LinkedIn](https://www.linkedin.com/in/araceli-fradejas-munoz-transformaciondigital/)
