// =============================================================
// script.js — Hommage S.M. GBINLO
// Fond animé (champ d'étoiles Three.js), mode sombre, animations
// d'entrée du texte, et chronogramme fonctionnel (samedi 29 août).
// =============================================================

import {
  animate,
  stagger
} from 'https://cdn.jsdelivr.net/npm/animejs@4.0.0-beta.90/dist/anime.js';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// =============================================================
// 1. MODE SOMBRE / CLAIR
// =============================================================
function updateThemeUI(isDark) {
  const icon = document.getElementById('themeIcon');
  const text = document.getElementById('themeText');
  if (icon) icon.textContent = isDark ? '🌙' : '☀️';
  if (text) text.textContent = isDark ? 'Mode Sombre' : 'Mode Clair';
}

function setDarkMode(isDark) {
  const html = document.documentElement;
  html.classList.toggle('dark', isDark);
  try {
    localStorage.setItem('smg-theme', isDark ? 'dark' : 'light');
  } catch (e) {
    // stockage indisponible (navigation privée, etc.) — pas bloquant
  }
  updateThemeUI(isDark);
}

function toggleDarkMode() {
  const isCurrentlyDark = document.documentElement.classList.contains('dark');
  setDarkMode(!isCurrentlyDark);
}
// Exposé globalement car appelé via onclick="toggleDarkMode()" dans index.html
window.toggleDarkMode = toggleDarkMode;

(function initTheme() {
  let saved = null;
  try {
    saved = localStorage.getItem('smg-theme');
  } catch (e) {
    saved = null;
  }
  const html = document.documentElement;
  if (saved === 'light') {
    html.classList.remove('dark');
  } else if (saved === 'dark') {
    html.classList.add('dark');
  }
  // Si rien n'est enregistré, on respecte la classe déjà présente dans le HTML
  updateThemeUI(html.classList.contains('dark'));

  // Sécurité : si le bouton existe mais que l'attribut onclick n'a pas
  // été correctement lié (ex. cache navigateur), on rattache l'événement.
  const btn = document.getElementById('themeBtn');
  if (btn) {
    btn.addEventListener('click', toggleDarkMode);
  }
})();

// =============================================================
// 2. FOND ANIMÉ — CHAMP D'ÉTOILES QUI SCINTILLENT ET DÉRIVENT
// =============================================================
(function initStarfield() {
  const container = document.getElementById('canvas3d-container');
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  );
  camera.position.z = 100;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  container.appendChild(renderer.domElement);

  // --- Shader d'étoiles avec scintillement individuel ---
  const starVertexShader = `
    attribute float aSize;
    attribute float aPhase;
    attribute float aSpeed;
    varying float vTwinkle;
    uniform float uTime;
    uniform float uPixelRatio;
    void main() {
      vTwinkle = 0.35 + 0.65 * (0.5 + 0.5 * sin(uTime * aSpeed + aPhase));
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = aSize * uPixelRatio * (200.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const starFragmentShader = `
    varying float vTwinkle;
    uniform vec3 uColor;
    void main() {
      vec2 uv = gl_PointCoord - vec2(0.5);
      float d = length(uv);
      float alpha = smoothstep(0.5, 0.0, d) * vTwinkle;
      if (alpha < 0.02) discard;
      gl_FragColor = vec4(uColor, alpha);
    }
  `;

  function makeStarLayer(count, spread, depthRange, size, color, opacityScale) {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.6;
      positions[i * 3 + 2] = -Math.random() * depthRange;
      sizes[i] = size * (0.5 + Math.random());
      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.4 + Math.random() * 1.1;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
    geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
        uColor: { value: new THREE.Color(color) }
      },
      vertexShader: starVertexShader,
      fragmentShader: starFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    return { points: new THREE.Points(geometry, material), material, count, spread, depthRange };
  }

  // Trois couches : étoiles lointaines (petites, nombreuses), moyennes, proches (dorées, rares)
  const farLayer = makeStarLayer(700, 900, 700, 1.1, 0xffffff, 1);
  const midLayer = makeStarLayer(320, 700, 500, 1.6, 0xf5eedd, 1);
  const nearLayer = makeStarLayer(90, 500, 300, 2.4, 0xe6c866, 1);

  scene.add(farLayer.points);
  scene.add(midLayer.points);
  scene.add(nearLayer.points);

  const layers = [farLayer, midLayer, nearLayer];

  let mouseX = 0;
  let mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth - 0.5;
    mouseY = e.clientY / window.innerHeight - 0.5;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    layers.forEach((l) => {
      l.material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio || 1, 2);
    });
  });

  const clock = new THREE.Clock();
  const driftEnabled = !prefersReducedMotion;

  function renderFrame() {
    requestAnimationFrame(renderFrame);
    const t = clock.getElapsedTime();

    layers.forEach((l, i) => {
      l.material.uniforms.uTime.value = t;
      if (driftEnabled) {
        // Dérive lente et continue, façon défilement du ciel étoilé
        l.points.rotation.y = t * (0.006 + i * 0.003) + mouseX * (0.08 + i * 0.05);
        l.points.rotation.x = mouseY * (0.05 + i * 0.03);
        l.points.position.x = Math.sin(t * 0.02 + i) * 4;
      }
    });

    renderer.render(scene, camera);
  }
  renderFrame();
})();

// =============================================================
// 3. ANIMATIONS D'ENTRÉE DU TEXTE (en-tête + chronogramme)
// =============================================================
if (!prefersReducedMotion) {
  animate('header .relative.z-10.text-center > *', {
    opacity: [0, 1],
    translateY: [26, 0],
    duration: 950,
    delay: stagger(200, { start: 150 }),
    ease: 'outExpo'
  });

  animate('#programme > div > div:first-child > *', {
    opacity: [0, 1],
    translateY: [18, 0],
    duration: 800,
    delay: stagger(160, { start: 100 }),
    ease: 'outExpo'
  });

  animate('#programme .grid.grid-cols-1.md\\:grid-cols-3 > div', {
    opacity: [0, 1],
    translateY: [24, 0],
    duration: 800,
    delay: stagger(160, { start: 200 }),
    ease: 'outExpo'
  });
} else {
  document.querySelectorAll(
    'header .relative.z-10.text-center > *, #programme > div > div:first-child > *, #programme .grid.grid-cols-1.md\\:grid-cols-3 > div'
  ).forEach((el) => {
    el.style.opacity = '1';
  });
}

// =============================================================
// 4. CHRONOGRAMME — COMPTE À REBOURS RÉEL
// Cible : samedi 29 août 2026, 11h00 — messe à l'église
// Bon Pasteur d'Adandokpodji, Abomey (heure de Cotonou, UTC+1)
// =============================================================
(function initCountdown() {
  const target = new Date('2026-08-29T11:00:00+01:00').getTime();

  const elDays = document.getElementById('days');
  const elHours = document.getElementById('hours');
  const elMinutes = document.getElementById('minutes');
  const elSeconds = document.getElementById('seconds');
  if (!elDays || !elHours || !elMinutes || !elSeconds) return;

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  let timer;

  function tick() {
    const diff = target - Date.now();

    if (diff <= 0) {
      elDays.textContent = '00';
      elHours.textContent = '00';
      elMinutes.textContent = '00';
      elSeconds.textContent = '00';
      clearInterval(timer);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    elDays.textContent = pad(days);
    elHours.textContent = pad(hours);
    elMinutes.textContent = pad(minutes);
    elSeconds.textContent = pad(seconds);
  }

  tick();
  timer = setInterval(tick, 1000);
})();