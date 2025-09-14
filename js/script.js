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
    } else {
        console.warn(`Element sa ID '${elementId}' nije pronađen`);
    }
}

// Funkcija za učitavanje podataka i ažuriranje informacija
function loadData(type) {
    fetch(`${type}_data.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            try {
                safeSetText('youngest', 
                    `Najmlađa osoba obolela od dijabetesa: Age ${data.youngest_diabetic?.Age || 'N/A'}, BMI ${data.youngest_diabetic?.BMI || 'N/A'}`);
                
                safeSetText('oldest', 
                    `Najstarija osoba obolela od dijabetesa: Age ${data.oldest_diabetic?.Age || 'N/A'}, BMI ${data.oldest_diabetic?.BMI || 'N/A'}`);
                
                safeSetText('highest_bmi', 
                    `Osoba sa najvećim BMI: BMI ${data.highest_bmi?.BMI || 'N/A'}, Age ${data.highest_bmi?.Age || 'N/A'}`);
                
                safeSetText('highest_glucose', 
                    `Osoba sa najvećim nivoom glukoze: Glucose ${data.highest_glucose?.Glucose || 'N/A'}, Age ${data.highest_glucose?.Age || 'N/A'}`);
                
                safeSetText('highest_insulin', 
                    `Osoba sa najvećim nivoom insulina: Insulin ${data.highest_insulin?.Insulin || 'N/A'}, Age ${data.highest_insulin?.Age || 'N/A'}`);

                // Popuni tabelu
                const tableBody = document.querySelector('#resultsTable tbody');
                if (tableBody && Array.isArray(data.data)) {
                    tableBody.innerHTML = '';
                    data.data.forEach(row => {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `
                            <td>${row.BMI || 'N/A'}</td>
                            <td>${row.Glucose || 'N/A'}</td>
                            <td>${row.Age || 'N/A'}</td>
                            <td>${row.Insulin ? row.Insulin : 'N/A'}</td>
                            <td>${row.Probability || 'N/A'}</td>
                        `;
                        tableBody.appendChild(tr);
                    });
                }
            } catch (error) {
                console.error('Greška pri obradi podataka:', error);
            }
        })
        .catch(error => {
            console.error('Greška pri učitavanju podataka:', error);
            safeSetText('youngest', 'Greška pri učitavanju podataka');
        });
}

// Funkcija za ažuriranje grafikona
function updateChart() {
    try {
        const chartSelect = document.getElementById('chart-select');
        const chartImage = document.getElementById('chart-image');
        
        if (chartSelect && chartImage) {
            const selectedChart = chartSelect.value;
            chartImage.src = `charts/${selectedChart}`;
            chartImage.alt = `Chart: ${selectedChart}`;
        }
    } catch (error) {
        console.error('Greška pri ažuriranju grafika:', error);
    }
}

// Hamburger meni
function toggleMenu() {
    const menu = document.querySelector('.menu_mobile');
    if (menu) {
        menu.classList.toggle('open');
    }
}

// Inicijalizacija aplikacije
function initApp() {
    console.log("Application initialized successfully");

    if (document.querySelector('#resultsTable')) {
        loadData('initial');
    }

    // Hamburger dugme
    const hamburgerButton = document.querySelector('.hamburger');
    if (hamburgerButton) {
        hamburgerButton.addEventListener('click', toggleMenu);
    }

    // Sticky top-nav i ostale funkcije
    initStickyNav();
    initParallax();
    initLanguageToggle();

    // Inicijalizacija grafikona ako postoji select
    const chartSelect = document.getElementById('chart-select');
    if (chartSelect) {
        chartSelect.addEventListener('change', updateChart);
        // Inicijalno učitavanje grafikona
        updateChart();
    }
}

// Sticky meni: pojavi se na hover vrha ili scroll-up (SAMO ZA DESKTOP)
function initStickyNav() {
    const nav = document.querySelector('.top-nav');
    if (!nav) return;

    let lastScrollY = window.scrollY;

    function updateNav() {
        if (window.innerWidth <= 768) return; // deaktivirano na mobilnim uređajima

        const currentScrollY = window.scrollY;
        if (currentScrollY < lastScrollY || currentScrollY < 50) {
            nav.classList.add('show');
        } else {
            nav.classList.remove('show');
        }
        lastScrollY = currentScrollY;
    }

    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth <= 768) return;
        if (e.clientY < 50) nav.classList.add('show');
    });

    document.addEventListener('mouseleave', (e) => {
        if (window.innerWidth <= 768) return;
        if (e.clientY < 10) nav.classList.remove('show');
    });

    window.addEventListener('scroll', updateNav);
}

// Soft parallax efekat za hero pozadinu
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        hero.style.backgroundPosition = `center ${scrollTop * 0.3}px`;
    });
}

// Jezički toggle (EN/SR)
function initLanguageToggle() {
    const languageIcon = document.querySelector('.language-icon');
    if (!languageIcon) return;

    languageIcon.addEventListener('click', toggleLanguage);
}

function toggleLanguage() {
    const title = document.querySelector("h1");
    if (!title) return;

    if (title.innerText.includes("Diabetes") || title.innerText.includes("Recepti")) {
        // Srpski
        if (title.innerText.includes("Diabetes")) title.innerText = "AI i Prevencija Dijabetesa";
        if (title.innerText.includes("Recepti")) title.innerText = "🍽️ Recepti za Dijabetes";
        const heroP = document.querySelector('.hero p');
        if (heroP) heroP.innerText = "Veštačka inteligencija pomaže u otkrivanju faktora rizika, poboljšanju životnih navika i prevenciji dijabetesa pre nego što počne.";
        const btn = document.querySelector('.btn-primary');
        if (btn) btn.innerText = "Proveri Moj Rizik";
    } else {
        // Engleski
        if (title.innerText.includes("AI i Prevencija Dijabetesa")) title.innerText = "AI & Diabetes Prevention";
        if (title.innerText.includes("🍽️ Recepti za Dijabetes")) title.innerText = "🍽️ Recipes for Diabetes";
        const heroP = document.querySelector('.hero p');
        if (heroP) heroP.innerText = "Artificial intelligence helps detect risk factors, improve lifestyle choices and prevent diabetes before it starts.";
        const btn = document.querySelector('.btn-primary');
        if (btn) btn.innerText = "Predict My Diabetes";
    }
}

// Pokretanje aplikacije kada se stranica učita
document.addEventListener('DOMContentLoaded', initApp);
