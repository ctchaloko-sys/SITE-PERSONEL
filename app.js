--- public/app.js (原始)


+++ public/app.js (修改后)
// ===== DONNÉES =====
const typesActes = [
  { id: '1', libelle: 'Certificat de Scolarité', description: "Document attestant votre inscription pour l'année académique en cours.", frais: 2000, delai: 3, icon: '🎓' },
  { id: '2', libelle: 'Relevé de Notes', description: "Document officiel de vos résultats pour une session ou année donnée.", frais: 3000, delai: 5, icon: '📋' },
  { id: '3', libelle: 'Attestation de Réussite', description: "Certificat attestant la réussite à un examen ou diplôme.", frais: 5000, delai: 7, icon: '🏆' },
  { id: '4', libelle: 'Duplicata de Diplôme', description: "Copie conforme de votre diplôme original en cas de perte.", frais: 15000, delai: 15, icon: '📜' },
  { id: '5', libelle: 'Attestation de Fréquentation', description: "Document prouvant votre présence dans l'établissement.", frais: 2500, delai: 4, icon: '📝' },
  { id: '6', libelle: 'Transcript Académique', description: "Relevé complet de votre parcours pour une demande à l'étranger.", frais: 10000, delai: 10, icon: '🌍' }
];

const statuts = [
  { id: '1', code: 'PENDING', libelle: 'En attente', badge: 'badge-pending', icon: 'fa-clock' },
  { id: '2', code: 'PROCESSING', libelle: 'En traitement', badge: 'badge-processing', icon: 'fa-spinner fa-spin' },
  { id: '3', code: 'VALIDATED', libelle: 'Validé', badge: 'badge-validated', icon: 'fa-check-circle' },
  { id: '4', code: 'REJECTED', libelle: 'Rejeté', badge: 'badge-rejected', icon: 'fa-times-circle' },
  { id: '5', code: 'READY', libelle: 'Prêt - Disponible', badge: 'badge-ready', icon: 'fa-file-circle-check' }
];

let demandes = [
  {
    id: '1', code_suivi: 'PARAKOU-2026-A1B2', etudiant_id: '1', type_acte_id: '1', statut_id: '5',
    annee_academique: '2025-2026', commentaires: 'Demande urgente pour stage',
    created_at: '2026-01-15T09:30:00', updated_at: '2026-01-18T14:00:00',
    pieces: [{ nom: 'carte_etudiant.pdf', date: '2026-01-15' }, { nom: 'lettre_motivation.pdf', date: '2026-01-15' }],
    timeline: [
      { statut: 'Soumise', date: '15 Jan 2026, 09:30', commentaire: 'Demande reçue avec succès' },
      { statut: 'En vérification', date: '16 Jan 2026, 10:15', commentaire: 'Pièces conformes' },
      { statut: 'Validée', date: '17 Jan 2026, 08:45', commentaire: 'Approuvée par la scolarité' },
      { statut: 'Signée', date: '18 Jan 2026, 11:00', commentaire: 'Signée par le Décanat' },
      { statut: 'Disponible', date: '18 Jan 2026, 14:00', commentaire: 'Document prêt au téléchargement' }
    ]
  },
  {
    id: '2', code_suivi: 'PARAKOU-2026-C3D4', etudiant_id: '1', type_acte_id: '2', statut_id: '2',
    annee_academique: '2025-2026', commentaires: 'Relevé de notes S1',
    created_at: '2026-01-20T14:00:00', updated_at: '2026-01-21T09:00:00',
    pieces: [{ nom: 'piece_identite.pdf', date: '2026-01-20' }],
    timeline: [
      { statut: 'Soumise', date: '20 Jan 2026, 14:00', commentaire: 'Demande reçue avec succès' },
      { statut: 'En vérification', date: '21 Jan 2026, 09:00', commentaire: 'Vérification des pièces en cours' }
    ]
  },
  {
    id: '3', code_suivi: 'PARAKOU-2026-E5F6', etudiant_id: '1', type_acte_id: '3', statut_id: '1',
    annee_academique: '2024-2025', commentaires: 'Attestation de réussite Licence',
    created_at: '2026-01-22T11:30:00', updated_at: '2026-01-22T11:30:00',
    pieces: [{ nom: 'releve_L3.pdf', date: '2026-01-22' }],
    timeline: [
      { statut: 'Soumise', date: '22 Jan 2026, 11:30', commentaire: 'Demande reçue, en attente de traitement' }
    ]
  },
  {
    id: '4', code_suivi: 'PARAKOU-2026-G7H8', etudiant_id: '2', type_acte_id: '1', statut_id: '1',
    annee_academique: '2025-2026', commentaires: '',
    created_at: '2026-01-23T08:00:00', updated_at: '2026-01-23T08:00:00',
    pieces: [{ nom: 'carte.pdf', date: '2026-01-23' }],
    timeline: [{ statut: 'Soumise', date: '23 Jan 2026, 08:00', commentaire: 'Nouvelle demande' }]
  },
  {
    id: '5', code_suivi: 'PARAKOU-2026-I9J0', etudiant_id: '3', type_acte_id: '4', statut_id: '3',
    annee_academique: '2023-2024', commentaires: 'Duplicata suite perte',
    created_at: '2026-01-10T16:00:00', updated_at: '2026-01-19T10:00:00',
    pieces: [{ nom: 'declaration_perte.pdf', date: '2026-01-10' }],
    timeline: [
      { statut: 'Soumise', date: '10 Jan 2026, 16:00', commentaire: 'Demande reçue' },
      { statut: 'En vérification', date: '12 Jan 2026, 09:00', commentaire: 'Pièces vérifiées' },
      { statut: 'Validée', date: '19 Jan 2026, 10:00', commentaire: 'En attente de signature' }
    ]
  }
];

// ===== ÉTAT GLOBAL =====
let state = {
  currentPage: 'home',
  user: null,
  isAdmin: false,
  newRequest: { type: '', annee: '2025-2026', motif: '', commentaires: '', files: [] },
  newRequestStep: 1,
  selectedDemandeId: null
};

// ===== ARRIÈRE-PLAN ANIMÉ =====
function initBackground() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;
  let time = 0;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.6;
      this.speedY = (Math.random() - 0.5) * 0.6;
      this.hue = 210 + Math.random() * 50;
      this.opacity = Math.random() * 0.4 + 0.15;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, ${this.opacity})`;
      ctx.fill();
    }
  }

  function init() {
    particles = [];
    const count = Math.min(70, Math.floor((canvas.width * canvas.height) / 18000));
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }

  function animate() {
    time++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gradient background
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(0.5, '#1a1f3a');
    grad.addColorStop(1, '#0f172a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Floating orbs
    for (let i = 0; i < 3; i++) {
      const x = canvas.width * (0.2 + 0.3 * i) + Math.sin(time * 0.004 + i * 2) * 120;
      const y = canvas.height * 0.4 + Math.cos(time * 0.003 + i * 1.5) * 80;
      const r = 90 + Math.sin(time * 0.008 + i) * 25;
      const orbGrad = ctx.createRadialGradient(x, y, 0, x, y, r);
      orbGrad.addColorStop(0, 'rgba(99, 102, 241, 0.07)');
      orbGrad.addColorStop(1, 'rgba(99, 102, 241, 0)');
      ctx.fillStyle = orbGrad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Waves
    for (let w = 0; w < 3; w++) {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      const baseY = canvas.height * (0.78 + w * 0.06);
      for (let x = 0; x <= canvas.width; x += 4) {
        const y = baseY + Math.sin(x / 220 + time * 0.012 + w) * (35 - w * 5);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fillStyle = `rgba(59, 130, 246, ${0.04 - w * 0.01})`;
      ctx.fill();
    }

    // Particles + connections
    particles.forEach((p, i) => {
      p.update();
      p.draw();
      for (let j = i + 1; j < particles.length; j++) {
        const dx = p.x - particles[j].x;
        const dy = p.y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.08 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    });

    animId = requestAnimationFrame(animate);
  }

  resize();
  init();
  animate();
  window.addEventListener('resize', () => { resize(); init(); });
}

// ===== TOAST =====
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle' };
  toast.innerHTML = `<i class="fas ${icons[type]}"></i><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(100%)'; setTimeout(() => toast.remove(), 300); }, 3500);
}

// ===== NAVIGATION =====
function navigate(page, data) {
  state.currentPage = page;
  if (data) Object.assign(state, data);
  render();
  window.scrollTo(0, 0);
  closeMobileMenu();
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('menu-icon');
  menu.classList.toggle('hidden');
  icon.className = menu.classList.contains('hidden') ? 'fas fa-bars' : 'fas fa-times';
}

function closeMobileMenu() {
  document.getElementById('mobile-menu').classList.add('hidden');
  document.getElementById('menu-icon').className = 'fas fa-bars';
}

// ===== HELPERS =====
function getStatut(id) { return statuts.find(s => s.id === id) || statuts[0]; }
function getTypeActe(id) { return typesActes.find(t => t.id === id); }
function formatDate(iso) { return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }); }
function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' Ko';
  return (bytes / (1024 * 1024)).toFixed(1) + ' Mo';
}
function generateCode() {
  return 'PARAKOU-2026-' + Math.random().toString(36).substring(2, 6).toUpperCase();
}
function getNow() {
  const d = new Date();
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

// ===== RENDER NAVBAR =====
function renderNav() {
  const navLinks = document.getElementById('nav-links');
  const navRight = document.getElementById('nav-right');
  const mobileMenu = document.getElementById('mobile-menu');

  let links = `
    <a class="nav-link ${state.currentPage === 'home' ? 'active' : ''}" onclick="navigate('home')">Accueil</a>
    <a class="nav-link ${state.currentPage === 'tracking' ? 'active' : ''}" onclick="navigate('tracking')">Suivi</a>
    <a class="nav-link ${state.currentPage === 'faq' ? 'active' : ''}" onclick="navigate('faq')">Aide / FAQ</a>
  `;

  if (state.user && !state.isAdmin) {
    links += `
      <a class="nav-link ${state.currentPage === 'dashboard' ? 'active' : ''}" onclick="navigate('dashboard')">Mon Espace</a>
      <a class="nav-link btn-primary-nav" onclick="navigate('new-request')">+ Nouvelle Demande</a>
    `;
  }

  if (state.isAdmin) {
    links += `<a class="nav-link ${state.currentPage === 'admin' ? 'active' : ''}" onclick="navigate('admin')">Administration</a>`;
  }

  navLinks.innerHTML = links;

  let right = '';
  if (state.user && !state.isAdmin) {
    right = `
      <div class="nav-badge"><i class="fas fa-user"></i> ${state.user.matricule}</div>
      <button class="btn-logout" onclick="logout()" title="Déconnexion"><i class="fas fa-sign-out-alt"></i></button>
    `;
  } else if (state.isAdmin) {
    right = `
      <div class="nav-badge admin"><i class="fas fa-shield-alt"></i> Admin</div>
      <button class="btn-logout" onclick="logout()" title="Déconnexion"><i class="fas fa-sign-out-alt"></i></button>
    `;
  } else {
    right = `
      <a class="nav-link" onclick="navigate('login')">Connexion Étudiant</a>
      <a class="nav-link" onclick="navigate('admin-login')" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.1);">Espace Admin</a>
    `;
  }
  navRight.innerHTML = right;

  // Mobile menu
  let mobile = `
    <a onclick="navigate('home')">Accueil</a>
    <a onclick="navigate('tracking')">Suivi</a>
    <a onclick="navigate('faq')">Aide / FAQ</a>
  `;
  if (state.user && !state.isAdmin) {
    mobile += `<a onclick="navigate('dashboard')">Mon Espace</a><a onclick="navigate('new-request')" style="color:#60a5fa">+ Nouvelle Demande</a>`;
  }
  if (state.isAdmin) mobile += `<a onclick="navigate('admin')">Administration</a>`;
  if (!state.user && !state.isAdmin) {
    mobile += `<a onclick="navigate('login')">Connexion Étudiant</a><a onclick="navigate('admin-login')">Espace Admin</a>`;
  }
  if (state.user || state.isAdmin) mobile += `<button onclick="logout()" style="color:#f87171">Déconnexion</button>`;
  mobileMenu.innerHTML = mobile;
}

// ===== PAGES =====
function renderHome() {
  return `
    <section class="hero">
      <div>
        <div class="hero-badge"><i class="fas fa-bolt"></i> Plateforme numérique de l'Université</div>
        <h1>Vos actes académiques<br><span class="gradient-text">en un clic</span></h1>
        <p>Soumettez vos demandes d'actes académiques, suivez leur traitement en temps réel et téléchargez vos documents signés — sans vous déplacer.</p>
        <div class="hero-buttons">
          <button class="btn btn-primary btn-lg" onclick="navigate('login')">Commencer une demande <i class="fas fa-arrow-right"></i></button>
          <button class="btn btn-outline btn-lg" onclick="navigate('tracking')">Suivre un dossier</button>
        </div>
        <div class="stats-grid">
          <div class="stat-card"><div class="stat-value">2,500+</div><div class="stat-label">Étudiants actifs</div></div>
          <div class="stat-card"><div class="stat-value">15,000+</div><div class="stat-label">Demandes traitées</div></div>
          <div class="stat-card"><div class="stat-value">&lt; 48h</div><div class="stat-label">Délai moyen</div></div>
          <div class="stat-card"><div class="stat-value">99.9%</div><div class="stat-label">Disponibilité</div></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2 class="section-title">Pourquoi choisir UniActes ?</h2>
        <p class="section-subtitle">Une plateforme moderne conçue pour simplifier vos démarches administratives</p>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon" style="background:linear-gradient(135deg,#3b82f6,#06b6d4)"><i class="fas fa-clock"></i></div>
            <h3>Gain de temps</h3>
            <p>Plus besoin de vous déplacer. Soumettez et suivez vos demandes 24h/24, 7j/7 depuis n'importe où.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon" style="background:linear-gradient(135deg,#6366f1,#a855f7)"><i class="fas fa-shield-alt"></i></div>
            <h3>Sécurité renforcée</h3>
            <p>Vos données sont protégées par un chiffrement de bout en bout. Documents signés avec QR code de vérification.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon" style="background:linear-gradient(135deg,#a855f7,#ec4899)"><i class="fas fa-file-circle-check"></i></div>
            <h3>Suivi en temps réel</h3>
            <p>Consultez l'état d'avancement de votre dossier à tout moment grâce à votre code de suivi unique.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2 class="section-title">Types d'actes disponibles</h2>
        <p class="section-subtitle">Tous les documents académiques dont vous avez besoin</p>
        <div class="actes-grid">
          ${typesActes.map(a => `
            <div class="acte-card">
              <div class="acte-icon">${a.icon}</div>
              <h3>${a.libelle}</h3>
              <p>${a.description}</p>
              <div class="acte-meta"><span class="delai">~${a.delai} jours</span><span class="prix">${a.frais.toLocaleString()} FCFA</span></div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2 class="section-title">Comment ça marche ?</h2>
        <div class="steps-grid">
          <div class="step-item"><div class="step-circle"><i class="fas fa-user"></i></div><div class="step-label">ÉTAPE 01</div><h3>Inscription</h3><p>Connectez-vous avec votre matricule</p></div>
          <div class="step-item"><div class="step-circle"><i class="fas fa-file-alt"></i></div><div class="step-label">ÉTAPE 02</div><h3>Soumission</h3><p>Remplissez le formulaire et joignez vos pièces PDF</p></div>
          <div class="step-item"><div class="step-circle"><i class="fas fa-chart-line"></i></div><div class="step-label">ÉTAPE 03</div><h3>Suivi</h3><p>Suivez l'évolution en temps réel</p></div>
          <div class="step-item"><div class="step-circle"><i class="fas fa-download"></i></div><div class="step-label">ÉTAPE 04</div><h3>Réception</h3><p>Téléchargez votre document signé</p></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="cta-section">
          <h2>Prêt à simplifier vos démarches ?</h2>
          <p>Rejoignez les milliers d'étudiants qui utilisent déjà UniActes</p>
          <button class="btn btn-primary btn-lg" onclick="navigate('login')">Se connecter maintenant <i class="fas fa-arrow-right"></i></button>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="flex items-center gap-1 mb-2">
              <div class="logo-icon" style="width:32px;height:32px;font-size:0.9rem"><i class="fas fa-graduation-cap"></i></div>
              <span style="font-size:1.1rem;font-weight:700;color:white">UniActes</span>
            </div>
            <p>Portail numérique de gestion des actes académiques de l'Université.</p>
          </div>
          <div><h4>Liens rapides</h4><a onclick="navigate('home')" style="cursor:pointer">Accueil</a><a onclick="navigate('tracking')" style="cursor:pointer">Suivi de dossier</a><a onclick="navigate('faq')" style="cursor:pointer">Aide & FAQ</a></div>
          <div><h4>Accès</h4><a onclick="navigate('login')" style="cursor:pointer">Espace Étudiant</a><a onclick="navigate('admin-login')" style="cursor:pointer">Espace Administration</a></div>
          <div><h4>Contact</h4><p>📧 scolarite@univ-parakou.bj</p><p>📞 +229 XX XX XX XX</p><p>📍 Université de Parakou, Bénin</p></div>
        </div>
        <div class="footer-bottom">© 2026 UniActes — Tous droits réservés</div>
      </div>
    </footer>
  `;
}

function renderTracking() {
  return `
    <div class="tracking-page">
      <h1>Suivi de votre demande</h1>
      <p class="subtitle">Entrez votre code de suivi unique pour consulter l'état d'avancement de votre dossier</p>
      <div class="search-box">
        <div class="search-row" style="position:relative">
          <div style="position:relative;flex:1">
            <i class="fas fa-search search-icon"></i>
            <input type="text" id="tracking-input" class="form-input" placeholder="Ex: PARAKOU-2026-A1B2" style="padding-left:3rem;font-size:1.05rem" onkeydown="if(event.key==='Enter')searchTracking()">
          </div>
          <button class="btn btn-primary" onclick="searchTracking()">Rechercher</button>
        </div>
        <div class="search-hint">💡 Essayez : <button onclick="document.getElementById('tracking-input').value='PARAKOU-2026-A1B2'">PARAKOU-2026-A1B2</button> ou <button onclick="document.getElementById('tracking-input').value='PARAKOU-2026-C3D4'">PARAKOU-2026-C3D4</button></div>
      </div>
      <div id="tracking-result"></div>
    </div>
  `;
}

function searchTracking() {
  const code = document.getElementById('tracking-input').value.trim();
  const result = document.getElementById('tracking-result');
  const found = demandes.find(d => d.code_suivi.toLowerCase() === code.toLowerCase());

  if (!found) {
    result.innerHTML = `<div class="alert alert-error" style="justify-content:center;flex-direction:column;text-align:center"><i class="fas fa-times-circle" style="font-size:2rem;margin-bottom:0.5rem"></i>Aucun dossier trouvé avec ce code de suivi.</div>`;
    return;
  }

  const statut = getStatut(found.statut_id);
  const type = getTypeActe(found.type_acte_id);

  result.innerHTML = `
    <div class="glass-card" style="padding:1.5rem;margin-bottom:1.5rem">
      <div class="flex justify-between items-center flex-wrap gap-2 mb-3">
        <div><div style="font-size:0.8rem;color:#64748b">Code de suivi</div><div style="font-size:1.2rem;font-weight:700;color:white;font-family:monospace">${found.code_suivi}</div></div>
        <span class="badge ${statut.badge}"><i class="fas ${statut.icon}"></i> ${statut.libelle}</span>
      </div>
      <div class="info-grid">
        <div class="info-box"><div class="label">Type d'acte</div><div class="value">${type.icon} ${type.libelle}</div></div>
        <div class="info-box"><div class="label">Année académique</div><div class="value">${found.annee_academique}</div></div>
        <div class="info-box"><div class="label">Date de soumission</div><div class="value">${formatDate(found.created_at)}</div></div>
        <div class="info-box"><div class="label">Dernière MAJ</div><div class="value">${formatDate(found.updated_at)}</div></div>
      </div>
    </div>
    <div class="glass-card" style="padding:1.5rem">
      <h3 style="font-size:1rem;font-weight:600;color:white;margin-bottom:1.5rem"><i class="fas fa-clock" style="color:#60a5fa;margin-right:0.5rem"></i>Progression du dossier</h3>
      <div class="timeline">
        ${found.timeline.map((step, i) => `
          <div class="timeline-item">
            <div class="timeline-dot ${i === found.timeline.length - 1 ? 'active' : ''}"></div>
            <div class="timeline-title">${step.statut}</div>
            <div class="timeline-desc">${step.commentaire}</div>
            <div class="timeline-date">${step.date}</div>
          </div>
        `).join('')}
      </div>
    </div>
    ${found.statut_id === '5' ? `
      <div class="alert alert-success mt-3" style="flex-direction:column;text-align:center;padding:2rem">
        <i class="fas fa-file-circle-check" style="font-size:2.5rem;margin-bottom:0.75rem"></i>
        <strong style="font-size:1.1rem">Votre document est prêt !</strong>
        <p style="margin-top:0.5rem">Connectez-vous à votre espace pour télécharger le document signé.</p>
        <button class="btn btn-success mt-2" onclick="navigate('login')">Télécharger le document</button>
      </div>
    ` : ''}
  `;
}

function renderFAQ() {
  const faqs = [
    { q: "Comment créer un compte sur la plateforme ?", a: "Utilisez votre numéro de matricule comme identifiant. Le mot de passe initial vous est communiqué par email institutionnel ou par SMS." },
    { q: "Quels documents dois-je fournir pour une demande ?", a: "Les pièces justificatives doivent être au format PDF (max 5 Mo). Généralement : carte d'étudiant, pièce d'identité, et tout document spécifique mentionné dans le formulaire." },
    { q: "Comment suivre l'état de ma demande ?", a: "Via votre espace étudiant connecté, ou via la page de suivi public en saisissant votre code de suivi unique (format: PARAKOU-2026-XXXX)." },
    { q: "Quel est le délai de traitement ?", a: "Certificat (~3 jours), Relevé de notes (~5 jours), Attestation (~7 jours), Duplicata de diplôme (~15 jours)." },
    { q: "Comment récupérer mon document une fois prêt ?", a: "Une fois le statut \"Disponible\", connectez-vous pour télécharger le PDF sécurisé muni d'un QR code de vérification." },
    { q: "Que faire si ma demande est rejetée ?", a: "Vous recevrez un motif de rejet. Vous pouvez corriger les problèmes et soumettre une nouvelle demande." },
    { q: "Les documents sont-ils officiels ?", a: "Oui, tous les documents sont signés numériquement par l'administration avec un QR code unique de vérification." },
    { q: "Comment contacter le service de scolarité ?", a: "Par email à scolarite@univ-parakou.bj, par téléphone au +229 XX XX XX XX, ou via WhatsApp." }
  ];

  return `
    <div style="max-width:800px;margin:0 auto;padding:3rem 1.5rem">
      <div class="text-center mb-4">
        <div style="width:64px;height:64px;border-radius:16px;background:linear-gradient(135deg,#3b82f6,#6366f1);display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem;font-size:1.5rem;color:white;box-shadow:0 8px 25px rgba(59,130,246,0.3)"><i class="fas fa-question-circle"></i></div>
        <h1 class="section-title">Aide & FAQ</h1>
        <p class="section-subtitle">Trouvez rapidement les réponses à vos questions</p>
      </div>
      <div>
        ${faqs.map((faq, i) => `
          <div class="faq-item">
            <button class="faq-question" onclick="toggleFaq(${i})">
              <span>${faq.q}</span>
              <i class="fas fa-chevron-down" id="faq-icon-${i}" style="transition:transform 0.3s;color:#60a5fa"></i>
            </button>
            <div class="faq-answer hidden" id="faq-answer-${i}">${faq.a}</div>
          </div>
        `).join('')}
      </div>
      <div class="glass-card mt-4" style="padding:2rem;text-align:center">
        <h3 style="color:white;font-size:1.2rem;margin-bottom:1.5rem">Besoin d'aide supplémentaire ?</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1rem">
          <div class="glass-card glass-card-hover" style="padding:1.5rem;cursor:pointer"><i class="fas fa-envelope" style="font-size:1.5rem;color:#60a5fa;margin-bottom:0.75rem;display:block"></i><strong style="color:white;display:block;margin-bottom:0.25rem">Email</strong><span style="color:#94a3b8;font-size:0.8rem">scolarite@univ-parakou.bj</span></div>
          <div class="glass-card glass-card-hover" style="padding:1.5rem;cursor:pointer"><i class="fas fa-phone" style="font-size:1.5rem;color:#4ade80;margin-bottom:0.75rem;display:block"></i><strong style="color:white;display:block;margin-bottom:0.25rem">Téléphone</strong><span style="color:#94a3b8;font-size:0.8rem">+229 XX XX XX XX</span></div>
          <div class="glass-card glass-card-hover" style="padding:1.5rem;cursor:pointer"><i class="fab fa-whatsapp" style="font-size:1.5rem;color:#34d399;margin-bottom:0.75rem;display:block"></i><strong style="color:white;display:block;margin-bottom:0.25rem">WhatsApp</strong><span style="color:#94a3b8;font-size:0.8rem">Chat en direct</span></div>
        </div>
      </div>
    </div>
  `;
}

function toggleFaq(i) {
  const answer = document.getElementById(`faq-answer-${i}`);
  const icon = document.getElementById(`faq-icon-${i}`);
  answer.classList.toggle('hidden');
  icon.style.transform = answer.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
}

function renderLogin() {
  return `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-icon blue"><i class="fas fa-graduation-cap"></i></div>
        <h1>Espace Étudiant</h1>
        <p class="subtitle">Connectez-vous avec votre matricule</p>
        <div id="login-error"></div>
        <form onsubmit="handleLogin(event)">
          <div class="form-group">
            <label class="form-label">Numéro de matricule</label>
            <div class="form-input-with-icon">
              <i class="fas fa-user"></i>
              <input type="text" id="login-matricule" class="form-input" placeholder="Ex: 2024ETU001" required>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Mot de passe</label>
            <div class="form-input-with-icon">
              <i class="fas fa-lock"></i>
              <input type="password" id="login-password" class="form-input" placeholder="Votre mot de passe" required>
            </div>
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%;padding:1rem;font-size:1rem" id="login-btn">Se connecter</button>
        </form>
        <div class="demo-info blue">
          <strong style="color:#93c5fd">🔑 Mode Démo</strong>
          <span style="color:#94a3b8">Utilisez n'importe quel matricule (ex: 2024ETU001) et n'importe quel mot de passe.</span>
        </div>
      </div>
    </div>
  `;
}

function handleLogin(e) {
  e.preventDefault();
  const matricule = document.getElementById('login-matricule').value;
  const btn = document.getElementById('login-btn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connexion...';

  setTimeout(() => {
    if (matricule.length > 2) {
      state.user = { id: '1', matricule, nom: 'ADJANI', prenoms: 'Marie Christelle', filiere: 'Informatique', departement: 'Département Mathématiques & Informatique' };
      state.isAdmin = false;
      navigate('dashboard');
      showToast('Connexion réussie ! Bienvenue.', 'success');
    } else {
      document.getElementById('login-error').innerHTML = '<div class="alert alert-error"><i class="fas fa-exclamation-circle"></i> Matricule invalide.</div>';
      btn.disabled = false;
      btn.innerHTML = 'Se connecter';
    }
  }, 800);
}

function renderAdminLogin() {
  return `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-icon green"><i class="fas fa-shield-alt"></i></div>
        <h1>Espace Administration</h1>
        <p class="subtitle">Accès réservé au personnel autorisé</p>
        <div id="admin-login-error"></div>
        <form onsubmit="handleAdminLogin(event)">
          <div class="form-group">
            <label class="form-label">Identifiant</label>
            <div class="form-input-with-icon">
              <i class="fas fa-user-shield"></i>
              <input type="text" id="admin-username" class="form-input" placeholder="admin ou agent" required>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Mot de passe</label>
            <div class="form-input-with-icon">
              <i class="fas fa-lock"></i>
              <input type="password" id="admin-password" class="form-input" placeholder="Mot de passe" required>
            </div>
          </div>
          <button type="submit" class="btn btn-success" style="width:100%;padding:1rem;font-size:1rem" id="admin-login-btn">Accéder au tableau de bord</button>
        </form>
        <div class="demo-info green">
          <strong style="color:#6ee7b7">🔑 Mode Démo</strong>
          <span style="color:#94a3b8">Utilisez "admin" ou "agent" comme identifiant et n'importe quel mot de passe.</span>
        </div>
      </div>
    </div>
  `;
}

function handleAdminLogin(e) {
  e.preventDefault();
  const username = document.getElementById('admin-username').value;
  const btn = document.getElementById('admin-login-btn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connexion...';

  setTimeout(() => {
    if (username === 'admin' || username === 'agent') {
      state.isAdmin = true;
      state.user = null;
      navigate('admin');
      showToast('Connexion admin réussie !', 'success');
    } else {
      document.getElementById('admin-login-error').innerHTML = '<div class="alert alert-error"><i class="fas fa-exclamation-circle"></i> Identifiants incorrects.</div>';
      btn.disabled = false;
      btn.innerHTML = 'Accéder au tableau de bord';
    }
  }, 800);
}

function logout() {
  state.user = null;
  state.isAdmin = false;
  navigate('home');
  showToast('Déconnexion réussie.', 'info');
}

function renderDashboard() {
  if (!state.user) return renderLogin();
  const mesDemandes = demandes.filter(d => d.etudiant_id === state.user.id);
  const pending = mesDemandes.filter(d => d.statut_id === '1').length;
  const processing = mesDemandes.filter(d => d.statut_id === '2').length;
  const ready = mesDemandes.filter(d => d.statut_id === '5').length;

  return `
    <div class="dashboard">
      <div class="dashboard-header">
        <div>
          <h1>Bonjour, ${state.user.prenoms} 👋</h1>
          <p class="subtitle">${state.user.filiere} — ${state.user.departement}</p>
        </div>
        <button class="btn btn-primary" onclick="navigate('new-request')"><i class="fas fa-plus"></i> Nouvelle Demande</button>
      </div>

      <div class="stats-row">
        <div class="stat-box"><div class="stat-box-icon" style="background:rgba(59,130,246,0.1);color:#60a5fa"><i class="fas fa-file-alt"></i></div><div class="stat-box-value">${mesDemandes.length}</div><div class="stat-box-label">Total demandes</div></div>
        <div class="stat-box"><div class="stat-box-icon" style="background:rgba(245,158,11,0.1);color:#fbbf24"><i class="fas fa-clock"></i></div><div class="stat-box-value">${pending}</div><div class="stat-box-label">En attente</div></div>
        <div class="stat-box"><div class="stat-box-icon" style="background:rgba(99,102,241,0.1);color:#818cf8"><i class="fas fa-spinner"></i></div><div class="stat-box-value">${processing}</div><div class="stat-box-label">En traitement</div></div>
        <div class="stat-box"><div class="stat-box-icon" style="background:rgba(16,185,129,0.1);color:#34d399"><i class="fas fa-file-circle-check"></i></div><div class="stat-box-value">${ready}</div><div class="stat-box-label">Disponibles</div></div>
      </div>

      ${ready > 0 ? `<div class="notification-bar"><i class="fas fa-bell"></i> 🎉 Vous avez <strong>${ready} document(s)</strong> prêt(s) au téléchargement !</div>` : ''}

      <div class="demandes-list">
        <div class="demandes-list-header"><i class="fas fa-calendar" style="color:#60a5fa"></i> Mes demandes</div>
        ${mesDemandes.length === 0 ? '<div style="padding:3rem;text-align:center;color:#64748b"><i class="fas fa-file-alt" style="font-size:2rem;margin-bottom:0.75rem;display:block"></i>Aucune demande. <a style="color:#60a5fa;cursor:pointer" onclick="navigate(\'new-request\')">Créer ma première demande</a></div>' : ''}
        ${mesDemandes.map(d => {
          const type = getTypeActe(d.type_acte_id);
          const statut = getStatut(d.statut_id);
          return `
            <div class="demande-item" onclick="viewDemande('${d.id}')">
              <div class="demande-info">
                <div class="demande-title"><span class="icon">${type.icon}</span><h3>${type.libelle}</h3></div>
                <div class="demande-code">${d.code_suivi}</div>
                <div class="demande-meta"><span>Année: ${d.annee_academique}</span><span>•</span><span>Soumis le ${formatDate(d.created_at)}</span><span>•</span><span>${d.pieces.length} pièce(s)</span></div>
              </div>
              <span class="badge ${statut.badge}"><i class="fas ${statut.icon}"></i> ${statut.libelle}</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function viewDemande(id) {
  state.selectedDemandeId = id;
  navigate('demande-detail');
}

function renderDemandeDetail() {
  const d = demandes.find(dem => dem.id === state.selectedDemandeId);
  if (!d) return '<div style="padding:3rem;text-align:center"><h2 style="color:white">Demande non trouvée</h2><button class="btn btn-outline mt-2" onclick="navigate(\'dashboard\')">Retour</button></div>';

  const type = getTypeActe(d.type_acte_id);
  const statut = getStatut(d.statut_id);

  return `
    <div class="dashboard">
      <button class="btn btn-outline btn-sm mb-3" onclick="navigate('dashboard')"><i class="fas fa-arrow-left"></i> Retour</button>
      <div class="glass-card" style="padding:1.5rem;margin-bottom:1.5rem">
        <div class="flex justify-between items-center flex-wrap gap-2 mb-2">
          <div class="flex items-center gap-3">
            <span style="font-size:2.5rem">${type.icon}</span>
            <div><h1 style="font-size:1.3rem;font-weight:700;color:white">${type.libelle}</h1><p style="font-family:monospace;font-size:0.85rem;color:#64748b">${d.code_suivi}</p></div>
          </div>
          <span class="badge ${statut.badge}"><i class="fas ${statut.icon}"></i> ${statut.libelle}</span>
        </div>
        <div class="info-grid mt-2">
          <div class="info-box"><div class="label">Année académique</div><div class="value">${d.annee_academique}</div></div>
          <div class="info-box"><div class="label">Date de soumission</div><div class="value">${formatDate(d.created_at)}</div></div>
          <div class="info-box"><div class="label">Dernière MAJ</div><div class="value">${formatDate(d.updated_at)}</div></div>
          <div class="info-box"><div class="label">Frais</div><div class="value">${type.frais.toLocaleString()} FCFA</div></div>
        </div>
        ${d.commentaires ? `<div class="alert alert-info mt-2"><i class="fas fa-comment"></i> ${d.commentaires}</div>` : ''}
      </div>

      <div style="display:grid;grid-template-columns:2fr 1fr;gap:1.5rem" class="detail-grid">
        <div class="glass-card" style="padding:1.5rem">
          <h3 style="font-size:1rem;font-weight:600;color:white;margin-bottom:1.5rem"><i class="fas fa-clock" style="color:#60a5fa;margin-right:0.5rem"></i>Historique du traitement</h3>
          <div class="timeline">
            ${d.timeline.map((step, i) => `
              <div class="timeline-item">
                <div class="timeline-dot ${i === d.timeline.length - 1 ? 'active' : ''}"></div>
                <div class="timeline-title">${step.statut}</div>
                <div class="timeline-desc">${step.commentaire}</div>
                <div class="timeline-date">${step.date}</div>
              </div>
            `).join('')}
          </div>
        </div>
        <div>
          <div class="glass-card" style="padding:1.5rem;margin-bottom:1rem">
            <h3 style="font-size:0.85rem;font-weight:600;color:white;margin-bottom:0.75rem"><i class="fas fa-file-alt" style="color:#60a5fa;margin-right:0.5rem"></i>Pièces jointes</h3>
            ${d.pieces.map(p => `<div class="file-item"><div class="file-item-icon">PDF</div><div class="file-item-info"><div class="file-item-name">${p.nom}</div><div class="file-item-size">${p.date}</div></div></div>`).join('')}
          </div>
          ${d.statut_id === '5' ? `
            <div class="glass-card" style="padding:1.5rem;background:rgba(16,185,129,0.1);border-color:rgba(16,185,129,0.2);text-align:center">
              <i class="fas fa-download" style="font-size:2rem;color:#34d399;margin-bottom:0.75rem;display:block"></i>
              <h3 style="color:#6ee7b7;font-size:0.95rem;margin-bottom:0.5rem">Document disponible</h3>
              <button class="btn btn-success btn-sm" style="width:100%"><i class="fas fa-download"></i> Télécharger le PDF</button>
              <p style="font-size:0.7rem;color:#64748b;margin-top:0.5rem">📱 QR code de vérification inclus</p>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
    <style>.detail-grid{grid-template-columns:1fr!important}@media(min-width:768px){.detail-grid{grid-template-columns:2fr 1fr!important}}</style>
  `;
}

// ===== NOUVELLE DEMANDE =====
function renderNewRequest() {
  if (!state.user) return renderLogin();
  const step = state.newRequestStep;

  if (state.newRequestSubmitted) {
    return `
      <div class="auth-page">
        <div class="auth-card" style="text-align:center">
          <div style="width:80px;height:80px;border-radius:50%;background:rgba(16,185,129,0.2);display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem"><i class="fas fa-check-circle" style="font-size:2.5rem;color:#34d399"></i></div>
          <h1 style="color:white;margin-bottom:0.75rem">Demande soumise avec succès !</h1>
          <p style="color:#94a3b8;margin-bottom:1.5rem">Conservez précieusement votre code de suivi.</p>
          <div style="padding:1rem;border-radius:12px;background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.2);margin-bottom:1.5rem">
            <div style="font-size:0.8rem;color:#64748b;margin-bottom:0.25rem">Votre code de suivi unique :</div>
            <div style="font-size:1.5rem;font-weight:700;font-family:monospace;color:#93c5fd">${state.newRequestCode}</div>
          </div>
          <div style="padding:1rem;border-radius:12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);text-align:left;margin-bottom:1.5rem">
            <div style="font-size:0.8rem;color:#64748b;margin-bottom:0.5rem">Documents fournis :</div>
            ${state.newRequest.files.map(f => `<div style="display:flex;align-items:center;gap:0.5rem;font-size:0.85rem;color:#cbd5e1;padding:0.25rem 0"><i class="fas fa-file-pdf" style="color:#f87171"></i><span style="flex:1">${f.name}</span><span style="color:#64748b;font-size:0.75rem">${formatSize(f.size)}</span></div>`).join('')}
          </div>
          <button class="btn btn-primary" style="width:100%;margin-bottom:0.75rem" onclick="navigate('dashboard')">Voir mon tableau de bord</button>
          <button class="btn btn-outline" style="width:100%" onclick="navigate('home')">Retour à l'accueil</button>
        </div>
      </div>
    `;
  }

  return `
    <div class="dashboard" style="max-width:750px">
      <button class="btn btn-outline btn-sm mb-3" onclick="navigate('dashboard')"><i class="fas fa-arrow-left"></i> Retour</button>
      <h1 style="font-size:1.75rem;font-weight:700;color:white;margin-bottom:0.5rem">Nouvelle demande</h1>
      <p style="color:#94a3b8;margin-bottom:2rem">Remplissez les étapes pour soumettre votre demande d'acte</p>

      <div class="steps-indicator">
        ${['Type d\'acte', 'Informations', 'Pièces PDF', 'Validation'].map((label, i) => `
          <div class="step-ind ${step === i + 1 ? 'active' : ''}">
            <div class="step-dot-ind ${step > i + 1 ? 'done' : ''} ${step === i + 1 ? 'active' : ''}">${step > i + 1 ? '✓' : i + 1}</div>
            <span class="step-text">${label}</span>
          </div>
          ${i < 3 ? `<div class="step-line ${step > i + 1 ? 'done' : ''}"></div>` : ''}
        `).join('')}
      </div>

      <div class="glass-card" style="padding:2rem">
        ${step === 1 ? renderStep1() : ''}
        ${step === 2 ? renderStep2() : ''}
        ${step === 3 ? renderStep3() : ''}
        ${step === 4 ? renderStep4() : ''}

        <div class="nav-buttons">
          ${step > 1 ? `<button class="btn btn-outline" onclick="prevStep()"><i class="fas fa-arrow-left"></i> Précédent</button>` : '<div></div>'}
          ${step < 4 ? `<button class="btn btn-primary" onclick="nextStep()" id="next-btn">Suivant <i class="fas fa-arrow-right"></i></button>` : `<button class="btn btn-success" onclick="submitRequest()"><i class="fas fa-check-circle"></i> Soumettre la demande</button>`}
        </div>
      </div>
    </div>
  `;
}

function renderStep1() {
  return `
    <h2 style="font-size:1.2rem;font-weight:600;color:white;margin-bottom:1.5rem">Choisissez le type d'acte</h2>
    <div class="acte-select-grid">
      ${typesActes.map(a => `
        <div class="acte-select-card ${state.newRequest.type === a.id ? 'selected' : ''}" onclick="selectActe('${a.id}')">
          <div class="icon">${a.icon}</div>
          <h3>${a.libelle}</h3>
          <p>${a.description}</p>
          <div class="meta"><span class="delai">~${a.delai} jours</span><span class="prix">${a.frais.toLocaleString()} FCFA</span></div>
        </div>
      `).join('')}
    </div>
  `;
}

function selectActe(id) {
  state.newRequest.type = id;
  render();
}

function renderStep2() {
  const acte = getTypeActe(state.newRequest.type);
  return `
    <h2 style="font-size:1.2rem;font-weight:600;color:white;margin-bottom:1.5rem">Informations complémentaires</h2>
    <div class="form-group">
      <label class="form-label">Année académique</label>
      <select class="form-select" onchange="state.newRequest.annee=this.value">
        <option value="2025-2026" ${state.newRequest.annee === '2025-2026' ? 'selected' : ''}>2025-2026</option>
        <option value="2024-2025" ${state.newRequest.annee === '2024-2025' ? 'selected' : ''}>2024-2025</option>
        <option value="2023-2024" ${state.newRequest.annee === '2023-2024' ? 'selected' : ''}>2023-2024</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Motif de la demande *</label>
      <select class="form-select" onchange="state.newRequest.motif=this.value">
        <option value="">Sélectionnez un motif</option>
        <option value="stage" ${state.newRequest.motif === 'stage' ? 'selected' : ''}>Demande de stage</option>
        <option value="inscription" ${state.newRequest.motif === 'inscription' ? 'selected' : ''}>Inscription universitaire</option>
        <option value="bourse" ${state.newRequest.motif === 'bourse' ? 'selected' : ''}>Demande de bourse</option>
        <option value="emploi" ${state.newRequest.motif === 'emploi' ? 'selected' : ''}>Candidature emploi</option>
        <option value="personnel" ${state.newRequest.motif === 'personnel' ? 'selected' : ''}>Usage personnel</option>
        <option value="autre" ${state.newRequest.motif === 'autre' ? 'selected' : ''}>Autre</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Commentaires (optionnel)</label>
      <textarea class="form-textarea" rows="4" placeholder="Précisions supplémentaires..." oninput="state.newRequest.commentaires=this.value">${state.newRequest.commentaires}</textarea>
    </div>
    ${acte ? `<div class="alert alert-info"><i class="fas fa-info-circle"></i><div><strong style="color:#93c5fd">${acte.libelle}</strong><br>Frais : <strong>${acte.frais.toLocaleString()} FCFA</strong> — Délai : <strong>~${acte.delai} jours</strong></div></div>` : ''}
  `;
}

function renderStep3() {
  return `
    <h2 style="font-size:1.2rem;font-weight:600;color:white;margin-bottom:0.5rem">Pièces justificatives (PDF obligatoire)</h2>
    <p style="color:#94a3b8;font-size:0.9rem;margin-bottom:1rem">Vous devez obligatoirement fournir au moins un fichier au format <strong style="color:#93c5fd">PDF</strong> (max 5 Mo).</p>
    <div class="alert alert-warning"><i class="fas fa-exclamation-triangle"></i><div><strong>Important</strong><br>Seuls les fichiers <strong>PDF</strong> sont acceptés. Les formats JPG, PNG ou autres seront refusés.</div></div>
    <div class="file-upload-zone" onclick="document.getElementById('pdf-input').click()">
      <i class="fas fa-cloud-upload-alt"></i>
      <p>Cliquez pour sélectionner un fichier PDF</p>
      <p class="hint">Format PDF uniquement — Max 5 Mo par fichier</p>
      <input type="file" id="pdf-input" accept=".pdf,application/pdf" multiple style="display:none" onchange="handleFileSelect(event)">
    </div>
    <div id="file-error"></div>
    ${state.newRequest.files.length > 0 ? `
      <div style="margin-top:1rem">
        <div style="font-size:0.85rem;color:#cbd5e1;margin-bottom:0.5rem"><i class="fas fa-file-pdf" style="color:#60a5fa"></i> Fichiers PDF ajoutés (${state.newRequest.files.length})</div>
        ${state.newRequest.files.map((f, i) => `
          <div class="file-item">
            <div class="file-item-icon">PDF</div>
            <div class="file-item-info"><div class="file-item-name">${f.name}</div><div class="file-item-size">${formatSize(f.size)}</div></div>
            <button class="file-item-remove" onclick="removeFile(${i})"><i class="fas fa-times"></i></button>
          </div>
        `).join('')}
      </div>
    ` : `<div class="alert alert-warning mt-2"><i class="fas fa-exclamation-triangle"></i> Vous devez ajouter au moins un fichier PDF pour continuer.</div>`}
  `;
}

function handleFileSelect(e) {
  const files = e.target.files;
  const errorDiv = document.getElementById('file-error');
  errorDiv.innerHTML = '';

  for (let f of files) {
    if (f.type !== 'application/pdf') {
      errorDiv.innerHTML = `<div class="alert alert-error"><i class="fas fa-times-circle"></i> "${f.name}" n'est pas un PDF. Seuls les fichiers PDF sont acceptés.</div>`;
      continue;
    }
    if (f.size > 5 * 1024 * 1024) {
      errorDiv.innerHTML = `<div class="alert alert-error"><i class="fas fa-times-circle"></i> "${f.name}" dépasse 5 Mo.</div>`;
      continue;
    }
    if (state.newRequest.files.some(existing => existing.name === f.name)) {
      errorDiv.innerHTML = `<div class="alert alert-error"><i class="fas fa-times-circle"></i> "${f.name}" est déjà dans la liste.</div>`;
      continue;
    }
    state.newRequest.files.push({ name: f.name, size: f.size });
  }
  e.target.value = '';
  render();
}

function removeFile(index) {
  state.newRequest.files.splice(index, 1);
  render();
}

function renderStep4() {
  const acte = getTypeActe(state.newRequest.type);
  return `
    <h2 style="font-size:1.2rem;font-weight:600;color:white;margin-bottom:1.5rem">Récapitulatif et validation</h2>
    <div class="glass-card" style="padding:1rem;margin-bottom:1rem">
      <div style="font-size:0.75rem;color:#64748b;margin-bottom:0.25rem">Type d'acte</div>
      <div style="color:white;font-weight:500;display:flex;align-items:center;gap:0.5rem"><span style="font-size:1.5rem">${acte?.icon}</span> ${acte?.libelle}</div>
    </div>
    <div class="grid-2 mb-2">
      <div class="glass-card" style="padding:1rem"><div style="font-size:0.75rem;color:#64748b;margin-bottom:0.25rem">Année académique</div><div style="color:white;font-weight:500">${state.newRequest.annee}</div></div>
      <div class="glass-card" style="padding:1rem"><div style="font-size:0.75rem;color:#64748b;margin-bottom:0.25rem">Motif</div><div style="color:white;font-weight:500;text-transform:capitalize">${state.newRequest.motif || 'Non spécifié'}</div></div>
    </div>
    <div class="glass-card" style="padding:1rem;margin-bottom:1rem">
      <div style="font-size:0.75rem;color:#64748b;margin-bottom:0.5rem">Pièces jointes PDF (${state.newRequest.files.length})</div>
      ${state.newRequest.files.map(f => `<div style="display:flex;align-items:center;gap:0.5rem;font-size:0.85rem;color:#cbd5e1;padding:0.2rem 0"><i class="fas fa-file-pdf" style="color:#60a5fa"></i><span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${f.name}</span><span style="color:#64748b;font-size:0.75rem">${formatSize(f.size)}</span></div>`).join('')}
    </div>
    ${state.newRequest.commentaires ? `<div class="glass-card" style="padding:1rem;margin-bottom:1rem"><div style="font-size:0.75rem;color:#64748b;margin-bottom:0.25rem">Commentaires</div><div style="color:white">${state.newRequest.commentaires}</div></div>` : ''}
    <div style="padding:1rem;border-radius:12px;background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.2);display:flex;justify-content:space-between;align-items:center">
      <span style="color:#cbd5e1">Frais administratifs</span>
      <span style="font-size:1.25rem;font-weight:700;color:#93c5fd">${acte?.frais.toLocaleString()} FCFA</span>
    </div>
  `;
}

function canGoNext() {
  const step = state.newRequestStep;
  if (step === 1) return !!state.newRequest.type;
  if (step === 2) return !!state.newRequest.motif;
  if (step === 3) return state.newRequest.files.length > 0;
  return true;
}

function nextStep() {
  if (!canGoNext()) {
    showToast('Veuillez remplir tous les champs obligatoires.', 'error');
    return;
  }
  state.newRequestStep++;
  render();
}

function prevStep() {
  state.newRequestStep--;
  render();
}

function submitRequest() {
  const code = generateCode();
  const now = new Date().toISOString();
  const newDemande = {
    id: Date.now().toString(),
    code_suivi: code,
    etudiant_id: state.user.id,
    type_acte_id: state.newRequest.type,
    statut_id: '1',
    annee_academique: state.newRequest.annee,
    commentaires: state.newRequest.commentaires || `Motif: ${state.newRequest.motif}`,
    created_at: now,
    updated_at: now,
    pieces: state.newRequest.files.map(f => ({ nom: f.name, date: now.split('T')[0] })),
    timeline: [{ statut: 'Soumise', date: getNow(), commentaire: 'Demande reçue avec succès. En attente de traitement.' }]
  };
  demandes.unshift(newDemande);
  state.newRequestCode = code;
  state.newRequestSubmitted = true;
  render();
  showToast('Demande soumise avec succès !', 'success');
}

// ===== ADMIN DASHBOARD =====
function renderAdmin() {
  if (!state.isAdmin) return renderAdminLogin();

  const total = demandes.length;
  const pending = demandes.filter(d => d.statut_id === '1').length;
  const processing = demandes.filter(d => d.statut_id === '2').length;
  const validated = demandes.filter(d => d.statut_id === '3').length;
  const ready = demandes.filter(d => d.statut_id === '5').length;
  const rejected = demandes.filter(d => d.statut_id === '4').length;

  const filter = state.adminFilter || 'all';
  const search = state.adminSearch || '';

  const filtered = demandes.filter(d => {
    const matchFilter = filter === 'all' || d.statut_id === filter;
    const matchSearch = !search || d.code_suivi.toLowerCase().includes(search.toLowerCase()) || getTypeActe(d.type_acte_id)?.libelle.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return `
    <div class="dashboard">
      <h1 style="font-size:1.75rem;font-weight:700;color:white;margin-bottom:0.5rem">Tableau de bord Administration</h1>
      <p style="color:#94a3b8;margin-bottom:2rem">Gestion et suivi des demandes d'actes académiques</p>

      <div class="stats-row" style="grid-template-columns:repeat(auto-fit,minmax(130px,1fr))">
        <div class="stat-box"><div class="flex items-center gap-1 mb-1"><i class="fas fa-chart-bar" style="color:#60a5fa;font-size:0.8rem"></i><span style="font-size:0.7rem;color:#64748b">Total</span></div><div class="stat-box-value">${total}</div></div>
        <div class="stat-box"><div class="flex items-center gap-1 mb-1"><i class="fas fa-clock" style="color:#fbbf24;font-size:0.8rem"></i><span style="font-size:0.7rem;color:#64748b">En attente</span></div><div class="stat-box-value" style="color:#fbbf24">${pending}</div></div>
        <div class="stat-box"><div class="flex items-center gap-1 mb-1"><i class="fas fa-spinner" style="color:#60a5fa;font-size:0.8rem"></i><span style="font-size:0.7rem;color:#64748b">En cours</span></div><div class="stat-box-value" style="color:#60a5fa">${processing}</div></div>
        <div class="stat-box"><div class="flex items-center gap-1 mb-1"><i class="fas fa-check-circle" style="color:#4ade80;font-size:0.8rem"></i><span style="font-size:0.7rem;color:#64748b">Validées</span></div><div class="stat-box-value" style="color:#4ade80">${validated}</div></div>
        <div class="stat-box"><div class="flex items-center gap-1 mb-1"><i class="fas fa-file-circle-check" style="color:#34d399;font-size:0.8rem"></i><span style="font-size:0.7rem;color:#64748b">Prêtes</span></div><div class="stat-box-value" style="color:#34d399">${ready}</div></div>
        <div class="stat-box"><div class="flex items-center gap-1 mb-1"><i class="fas fa-times-circle" style="color:#f87171;font-size:0.8rem"></i><span style="font-size:0.7rem;color:#64748b">Rejetées</span></div><div class="stat-box-value" style="color:#f87171">${rejected}</div></div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.5rem;margin-bottom:2rem">
        <div class="glass-card" style="padding:1.5rem">
          <h3 style="font-size:0.85rem;font-weight:600;color:white;margin-bottom:1rem"><i class="fas fa-chart-line" style="color:#60a5fa;margin-right:0.5rem"></i>Répartition par type</h3>
          ${typesActes.slice(0, 4).map(type => {
            const count = demandes.filter(d => d.type_acte_id === type.id).length;
            const pct = total > 0 ? Math.round((count / total) * 100) : 0;
            return `<div style="margin-bottom:0.75rem"><div style="display:flex;justify-content:space-between;font-size:0.8rem;margin-bottom:0.25rem"><span style="color:#cbd5e1">${type.icon} ${type.libelle}</span><span style="color:#64748b">${count} (${pct}%)</span></div><div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div></div>`;
          }).join('')}
        </div>
        <div class="glass-card" style="padding:1.5rem">
          <h3 style="font-size:0.85rem;font-weight:600;color:white;margin-bottom:1rem"><i class="fas fa-users" style="color:#34d399;margin-right:0.5rem"></i>Indicateurs</h3>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem">
            <div class="glass-card" style="padding:1rem;text-align:center"><div style="font-size:1.75rem;font-weight:700;color:#34d399">85%</div><div style="font-size:0.7rem;color:#64748b">Taux validation</div></div>
            <div class="glass-card" style="padding:1rem;text-align:center"><div style="font-size:1.75rem;font-weight:700;color:#60a5fa">3.2j</div><div style="font-size:0.7rem;color:#64748b">Délai moyen</div></div>
            <div class="glass-card" style="padding:1rem;text-align:center"><div style="font-size:1.75rem;font-weight:700;color:#fbbf24">${pending + processing}</div><div style="font-size:0.7rem;color:#64748b">À traiter</div></div>
            <div class="glass-card" style="padding:1rem;text-align:center"><div style="font-size:1.75rem;font-weight:700;color:#c084fc">98%</div><div style="font-size:0.7rem;color:#64748b">Satisfaction</div></div>
          </div>
        </div>
      </div>

      <div style="display:flex;flex-wrap:wrap;gap:1rem;margin-bottom:1.5rem">
        <div style="flex:1;min-width:200px;position:relative">
          <i class="fas fa-search" style="position:absolute;left:1rem;top:50%;transform:translateY(-50%);color:#64748b"></i>
          <input type="text" class="form-input" style="padding-left:2.75rem" placeholder="Rechercher par code ou type..." value="${search}" oninput="state.adminSearch=this.value;render()">
        </div>
        <select class="form-select" style="max-width:200px" onchange="state.adminFilter=this.value;render()">
          <option value="all" ${filter === 'all' ? 'selected' : ''}>Tous les statuts</option>
          ${statuts.map(s => `<option value="${s.id}" ${filter === s.id ? 'selected' : ''}>${s.libelle}</option>`).join('')}
        </select>
      </div>

      <div class="demandes-list">
        <div style="overflow-x:auto">
          <table class="admin-table">
            <thead><tr><th>Code</th><th>Type d'acte</th><th>Date</th><th>Statut</th><th style="text-align:right">Actions</th></tr></thead>
            <tbody>
              ${filtered.length === 0 ? '<tr><td colspan="5" style="text-align:center;padding:3rem;color:#64748b"><i class="fas fa-info-circle" style="font-size:1.5rem;display:block;margin-bottom:0.5rem"></i>Aucune demande trouvée</td></tr>' : ''}
              ${filtered.map(d => {
                const type = getTypeActe(d.type_acte_id);
                const statut = getStatut(d.statut_id);
                return `<tr><td><span class="code">${d.code_suivi}</span></td><td><span style="font-size:1.1rem;margin-right:0.5rem">${type.icon}</span><span style="color:white">${type.libelle}</span></td><td style="color:#94a3b8">${formatDate(d.created_at)}</td><td><span class="badge ${statut.badge}"><i class="fas ${statut.icon}"></i> ${statut.libelle}</span></td><td style="text-align:right"><button class="action-btn" onclick="openAdminModal('${d.id}')" title="Voir détails"><i class="fas fa-eye"></i></button></td></tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div id="admin-modal"></div>
  `;
}

function openAdminModal(id) {
  state.adminModalId = id;
  state.adminComment = '';
  const d = demandes.find(dem => dem.id === id);
  if (!d) return;

  const type = getTypeActe(d.type_acte_id);
  const statut = getStatut(d.statut_id);

  document.getElementById('admin-modal').innerHTML = `
    <div class="modal-overlay" onclick="closeAdminModal()">
      <div class="modal" onclick="event.stopPropagation()">
        <div class="modal-header">
          <div><h2>${type.icon} ${type.libelle}</h2><p style="font-family:monospace;font-size:0.85rem;color:#64748b">${d.code_suivi}</p></div>
          <button class="modal-close" onclick="closeAdminModal()"><i class="fas fa-times"></i></button>
        </div>

        <div class="info-grid mb-3">
          <div class="info-box"><div class="label">Année académique</div><div class="value">${d.annee_academique}</div></div>
          <div class="info-box"><div class="label">Date soumission</div><div class="value">${formatDate(d.created_at)}</div></div>
          <div class="info-box"><div class="label">Statut actuel</div><div class="value"><span class="badge ${statut.badge}" style="margin-top:0.25rem"><i class="fas ${statut.icon}"></i> ${statut.libelle}</span></div></div>
          <div class="info-box"><div class="label">Pièces jointes</div><div class="value">${d.pieces.length} fichier(s)</div></div>
        </div>

        <div class="mb-3">
          <h4 style="font-size:0.85rem;font-weight:600;color:white;margin-bottom:0.5rem">Pièces justificatives</h4>
          ${d.pieces.map(p => `<div class="file-item"><div class="file-item-icon">PDF</div><div class="file-item-info"><div class="file-item-name">${p.nom}</div></div></div>`).join('')}
        </div>

        <div class="mb-3">
          <h4 style="font-size:0.85rem;font-weight:600;color:white;margin-bottom:0.5rem">Historique</h4>
          <div style="max-height:150px;overflow-y:auto">
            ${d.timeline.map(step => `<div style="display:flex;gap:0.75rem;font-size:0.85rem;margin-bottom:0.5rem"><div style="width:6px;height:6px;border-radius:50%;background:#60a5fa;margin-top:6px;flex-shrink:0"></div><div><span style="color:white;font-weight:500">${step.statut}</span><span style="color:#64748b;margin-left:0.5rem">${step.date}</span><div style="color:#475569;font-size:0.75rem">${step.commentaire}</div></div></div>`).join('')}
          </div>
        </div>

        <div class="modal-actions" style="flex-direction:column;align-items:stretch">
          <div>
            <label class="form-label">Commentaire (optionnel)</label>
            <textarea class="form-textarea" rows="2" placeholder="Ajouter un commentaire ou motif..." id="admin-comment-input"></textarea>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:0.75rem">
            ${d.statut_id !== '2' ? `<button class="btn btn-sm" style="background:rgba(59,130,246,0.2);border:1px solid rgba(59,130,246,0.3);color:#93c5fd" onclick="adminAction('${d.id}','2')"><i class="fas fa-spinner"></i> Mettre en traitement</button>` : ''}
            ${d.statut_id !== '3' && d.statut_id !== '4' && d.statut_id !== '5' ? `<button class="btn btn-sm" style="background:rgba(34,197,94,0.2);border:1px solid rgba(34,197,94,0.3);color:#4ade80" onclick="adminAction('${d.id}','3')"><i class="fas fa-check"></i> Valider</button>` : ''}
            <button class="btn btn-sm" style="background:rgba(16,185,129,0.2);border:1px solid rgba(16,185,129,0.3);color:#34d399" onclick="openUploadModal('${d.id}')"><i class="fas fa-upload"></i> Téléverser doc. signé</button>
            ${d.statut_id !== '4' ? `<button class="btn btn-sm" style="background:rgba(239,68,68,0.2);border:1px solid rgba(239,68,68,0.3);color:#f87171" onclick="adminAction('${d.id}','4')"><i class="fas fa-times-circle"></i> Rejeter</button>` : ''}
          </div>
        </div>
      </div>
    </div>
  `;
}

function closeAdminModal() {
  document.getElementById('admin-modal').innerHTML = '';
  state.adminModalId = null;
}

function adminAction(id, newStatutId) {
  const d = demandes.find(dem => dem.id === id);
  if (!d) return;

  const commentInput = document.getElementById('admin-comment-input');
  const comment = commentInput ? commentInput.value.trim() : '';

  const now = new Date();
  const dateStr = now.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  const statutLabels = { '1': 'En attente', '2': 'En cours de traitement', '3': 'Validée', '4': 'Rejetée', '5': 'Disponible' };

  d.statut_id = newStatutId;
  d.updated_at = now.toISOString();
  d.timeline.push({
    statut: statutLabels[newStatutId],
    date: dateStr,
    commentaire: comment || `Statut changé vers ${statutLabels[newStatutId]}`
  });

  const messages = {
    '2': 'Demande mise en traitement avec succès !',
    '3': 'Demande validée avec succès !',
    '4': 'Demande rejetée.',
    '5': 'Demande marquée comme prête !'
  };

  showToast(messages[newStatutId], newStatutId === '4' ? 'error' : 'success');
  closeAdminModal();
  render();
}

function openUploadModal(id) {
  state.uploadDemandeId = id;
  state.uploadFileName = '';

  document.getElementById('admin-modal').innerHTML = `
    <div class="modal-overlay" onclick="closeUploadModal()">
      <div class="modal" style="max-width:450px" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h2><i class="fas fa-upload" style="color:#34d399;margin-right:0.5rem"></i>Téléverser le document signé</h2>
          <button class="modal-close" onclick="closeUploadModal()"><i class="fas fa-times"></i></button>
        </div>
        <p style="color:#94a3b8;font-size:0.9rem;margin-bottom:1rem">Sélectionnez le document PDF signé. Le statut passera automatiquement à "Prêt".</p>
        <div class="file-upload-zone" onclick="simulateFilePick()" style="padding:2rem">
          <i class="fas fa-cloud-upload-alt"></i>
          <p>Cliquez pour sélectionner le PDF signé</p>
          <p class="hint">Format PDF uniquement</p>
        </div>
        <div id="upload-preview"></div>
        <div style="display:flex;gap:0.75rem;margin-top:1.5rem">
          <button class="btn btn-outline" style="flex:1" onclick="closeUploadModal()">Annuler</button>
          <button class="btn btn-success" style="flex:1" id="upload-confirm-btn" onclick="confirmUpload()" disabled><i class="fas fa-paper-plane"></i> Confirmer</button>
        </div>
      </div>
    </div>
  `;
}

function simulateFilePick() {
  const d = demandes.find(dem => dem.id === state.uploadDemandeId);
  const fakeNames = ['acte_signe_' + (d ? d.code_suivi : '') + '.pdf', 'document_officiel.pdf', 'certificat_final.pdf'];
  state.uploadFileName = fakeNames[Math.floor(Math.random() * fakeNames.length)];

  document.getElementById('upload-preview').innerHTML = `
    <div class="file-item mt-2">
      <div class="file-item-icon">PDF</div>
      <div class="file-item-info"><div class="file-item-name">${state.uploadFileName}</div><div class="file-item-size">2.4 Mo</div></div>
      <button class="file-item-remove" onclick="clearUpload()"><i class="fas fa-times"></i></button>
    </div>
  `;
  document.getElementById('upload-confirm-btn').disabled = false;
}

function clearUpload() {
  state.uploadFileName = '';
  document.getElementById('upload-preview').innerHTML = '';
  document.getElementById('upload-confirm-btn').disabled = true;
}

function closeUploadModal() {
  state.uploadFileName = '';
  // Re-open the main admin modal
  if (state.adminModalId) {
    openAdminModal(state.adminModalId);
  }
}

function confirmUpload() {
  if (!state.uploadFileName || !state.uploadDemandeId) return;

  const d = demandes.find(dem => dem.id === state.uploadDemandeId);
  if (!d) return;

  const now = new Date();
  const dateStr = now.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  d.statut_id = '5';
  d.updated_at = now.toISOString();
  d.timeline.push({
    statut: 'Disponible',
    date: dateStr,
    commentaire: `Document signé téléversé : ${state.uploadFileName}`
  });

  showToast('Document signé téléversé ! Demande marquée comme prête.', 'success');
  state.uploadFileName = '';
  state.adminModalId = null;
  document.getElementById('admin-modal').innerHTML = '';
  render();
}

// ===== RENDER PRINCIPAL =====
function render() {
  renderNav();
  const app = document.getElementById('app');

  switch (state.currentPage) {
    case 'home': app.innerHTML = renderHome(); break;
    case 'tracking': app.innerHTML = renderTracking(); break;
    case 'faq': app.innerHTML = renderFAQ(); break;
    case 'login': app.innerHTML = renderLogin(); break;
    case 'admin-login': app.innerHTML = renderAdminLogin(); break;
    case 'dashboard': app.innerHTML = renderDashboard(); break;
    case 'new-request': app.innerHTML = renderNewRequest(); break;
    case 'demande-detail': app.innerHTML = renderDemandeDetail(); break;
    case 'admin': app.innerHTML = renderAdmin(); break;
    default: app.innerHTML = renderHome();
  }
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initBackground();
  render();
});
