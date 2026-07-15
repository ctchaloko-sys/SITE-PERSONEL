// Liste des compétences à faire défiler de manière dynamique
const words = ["Enseignant d'allemand", "Prompt Engineer", "Créateur de ressources"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const dynamicText = document.getElementById("dynamic-text");

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        // Enlever une lettre
        dynamicText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Ajouter une lettre
        dynamicText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    // Gestion de la vitesse d'écriture/suppression
    let typeSpeed = isDeleting ? 50 : 100;

    // Si le mot est entièrement écrit
    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Pause à la fin du mot
        isDeleting = true;
    } 
    // Si le mot est entièrement effacé
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length; // Passer au mot suivant
        typeSpeed = 500; // Petite pause avant d'écrire le nouveau mot
    }

    setTimeout(typeEffect, typeSpeed);
}

// Lancement de l'animation au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    typeEffect();
});
// --- EFFET DE PARALLAXE 3D (TILT EFFECT) ---
const tiltElements = document.querySelectorAll('[data-tilt]');

tiltElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left; // Position X de la souris dans l'élément
        const y = e.clientY - rect.top;  // Position Y de la souris dans l'élément
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calcul de l'angle de rotation (Max 15 degrés pour rester élégant)
        const rotateX = ((centerY - y) / centerY) * 15;
        const rotateY = ((x - centerX) / centerX) * 15;
        
        // Application de la transformation 3D
        element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    // Réinitialisation de l'angle quand la souris sort de la carte
    element.addEventListener('mouseleave', () => {
        element.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
        element.style.transition = 'transform 0.5s ease';
    });

    element.addEventListener('mouseenter', () => {
        element.style.transition = 'none'; // Désactive la transition pendant le mouvement
    });
});


// --- ENVOI DE FORMULAIRE INTERACTIF ---
const form = document.getElementById('interactive-form');
const statusDiv = document.getElementById('form-status');

form.addEventListener('submit', function(e) {
    e.preventDefault(); // Empêche le rechargement de la page
    
    // Animation de chargement sur le bouton
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>Envoi en cours...</span> <i data-lucide="loader" class="animate-spin"></i>`;
    lucide.createIcons(); // Recréer l'icône de chargement

    // Simulation d'envoi (Ici tu pourras lier un service comme EmailJS ou un script PHP de traitement)
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        lucide.createIcons();

        // Affichage du message de succès dynamique
        statusDiv.className = "form-status success";
        statusDiv.textContent = "Vielen Dank! Votre message a bien été envoyé. À très vite !";
        
        form.reset(); // Réinitialisation du formulaire
        
        // Disparition automatique après 5 secondes
        setTimeout(() => {
            statusDiv.className = "form-status hidden";
        }, 5000);

    }, 1500); // Temps de simulation de 1.5s
});