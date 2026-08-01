// =============================================================
// script.js — Hommage S.M. GBINLO
// Fond animé (Three.js), mode sombre, animations d'entrée du
// texte, et chronogramme fonctionnel.
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

function toggleDarkMode() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('smg-theme', isDark ? 'dark' : 'light');
  updateThemeUI(isDark);
}
// Exposé globalement car appelé via onclick="toggleDarkMode()" dans index.html
window.toggleDarkMode = toggleDarkMode;

(function initTheme() {
  const saved = localStorage.getItem('smg-theme');
  const html = document.documentElement;
  if (saved === 'light') {
    html.classList.remove('dark');
  } else if (saved === 'dark') {
    html.classList.add('dark');
  }
  // Si rien n'est enregistré, on respecte la classe déjà présente dans le HTML (dark par défaut)
  updateThemeUI(html.classList.contains('dark'));
})();

// =============================================================
// 2. FOND 3D ANIMÉ (particules dorées, façon lueur de bougie)
// =============================================================
(function initBackground3D() {
  const container = document.getElementById('canvas3d-container');
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 60;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  container.appendChild(renderer.domElement);

  // Particules dorées, comme des lueurs de bougie flottant doucement
  const COUNT = 220;
  const positions = new Float32Array(COUNT * 3);
  const speeds = new Float32Array(COUNT);

  for (let i = 0; i < COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 160;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 90;
    speeds[i] = 0.03 + Math.random() * 0.06;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xd9a53a,
    size: 0.75,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Second voile de particules plus fines, plus lentes, en arrière-plan
  const farGeometry = new THREE.BufferGeometry();
  const FAR_COUNT = 140;
  const farPositions = new Float32Array(FAR_COUNT * 3);
  for (let i = 0; i < FAR_COUNT; i++) {
    farPositions[i * 3] = (Math.random() - 0.5) * 220;
    farPositions[i * 3 + 1] = (Math.random() - 0.5) * 160;
    farPositions[i * 3 + 2] = -60 - Math.random() * 80;
  }
  farGeometry.setAttribute('position', new THREE.BufferAttribute(farPositions, 3));
  const farMaterial = new THREE.PointsMaterial({
    color: 0xf3d98a,
    size: 0.4,
    transparent: true,
    opacity: 0.25,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const farParticles = new THREE.Points(farGeometry, farMaterial);
  scene.add(farParticles);

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
  });

  const clock = new THREE.Clock();
  const riseSpeed = prefersReducedMotion ? 0 : 1;

  function renderFrame() {
    requestAnimationFrame(renderFrame);
    const t = clock.getElapsedTime();

    if (riseSpeed) {
      const pos = geometry.attributes.position.array;
      for (let i = 0; i < COUNT; i++) {
        pos[i * 3 + 1] += speeds[i] * 0.06;
        if (pos[i * 3 + 1] > 65) pos[i * 3 + 1] = -65;
      }
      geometry.attributes.position.needsUpdate = true;

      particles.rotation.y = t * 0.012 + mouseX * 0.25;
      particles.rotation.x = mouseY * 0.12;
      farParticles.rotation.y = -t * 0.006;
    }

    renderer.render(scene, camera);
  }
  renderFrame();
})();

// =============================================================
// 3. ANIMATIONS D'ENTRÉE DU TEXTE (en-tête + chronogramme)
// =============================================================
if (!prefersReducedMotion) {
  // En-tête : ANNONCE DE DEUILS... / Nom / citation Jean 14,1-2
  animate('header .relative.z-10.text-center > *', {
    opacity: [0, 1],
    translateY: [26, 0],
    duration: 950,
    delay: stagger(200, { start: 150 }),
    ease: 'outExpo'
  });

  // Titre "CHRONOGRAMME — Le Programme Officiel"
  animate('#programme > div > div:first-child > *', {
    opacity: [0, 1],
    translateY: [18, 0],
    duration: 800,
    delay: stagger(160, { start: 100 }),
    ease: 'outExpo'
  });

  // Cartes du programme (Jeudi / Vendredi / Samedi) en fondu progressif
  animate('#programme .grid.grid-cols-1.md\\:grid-cols-3 > div', {
    opacity: [0, 1],
    translateY: [24, 0],
    duration: 800,
    delay: stagger(160, { start: 200 }),
    ease: 'outExpo'
  });
} else {
  // Respect du mode "mouvement réduit" : contenu visible immédiatement
  document.querySelectorAll(
    'header .relative.z-10.text-center > *, #programme > div > div:first-child > *, #programme .grid.grid-cols-1.md\\:grid-cols-3 > div'
  ).forEach((el) => {
    el.style.opacity = '1';
  });
}

// =============================================================
// 4. CHRONOGRAMME — COMPTE À REBOURS RÉEL
// Cible : jeudi 27 août 2026, 20h00, heure de Cotonou (UTC+1)
// =============================================================
(function initCountdown() {
  const target = new Date('2026-08-27T20:00:00+01:00').getTime();

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