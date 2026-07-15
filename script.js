// 1. COMPTE À REBOURS DYNAMIQUE (Cible : Jeudi 27 Août 2026 à 20:00:00)
// Rappel JS: Le mois d'Août est indexé à 7 (Janvier = 0)
const dateObsèques = new Date(2026, 7, 27, 20, 0, 0).getTime();

const intervalCompte = setInterval(function() {
    const maintenant = new Date().getTime();
    const distance = dateObsèques - maintenant;

    // Calcul du temps restant
    const jours = Math.floor(distance / (1000 * 60 * 60 * 24));
    const heures = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const secondes = Math.floor((distance % (1000 * 60)) / 1000);

    // Affichage des chiffres sur le site
    document.getElementById("days").innerText = jours < 10 ? "0" + jours : jours;
    document.getElementById("hours").innerText = heures < 10 ? "0" + heures : heures;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = secondes < 10 ? "0" + secondes : secondes;

    // Si la date est atteinte
    if (distance < 0) {
        clearInterval(intervalCompte);
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
    }
}, 1000);

// 2. LOGIQUE DE GÉNÉRATION DE LA CARTE D'INVITATION
let imageGenereeBlob = null;

function genererCarte() {
    const nomSaisi = document.getElementById("guestNameInput").value.trim();
    if (nomSaisi === "") {
        alert("Veuillez saisir votre nom pour personnaliser l'invitation.");
        return;
    }

    // Met à jour dynamiquement le texte sur la carte d'invitation
    document.getElementById("cardGuestName").innerText = nomSaisi.toUpperCase();

    // Capture de l'élément de la carte
    const elementACapturer = document.getElementById("captureArea");
    
    html2canvas(elementACapturer, {
        useCORS: true, 
        scale: 2 // Assure un rendu net en HD
    }).then(canvas => {
        imageGenereeBlob = canvas.toDataURL("image/png");
        
        // Active proprement le bouton de téléchargement
        const btn = document.getElementById("btnTelecharger");
        btn.disabled = false;
        btn.classList.remove("opacity-50", "cursor-not-allowed");
        btn.classList.add("bg-amber-600", "hover:bg-amber-700", "scale-105");

        alert("L'invitation de la famille GBINLO pour " + nomSaisi + " a été générée avec succès ! Vous pouvez la télécharger.");
    });
}

function telechargerImage() {
    if (!imageGenereeBlob) return;
    const link = document.createElement('a');
    link.download = 'invitation-Patriarche-GBINLO.png';
    link.href = imageGenereeBlob;
    link.click();
}