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
    try {
        const menu = document.querySelector('.menu');
        if (menu) {
            menu.classList.toggle('open');
        }
    } catch (error) {
        console.error('Greška pri toggle menija:', error);
    }
}

// Inicijalizacija aplikacije
function initApp() {
    console.log("Application initialized successfully");

    //const chartSelect = document.getElementById('chart-select');
    //if (chartSelect) {
    //    updateChart();
    //    chartSelect.addEventListener('change', updateChart);
    //}

    if (document.querySelector('#resultsTable')) {
        loadData('initial');
    }

    const hamburgerButton = document.querySelector('.hamburger');
    if (hamburgerButton) {
        hamburgerButton.addEventListener('click', toggleMenu);
    }
}

// Pokretanje aplikacije kada se stranica učita
document.addEventListener('DOMContentLoaded', initApp);
