document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. CHANGER DE THÈME (DARK / LIGHT MODE TOGGLE)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    /* ==========================================================================
       2. GESTION DU MENU MOBILE
       ========================================================================== */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    /* ==========================================================================
       3. COMPTE À REBOURS (Objectif: 29 août 2026 à 11h00)
       ========================================================================== */
    const targetDate = new Date('2026-08-29T11:00:00').getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const timerStatus = document.getElementById('timerStatus');

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            daysEl.textContent = days < 10 ? '0' + days : days;
            hoursEl.textContent = hours < 10 ? '0' + hours : hours;
            minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
            secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
        } else {
            document.getElementById('timerGrid').style.display = 'none';
            timerStatus.innerHTML = '<p style="color:var(--accent-gold); font-size:1.2rem; font-weight:600;"><i class="fa-solid fa-church"></i> Les cérémonies ont lieu aujourd\'hui.</p>';
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    /* ==========================================================================
       4. FORMULAIRE DE CONDOLÉANCES INTERACTIF
       ========================================================================== */
    const condolenceForm = document.getElementById('condolenceForm');
    const messagesList = document.getElementById('messagesList');
    const msgCountEl = document.getElementById('msgCount');

    let currentCount = 3;

    condolenceForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('authorName').value.trim();
        const relation = document.getElementById('authorRelation').value.trim();
        const message = document.getElementById('condolenceMessage').value.trim();

        if (name && message) {
            const newMsg = document.createElement('div');
            newMsg.className = 'message-item';
            
            const today = new Date();
            const formattedDate = today.toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            });

            const relationHTML = relation ? `<p class="author-tag"><i class="fa-solid fa-user-tag"></i> ${escapeHTML(relation)}</p>` : '';

            newMsg.innerHTML = `
                <div class="message-header">
                    <span class="author-name">${escapeHTML(name)}</span>
                    <span class="message-date">${formattedDate}</span>
                </div>
                ${relationHTML}
                <p class="message-content">${escapeHTML(message)}</p>
            `;

            messagesList.insertBefore(newMsg, messagesList.firstChild);

            currentCount++;
            msgCountEl.textContent = currentCount;
            condolenceForm.reset();
            alert('Votre hommage a été publié avec succès.');
        }
    });

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
});