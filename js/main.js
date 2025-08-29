// =================== app.js ===================

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// =================== APP NAMESPACE ===================
const App = (() => {

    // ------------------- ELEMENT SELECTORS -------------------
    const elements = {
        resultText: document.getElementById('result-text'),
        resultsTableBody: document.querySelector('#resultsTable tbody'),
        chartContainer: document.getElementById('chart-container'),
        chartSelect: document.getElementById('chart-select'),
        hamburger: document.querySelector('.hamburger'),
        form: document.getElementById('diabetes-prediction-form'),
        resetBtn: document.getElementById('resetBtn')
    };

    // ------------------- DATA MODULE -------------------
    const DataModule = (() => {
        async function loadData(type = 'initial') {
            try {
                const res = await fetch(`${type}_data.json`);
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const data = await res.json();
                UI.updateSummary(data);
                UI.populateTable(data.data || []);
            } catch (err) {
                console.error('Greška pri učitavanju podataka:', err);
                UI.setResultText('Greška pri učitavanju podataka');
            }
        }

        return { loadData };
    })();

    // ------------------- UI MODULE -------------------
    const UI = (() => {
        function setResultText(text, className = '') {
            if (elements.resultText) {
                elements.resultText.innerHTML = `<span class="${className}">${text}</span>`;
            }
        }

        function updateSummary(data) {
            safeSetText('youngest', `Najmlađa osoba obolela od dijabetesa: Age ${data.youngest_diabetic?.Age || 'N/A'}, BMI ${data.youngest_diabetic?.BMI || 'N/A'}`);
            safeSetText('oldest', `Najstarija osoba obolela od dijabetesa: Age ${data.oldest_diabetic?.Age || 'N/A'}, BMI ${data.oldest_diabetic?.BMI || 'N/A'}`);
            safeSetText('highest_bmi', `Osoba sa najvećim BMI: BMI ${data.highest_bmi?.BMI || 'N/A'}, Age ${data.highest_bmi?.Age || 'N/A'}`);
        }

        function populateTable(dataArray) {
            if (!elements.resultsTableBody) return;
            elements.resultsTableBody.innerHTML = '';
            dataArray.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.BMI || 'N/A'}</td>
                    <td>${row.Glucose || 'N/A'}</td>
                    <td>${row.Age || 'N/A'}</td>
                    <td>${row.Insulin || 'N/A'}</td>
                    <td>${row.Probability || 'N/A'}</td>
                `;
                elements.resultsTableBody.appendChild(tr);
            });
        }

        function renderCharts(type) {
            if (!elements.chartContainer) return;
            elements.chartContainer.innerHTML = '';

            const extremeProfiles = [
                { title: "Young Woman with Diabetes", img: "pics/Najmlađa osoba Mlada žena s dijabetesom.png", text: `Gender: Female\nAge: 18\nBMI: 22\nOther Health Stats: Normal` },
                { title: "Oldest Man with Diabetes", img: "pics/Najstarija osoba Starac s dijabetesom.png", text: `Gender: Male\nAge: 88\nBMI: 27\nOther Health Stats: Hypertension` }
            ];

            if (type === 'extreme') {
                extremeProfiles.forEach(profile => {
                    const div = document.createElement('div');
                    div.style.marginBottom = '20px';
                    div.innerHTML = `
                        <h3>${profile.title}</h3>
                        <img src="${profile.img}" alt="${profile.title}" style="max-width:100%; display:block;"/>
                        <pre style="text-align:left; margin-left:10px;">${profile.text}</pre>
                    `;
                    elements.chartContainer.appendChild(div);
                });
            } else {
                const img = document.createElement('img');
                img.src = `charts/${type}.png`;
                img.alt = `Chart ${type}`;
                img.style.maxWidth = '100%';
                elements.chartContainer.appendChild(img);
            }
        }

        function toggleMenu() {
            if (elements.hamburger) {
                const menu = document.querySelector('.menu');
                if (menu) menu.classList.toggle('open');
            }
        }

        return { setResultText, updateSummary, populateTable, renderCharts, toggleMenu };
    })();

    // ------------------- FORM MODULE -------------------
    const FormModule = (() => {

        function getValidatedInput(id, min = 0, max = Infinity) {
            const input = document.getElementById(id);
            if (!input) return { valid: false, value: NaN, message: `Field ${id} not found` };

            const value = parseFloat(input.value);
            if (isNaN(value)) return { valid: false, value: NaN, message: `Please enter a valid number for ${id}` };
            if (value < min) return { valid: false, value, message: `${id} must be at least ${min}` };
            if (value > max) return { valid: false, value, message: `${id} cannot exceed ${max}` };

            return { valid: true, value };
        }

        function encodeOneHot(selectedValue, optionsCount) {
            const arr = new Array(optionsCount).fill(0);
            const index = selectedValue - 2; // dummy počinje od 2.0
            if (index >= 0 && index < optionsCount) arr[index] = 1;
            return arr;
        }

        function handleSubmit(event) {
            event.preventDefault();

            if (!window.diabetesModel?.predict) {
                UI.setResultText('⏳ Prediction system is initializing, please wait...', 'risk-high');
                return;
            }

            const validations = {
                weight: getValidatedInput('weight', 20, 300),
                height: getValidatedInput('height', 50, 250),
                mentHlth: getValidatedInput('mentHlth', 0, 30),
                physHlth: getValidatedInput('physHlth', 0, 30),
                age: getValidatedInput('age', 1, 13),
                education: getValidatedInput('education', 1, 6),
                income: getValidatedInput('income', 1, 8)
            };

            const errors = Object.entries(validations)
                .filter(([_, val]) => !val.valid)
                .map(([_, val]) => val.message);

            if (errors.length > 0) {
                UI.setResultText(`⚠️ Fix errors:<br>${errors.join('<br>')}`, 'risk-high');
                return;
            }

            const heightM = validations.height.value / 100;
            const bmi = validations.weight.value / (heightM * heightM);

            const features = [
                parseInt(document.getElementById('highBP').value),
                parseInt(document.getElementById('highChol').value),
                parseInt(document.getElementById('cholCheck').value),
                bmi,
                parseInt(document.getElementById('smoker').value),
                parseInt(document.getElementById('stroke').value),
                parseInt(document.getElementById('heartDisease').value),
                parseInt(document.getElementById('physActivity').value),
                parseInt(document.getElementById('fruits').value),
                parseInt(document.getElementById('veggies').value),
                parseInt(document.getElementById('hvyAlcohol').value),
                parseInt(document.getElementById('anyHealthcare').value),
                parseInt(document.getElementById('noDocCost').value),
                parseInt(document.getElementById('genHlth').value),
                validations.mentHlth.value,
                validations.physHlth.value,
                parseInt(document.getElementById('diffWalk').value),
                parseInt(document.getElementById('sex').value),
                ...encodeOneHot(validations.age.value, 12),
                ...encodeOneHot(validations.education.value, 5),
                ...encodeOneHot(validations.income.value, 7),
                0,0,0,0
            ];

            const prediction = window.diabetesModel.predict(features);
            const riskClass = prediction === 1 ? 'risk-high' : 'risk-low';
            const riskText = prediction === 1 ? 'HIGH RISK of Diabetes' : 'LOW RISK of Diabetes';

            UI.setResultText(`${riskText} (BMI: ${bmi.toFixed(1)})`, riskClass);
        }

        function initForm() {
            if (elements.form) elements.form.addEventListener('submit', handleSubmit);
            if (elements.resetBtn) elements.resetBtn.addEventListener('click', () => elements.form?.reset());
        }

        return { initForm };
    })();

    // ------------------- SAFE TEXT -------------------
    function safeSetText(id, text) {
        const el = document.getElementById(id);
        if (el) el.innerText = text;
    }

    // ------------------- INIT APP -------------------
    function init() {
        console.log('App initialized successfully');
        DataModule.loadData();
        FormModule.initForm();
        if (elements.chartSelect) {
            UI.renderCharts(elements.chartSelect.value);
            elements.chartSelect.addEventListener('change', () => UI.renderCharts(elements.chartSelect.value));
        }
        if (elements.hamburger) elements.hamburger.addEventListener('click', UI.toggleMenu);
    }

    return { init };
})();
