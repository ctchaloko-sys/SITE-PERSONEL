/* ==========================================================
   HOMMAGE GBINLO
   SCRIPT.JS
   Version Premium V5
========================================================== */


/* ==========================================================
   PRELOADER
========================================================== */

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    if(preloader){

        preloader.style.opacity = "0";

        setTimeout(() => {

            preloader.style.display = "none";

        },700);

    }

});


/* ==========================================================
   MODE SOMBRE
========================================================== */

const body = document.body;

const themeIcon = document.getElementById("themeIcon");

const themeText = document.getElementById("themeText");

function toggleDarkMode(){

    body.classList.toggle("dark-mode");

    if(body.classList.contains("dark-mode")){

        localStorage.setItem("theme","dark");

        if(themeIcon) themeIcon.textContent="☀️";

        if(themeText) themeText.textContent="Mode Clair";

    }else{

        localStorage.setItem("theme","light");

        if(themeIcon) themeIcon.textContent="🌙";

        if(themeText) themeText.textContent="Mode Sombre";

    }

}

document.addEventListener("DOMContentLoaded",()=>{

    const savedTheme=localStorage.getItem("theme");

    if(savedTheme==="dark"){

        body.classList.add("dark-mode");

        if(themeIcon) themeIcon.textContent="☀️";

        if(themeText) themeText.textContent="Mode Clair";

    }

});


/* ==========================================================
   COMPTE À REBOURS
========================================================== */

const targetDate = new Date("August 27, 2026 20:00:00").getTime();

const timer = setInterval(() => {

    const now = new Date().getTime();

    const distance = targetDate - now;

    if(distance < 0){

        clearInterval(timer);

        return;

    }

    const days=Math.floor(distance/(1000*60*60*24));

    const hours=Math.floor((distance%(1000*60*60*24))/(1000*60*60));

    const minutes=Math.floor((distance%(1000*60*60))/(1000*60));

    const seconds=Math.floor((distance%(1000*60))/1000);

    document.getElementById("days").textContent=String(days).padStart(2,"0");

    document.getElementById("hours").textContent=String(hours).padStart(2,"0");

    document.getElementById("minutes").textContent=String(minutes).padStart(2,"0");

    document.getElementById("seconds").textContent=String(seconds).padStart(2,"0");

},1000);


/* ==========================================================
   RETOUR EN HAUT
========================================================== */

const scrollBtn=document.getElementById("scrollTop");

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        scrollBtn.style.display="block";

    }else{

        scrollBtn.style.display="none";

    }

});

scrollBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


/* ==========================================================
   APPARITION AU SCROLL
========================================================== */

const observer=new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{

    threshold:.15

});

document.querySelectorAll(".fade-up,.zoom").forEach(el=>{

    observer.observe(el);

});