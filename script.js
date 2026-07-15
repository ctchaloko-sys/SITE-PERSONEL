// 1. GESTION DU MODE SOMBRE / CLAIR DYNAMIQUE
function toggleDarkMode() {
    const htmlElement = document.documentElement;
    const themeIcon = document.getElementById("themeIcon");
    const themeText = document.getElementById("themeText");

    if (htmlElement.classList.contains("dark")) {
        htmlElement.classList.remove("dark");
        themeIcon.innerText = "🌙";
        themeText.innerText = "Mode Sombre";
    } else {
        htmlElement.classList.add("dark");
        themeIcon.innerText = "☀️";
        themeText.innerText = "Mode Clair";
    }
}

// 2. COMPTE À REBOURS DYNAMIQUE (Cible : Jeudi 27 Août 2026 à 20:00:00)
const dateObsèques = new Date(2026, 7, 27, 20, 0, 0).getTime();

const intervalCompte = setInterval(function() {
    const maintenant = new Date().getTime();
    const distance = dateObsèques - maintenant;

    const jours = Math.floor(distance / (1000 * 60 * 60 * 24));
    const heures = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const secondes = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = jours < 10 ? "0" + jours : jours;
    document.getElementById("hours").innerText = heures < 10 ? "0" + heures : heures;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = secondes < 10 ? "0" + secondes : secondes;

    if (distance < 0) {
        clearInterval(intervalCompte);
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
    }
}, 1000);

// 3. GÉNÉRATEUR DE LA CARTE D'INVITATION
let imageGenereeBlob = null;

function genererCarte() {
    const nomSaisi = document.getElementById("guestNameInput").value.trim();
    if (nomSaisi === "") {
        alert("Vaudriez-vous bien saisir votre nom avant de continuer ?");
        return;
    }

    document.getElementById("cardGuestName").innerText = nomSaisi.toUpperCase();
    const elementACapturer = document.getElementById("captureArea");
    
    html2canvas(elementACapturer, {
        useCORS: true, 
        scale: 2
    }).then(canvas => {
        imageGenereeBlob = canvas.toDataURL("image/png");
        
        const btn = document.getElementById("btnTelecharger");
        btn.disabled = false;
        btn.classList.remove("opacity-50", "cursor-not-allowed");
        btn.classList.add("bg-amber-600", "hover:bg-amber-700");

        alert("L'invitation de la famille GBINLO pour " + nomSaisi + " a été générée avec succès ! Vous pouvez la télécharger.");
    });
}

function telechargerImage() {
    if (!imageGenereeBlob) return;
    const link = document.createElement('a');
    link.download = 'invitation-Inspecteur-GBINLO.png';
    link.href = imageGenereeBlob;
    link.click();
}