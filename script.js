// ==========================================
// 1. GESTION DU COMPTE À REBOURS
// ==========================================
const targetDate = new Date("August 27, 2026 20:00:00").getTime();

const countdownInterval = setInterval(function() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Calcul du temps restant
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Affichage dans le HTML
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (daysEl) daysEl.innerText = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.innerText = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.innerText = String(seconds).padStart(2, '0');

    // Si le compte à rebours est terminé
    if (distance < 0) {
        clearInterval(countdownInterval);
        const countdownContainer = document.querySelector("#programme .grid-cols-4");
        if (countdownContainer) {
            countdownContainer.innerHTML = "<p class='col-span-4 text-amber-400 font-serif-elegant text-lg uppercase tracking-wider'>Les obsèques ont commencé</p>";
        }
    }
}, 1000);

// ==========================================
// 2. GESTION DU DARK MODE (MODE SOMBRE)
// ==========================================
function toggleDarkMode() {
    const html = document.documentElement;
    const themeIcon = document.getElementById("themeIcon");
    const themeText = document.getElementById("themeText");

    if (html.classList.contains("dark")) {
        html.classList.remove("dark");
        localStorage.setItem("theme", "light");
        if (themeIcon) themeIcon.innerText = "🌙";
        if (themeText) themeText.innerText = "Mode Sombre";
    } else {
        html.classList.add("dark");
        localStorage.setItem("theme", "dark");
        if (themeIcon) themeIcon.innerText = "☀️";
        if (themeText) themeText.innerText = "Mode Clair";
    }
}

// Appliquer le thème sauvegardé au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    const html = document.documentElement;
    const themeIcon = document.getElementById("themeIcon");
    const themeText = document.getElementById("themeText");

    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        html.classList.add("dark");
        if (themeIcon) themeIcon.innerText = "☀️";
        if (themeText) themeText.innerText = "Mode Clair";
    } else {
        html.classList.remove("dark");
        if (themeIcon) themeIcon.innerText = "🌙";
        if (themeText) themeText.innerText = "Mode Sombre";
    }
});