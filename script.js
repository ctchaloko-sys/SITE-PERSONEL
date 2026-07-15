// 1. COMPTE À REBOURS DYNAMIQUE (Date cible : 12 Septembre 2026 à 10:00:00)
const dateObsèques = new Date(2026, 8, 12, 10, 0, 0).getTime();

setInterval(function() {
    const maintenant = new Date().getTime();
    const distance = dateObsèques - maintenant;

    // Calcul du temps restant
    const jours = Math.floor(distance / (1000 * 60 * 60 * 24));
    const heures = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const secondes = Math.floor((distance % (1000 * 60)) / 1000);

    // Affichage avec un zéro devant si < 10
    document.getElementById("days").innerText = jours < 10 ? "0" + jours : jours;
    document.getElementById("hours").innerText = heures < 10 ? "0" + heures : heures;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = secondes < 10 ? "0" + secondes : secondes;
}, 1000);

// 2. LOGIQUE DE GÉNÉRATION DE LA CARTE D'INVITATION
let imageGenereeBlob = null;

function genererCarte() {
    const nomSaisi = document.getElementById("guestNameInput").value.trim();
    if (nomSaisi === "") {
        alert("Veuillez saisir votre nom pour générer la carte.");
        return;
    }

    // Met à jour dynamiquement le texte sur la carte d'invitation
    document.getElementById("cardGuestName").innerText = nomSaisi.toUpperCase();

    // Récupère l'élément HTML de la carte
    const elementACapturer = document.getElementById("captureArea");
    
    // Génère l'image avec html2canvas
    html2canvas(elementACapturer, {
        useCORS: true, 
        scale: 2 // Améliore la qualité (évite que ce soit flou)
    }).then(canvas => {
        imageGenereeBlob = canvas.toDataURL("image/png");
        
        // Active le bouton de téléchargement
        const btn = document.getElementById("btnTelecharger");
        btn.disabled = false;
        btn.classList.remove("opacity-50", "cursor-not-allowed");
        btn.classList.add("bg-amber-600", "hover:bg-amber-700");

        alert("Votre invitation a été générée avec succès ! Vous pouvez maintenant la télécharger.");
    });
}

function telechargerImage() {
    if (!imageGenereeBlob) return;
    const link = document.createElement('a');
    link.download = 'invitation-hommage.png';
    link.href = imageGenereeBlob;
    link.click();
}