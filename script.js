/**
 * WELT DER KOMPETENZEN - Core Application Engine
 * Premium UX Architecture & Safe WhatsApp Routing
 */

// --- 1. DATA CONFIGURATION & DATA INJECTIONS ---
const SERVICES_DATA = [
    { title: "Professeur d'Allemand", phone: "0157812140", img: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80", desc: "Formations et cours linguistiques d'élite. Allemand professionnel, académique et perfectionnement sur mesure pour l'international." },
    { title: "Création de Site Web", phone: "0158255572", img: "https://images.unsplash.com/photo-1547658719-da2b81166b58?auto=format&fit=crop&w=600&q=80", desc: "Développement d'écosystèmes vitrines et applicatifs haut de gamme. Optimisation SEO avancée, 4K UX design, fluidité maximale." },
    { title: "Création de SaaS", phone: "96966297", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80", desc: "Architecture Cloud souveraine et évolutive. Conception de plateformes logicielles complexes adaptées à la monétisation immédiate." },
    { title: "Design UI/UX", phone: "55172503", img: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=600&q=80", desc: "Maquettes haute fidélité, wireframing stratégique et design émotionnel axé sur la rétention utilisateur." },
    { title: "Compte TikTok Monétisé", phone: "0158255572", img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80", desc: "Création de comptes clés en main éligibles aux programmes de récompenses. Configuration algorithmique optimale." },
    { title: "Faire-part & Cartes Premium", phone: "0158255572", img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80", desc: "Créations graphiques et papeterie de prestige pour invitations corporatives ou événements privés haut de gamme." },
    { title: "Application Mobile", phone: "55172503", img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80", desc: "Applications natives et cross-platforme iOS/Android. Expérience immersive fluide, notifications et performances ultimes." },
    { title: "Automatisation IA & CRM", phone: "96966297", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80", desc: "Interconnexion d'agents d'intelligence artificielle et optimisation des pipelines CRM pour éradiquer les tâches chronophages." }
];

const PORTFOLIO_DATA = [
    { title: "Plateforme Linguistique DeutschPro", serviceIdx: 0, link: "https://example.com/demo-deutsch", type: "web" },
    { title: "E-Commerce Luxury & Headless Architecture", serviceIdx: 1, link: "https://example.com/demo-shop", type: "web" },
    { title: "SaaS Enterprise Resource Planning Analytics", serviceIdx: 2, link: "https://example.com/demo-saas", type: "web" },
    { title: "UI/UX Mobile Fintech App Redesign", serviceIdx: 3, link: "https://example.com/demo-ui", type: "web" },
    { title: "Réseau TikTok Media Booster Agency", serviceIdx: 4, link: "https://example.com/demo-tiktok", type: "web" },
    { title: "Faire-Part Numérique Prestige Royal Ébène", serviceIdx: 5, link: "https://example.com/demo-invitation.pdf", type: "pdf" },
    { title: "App Mobile Livraison Express & Géolocalisée", serviceIdx: 6, link: "https://example.com/demo-app", type: "web" },
    { title: "Dashboard Automatisation IA & Workflow Hub", serviceIdx: 7, link: "https://example.com/demo-crm-ai", type: "web" }
];

const TESTIMONIALS_DATA = [
    // 5 Pays Africains
    { name: "Koffi Mensah", country: "Côte d'Ivoire", flag: "🇨🇮", stars: 5, text: "Le SaaS livré a transformé notre logistique à Abidjan. Chapeau bas à Emmanuel." },
    { name: "Awa Diop", country: "Sénégal", flag: "🇸🇳", stars: 5, text: "L'interface UI/UX de notre application mobile fait l'unanimité auprès de nos clients." },
    { name: "Serge Houndo", country: "Bénin", flag: "🇧🇯", stars: 5, text: "L'automatisation de notre CRM par l'IA nous fait économiser des dizaines d'heures par semaine." },
    { name: "Marc Mbarga", country: "Cameroun", flag: "🇨🇲", stars: 5, text: "Le site vitrine premium conçu pour notre cabinet est simplement spectaculaire." },
    { name: "Inès Bongo", country: "Gabon", flag: "🇬🇦", stars: 5, text: "Expertise, réactivité et professionnalisme irréprochable tout au long du projet." },
    // 3 Pays de l'UE
    { name: "Pierre Dubois", country: "France", flag: "🇫🇷", stars: 5, text: "Design 4K UX d'une finesse rare. Les transitions sont fluides, le code est d'une propreté exemplaire." },
    { name: "Jean-Paul Timmermans", country: "Belgique", flag: "🇧🇪", stars: 5, text: "L'intégration du système SaaS répond parfaitement aux exigences de scalabilité de notre entreprise." },
    { name: "Luc Schmit", country: "Luxembourg", flag: "🇱🇺", stars: 5, text: "Very high level development engineering. Processus carré et sécurisé." },
    // 2 Avis Allemands (Obligatoirement en Allemand)
    { name: "Hans Müller", country: "Allemagne", flag: "🇩🇪", stars: 5, text: "Hervorragende Arbeit! Die Automatisierung läuft fehlerfrei und der Support ist weltklasse." },
    { name: "Franziska Hofer", country: "Autriche", flag: "🇦🇹", stars: 5, text: "Der Deutschunterricht und die begleitende Lernplattform sind absolut erstklassig strukturiert." },
    // 1 Avis en Anglais
    { name: "Johnathan Wright", country: "USA", flag: "🇺🇸", stars: 5, text: "Exceptional UI design craftsmanship. Emmanuel delivered our enterprise mobile app ahead of schedule." }
];

document.addEventListener("DOMContentLoaded", () => {
    initServices();
    initPortfolio();
    initTestimonials();
    initParticles();
    initTheme();
    initInteractions();
});

// --- 2. RENDER ENGINES ---
function initServices() {
    const grid = document.getElementById("servicesGrid");
    SERVICES_DATA.forEach((s, idx) => {
        // Envelopper chaque lettre du titre pour l'effet d'animation requis
        const safeTitle = sanitizeHTML(s.title);
        const dynamicLetters = safeTitle.split('').map((char, i) => {
            if(char === ' ') return ' ';
            return `<span class="letter-span" style="transition-delay: ${i * 0.02}s">${char}</span>`;
        }).join('');

        const card = document.createElement("div");
        card.className = "service-card";
        card.innerHTML = `
            <div class="service-img-wrapper">
                <img src="${s.img}" alt="${safeTitle}" loading="lazy">
            </div>
            <div class="service-content">
                <h3 class="service-title">${dynamicLetters}</h3>
                <p class="service-desc">${sanitizeHTML(s.desc)}</p>
                <button class="btn-premium" onclick="openOrderModal(${idx})">Commander ce projet <i class="fas fa-arrow-right" style="margin-left:8px;"></i></button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function initPortfolio() {
    const grid = document.getElementById("portfolioGrid");
    PORTFOLIO_DATA.forEach(p => {
        const service = SERVICES_DATA[p.serviceIdx];
        const card = document.createElement("div");
        card.className = "portfolio-card";
        
        let actionAttr = `href="${p.link}" target="_blank" rel="noopener noreferrer"`;
        if (p.type === "pdf") {
            actionAttr = `href="${p.link}" download="Demonstration_Welt_Der_Kompetenzen.pdf"`;
        }

        card.innerHTML = `
            <div class="service-img-wrapper">
                <img src="${service.img}" alt="${sanitizeHTML(p.title)}" loading="lazy">
            </div>
            <div class="portfolio-info">
                <span class="portfolio-tag">${sanitizeHTML(service.title)}</span>
                <h4 style="margin-bottom:1.5rem; font-family:var(--font-heading);">${sanitizeHTML(p.title)}</h4>
                <a ${actionAttr} class="btn-premium" style="background:transparent; border-color:rgba(255,255,255,0.2);">Voir le projet</a>
            </div>
        `;
        grid.appendChild(card);
    });
}

function initTestimonials() {
    const grid = document.getElementById("testimonialsGrid");
    TESTIMONIALS_DATA.forEach(t => {
        const card = document.createElement("div");
        card.className = "testimonial-card";
        const starsHtml = '<i class="fas fa-star"></i>'.repeat(t.stars);
        card.innerHTML = `
            <div class="client-meta">
                <span class="flag-icon">${t.flag}</span>
                <div>
                    <div class="client-name">${sanitizeHTML(t.name)}</div>
                    <small style="color:var(--text-muted);">${sanitizeHTML(t.country)}</small>
                </div>
            </div>
            <div class="stars">${starsHtml}</div>
            <p style="font-style:italic; font-size:0.95rem; line-height:1.6; color:var(--text-muted);">"${sanitizeHTML(t.text)}"</p>
        `;
        grid.appendChild(card);
    });
}

// --- 3. SYSTÈME DE PARTICULES NATIF ---
let mouseX = 0, mouseY = 0;
function initParticles() {
    const canvas = document.getElementById("particleCanvas");
    const ctx = canvas.getContext("2d");
    let particlesArray = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = Math.random() * 0.4 - 0.2;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;

            // Interaction subtile avec la souris
            let dx = mouseX - this.x;
            let dy = mouseY - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 120) {
                this.x -= dx * 0.02;
                this.y -= dy * 0.02;
            }
        }
        draw() {
            ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 75; i++) {
        particlesArray.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

// --- 4. THEME & INTERACTIVE UX LOGIC ---
function initTheme() {
    const btn = document.getElementById("themeToggle");
    btn.addEventListener("click", () => {
        if (document.body.classList.contains("dark-theme")) {
            document.body.classList.remove("dark-theme");
            document.body.classList.add("light-theme");
            btn.innerHTML = `<i class="fas fa-sun"></i>`;
        } else {
            document.body.classList.remove("light-theme");
            document.body.classList.add("dark-theme");
            btn.innerHTML = `<i class="fas fa-moon"></i>`;
        }
    });
}

function initInteractions() {
    // Parallaxe continu fluide au défilement
    const parallaxBg = document.getElementById("parallaxBg");
    window.addEventListener("scroll", () => {
        let offset = window.pageYOffset;
        parallaxBg.style.transform = `translate3d(0, ${offset * 0.4}px, 0)`;
    });

    // Effet interactif de text-masking au mouvement de la souris sur le titre principal
    const title = document.getElementById("interactiveTitle");
    title.addEventListener("mousemove", (e) => {
        const rect = title.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        title.style.backgroundPosition = `${x}% ${y}%`;
    });

    // Modals Close Mechanisms
    document.getElementById("closeModal").addEventListener("click", closeOrderModal);
    window.addEventListener("click", (e) => {
        const modal = document.getElementById("orderModal");
        if(e.target === modal) closeOrderModal();
    });

    // Form submission processing
    const form = document.getElementById("orderForm");
    form.addEventListener("submit", handleFormSubmit);
}

// --- 5. MODAL CONTROL ---
window.openOrderModal = function(serviceIndex) {
    document.getElementById("selectedServiceIndex").value = serviceIndex;
    document.getElementById("orderModal").classList.add("active");
    document.body.style.overflow = "hidden"; // Verrouiller le scroll
};

function closeOrderModal() {
    document.getElementById("orderModal").classList.remove("active");
    document.body.style.overflow = "auto";
}

// --- 6. ROUTAGE WHATSAPP SÉCURISÉ & SÉCURITÉ ANTI-XSS ---
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Extraction et Assainissement (Sanitization) strict des entrées
    const clientName = sanitizeHTML(document.getElementById("clientName").value.trim());
    const clientWhatsapp = sanitizeHTML(document.getElementById("clientWhatsapp").value.trim());
    const projectDesc = sanitizeHTML(document.getElementById("projectDesc").value.trim());
    const projectBudget = sanitizeHTML(document.getElementById("projectBudget").value.trim()) || "Non spécifié";
    const projectUrgency = sanitizeHTML(document.getElementById("projectUrgency").value);
    const serviceIdx = document.getElementById("selectedServiceIndex").value;
    const outputOption = document.querySelector('input[name="outputOption"]:checked').value;

    // Validation de base de sécurité contre la soumission vide
    if (!clientName || !clientWhatsapp || !projectDesc) {
        alert("Veuillez remplir correctement tous les champs obligatoires (*).");
        return;
    }

    const targetedService = SERVICES_DATA[serviceIdx];
    // Nettoyage complet du numéro pour éliminer les espaces ou caractères invalides
    const cleanPhone = targetedService.phone.replace(/\s+/g, '');

    // Structuration professionnelle du message commercial
    let messageText = `*WELT DER KOMPETENZEN — NOUVELLE COMMANDE PREMIUM*\n\n`;
    messageText += `• *Service demandé :* ${targetedService.title}\n`;
    messageText += `• *Client :* ${clientName}\n`;
    messageText += `• *WhatsApp client :* ${clientWhatsapp}\n`;
    messageText += `• *Description du Projet :* ${projectDesc}\n`;
    messageText += `• *Budget estimé :* ${projectBudget}\n`;
    messageText += `• *Niveau d'urgence :* ${projectUrgency}\n`;
    
    if (outputOption === "api") {
        messageText += `\n[⚠️ *Note Simulation :* Le client a sélectionné l'option Intégration API Paiement à l'envoi]`;
    }

    // Encodage URL sécurisé strict
    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

    closeOrderModal();
    
    // Déclenchement de la notification Toast synchrone
    showToast();

    // Redirection après un léger délai pour laisser l'UX respirer
    setTimeout(() => {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 1500);
}

function showToast() {
    const toast = document.getElementById("toastNotification");
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 4500);
}

/**
 * Fonction d'assainissement robuste (Sanitization anti-XSS)
 * Bloque l'exécution de scripts injectés par des balises HTML malveillantes
 */
function sanitizeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, function(match) {
        const escapeMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;'
        };
        return escapeMap[match];
    });
}