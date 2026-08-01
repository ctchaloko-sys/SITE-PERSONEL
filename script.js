// 1. Importation des fonctions Anime.js v4
import { 
  animate, 
  createTimeline, 
  stagger, 
  createDrawable, 
  onScroll 
} from 'https://cdn.jsdelivr.net/npm/animejs@4.0.0-beta.90/dist/anime.js';

// =============================================================
// ANIMATION 1 : Horloge / Ticker (Timeline synchronisée)
// =============================================================
createTimeline({ loop: true })
  .add('.tick', {
    y: '-=6',
    duration: 50,
    delay: stagger(10)
  })
  .add('.ticker', {
    rotate: 360,
    duration: 1920,
    ease: 'linear'
  }, '<');

// =============================================================
// ANIMATION 2 : Grille de points avec double Stagger 2D
// =============================================================
const optionsGrille = {
  grid: [13, 13], // Grille de 13x13 éléments
  from: 'center'  // Animation initiée depuis le centre
};

createTimeline({ loop: true, alternate: true })
  .add('.dot', {
    scale: stagger([1.5, 0.5], optionsGrille),
    ease: 'inOutQuad'
  }, stagger(200, optionsGrille));

// =============================================================
// ANIMATION 3 : Tracé SVG réactif au défilement (Scroll)
// =============================================================
animate(createDrawable('path'), {
  draw: ['0 0', '0 1', '1 1'],
  delay: stagger(40),
  ease: 'inOut(3)',
  autoplay: onScroll({ sync: true })
});

// =============================================================
// ANIMATION 4 : Carré en rotation (Loader continu)
// =============================================================
animate('.square', {
  rotate: 90,
  loop: true,
  ease: 'inOutExpo',
  duration: 800
});