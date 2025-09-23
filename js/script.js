// Error handling wrapper da se ućutkaju Chrome ekstenzije
window.addEventListener('error', function(e) {
    if (e.message.includes('runtime.lastError')) {
        e.preventDefault();
    }
});

// Funkcija za bezbedno postavljanje teksta
function safeSetText(elementId, text) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerText = text;
    }
}

// Funkcija za učitavanje podataka (za druge stranice, možeš koristiti po potrebi)
function loadData(type) {
    // ostaje tvoj fetch kod...
}

// Sticky meni samo za desktop
function initStickyNav() {
    const nav = document.querySelector('.top-nav');
    if (!nav) return;

    if (window.innerWidth <= 768) {
        return; // nema sticky logike na mobilnom
    }

    let lastScrollY = window.scrollY;

    function updateNav() {
        const currentScrollY = window.scrollY;
        if (currentScrollY < lastScrollY || currentScrollY < 50) {
            nav.classList.add('show');
        } else {
            nav.classList.remove('show');
        }
        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', updateNav);
}

// Soft parallax efekat
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        hero.style.backgroundPosition = `center ${scrollTop * 0.3}px`;
    });
}

// Inicijalizacija aplikacije
function initApp() {
    console.log("Application initialized successfully");
    initStickyNav();
    initParallax();
}

document.addEventListener('DOMContentLoaded', initApp);
