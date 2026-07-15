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