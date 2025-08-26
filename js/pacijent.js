document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('diabetes-prediction-form');
    if (!form) return;

    // Dodaj malo stila za rezultat i greške
    const style = document.createElement('style');
    style.textContent = `
        .risk-high { color: #ff4444; font-weight: bold; }
        .risk-low { color: #4CAF50; font-weight: bold; }
        .input-error { border-color: red !important; }
    `;
    document.head.appendChild(style);

    // Validacija ulaza
    const getValidatedInput = (id, min = 0, max = Infinity) => {
        const input = document.getElementById(id);
        if (!input) return { valid: false, value: NaN, message: `Field ${id} not found` };

        const value = parseFloat(input.value);
        if (isNaN(value)) return { valid: false, value: NaN, message: `Please enter a valid number for ${id}` };
        if (value < min) return { valid: false, value, message: `${id} must be at least ${min}` };
        if (value > max) return { valid: false, value, message: `${id} cannot exceed ${max}` };

        return { valid: true, value };
    };

    // One-hot kodiranje (počev od _2.0)
    function encodeOneHot(selectedValue, optionsCount) {
        const arr = new Array(optionsCount).fill(0);
        const index = selectedValue - 2; // dummy počinje od 2.0
        if (index >= 0 && index < optionsCount) {
            arr[index] = 1;
        }
        return arr;
    }

    form.addEventListener('submit', function (event) {
    event.preventDefault();

    const resultEl = document.getElementById('result-text');

    if (!window.diabetesModel?.predict) {
        if (resultEl) {
            resultEl.innerHTML = `<span class="risk-high">⏳ Prediction system is initializing, please wait...</span>`;
        }
        return;
    }

    // Validacija obaveznih brojeva
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
        if (resultEl) {
            resultEl.innerHTML = `<span class="risk-high">⚠️ Please fix these errors:</span><br>${errors.join('<br>')}`;
        }
        return;
    }

    // BMI
    const heightM = validations.height.value / 100;
    const bmi = validations.weight.value / (heightM * heightM);

    // Generisanje feature-a
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
        0,0,0,0 // placeholderi
    ];

    console.log("Generated features (" + features.length + "):", features);

    try {
        const prediction = window.diabetesModel.predict(features);
        if (prediction === 1) {
            resultEl.innerHTML = `<span class="risk-high">HIGH RISK of diabetes 🚨</span>
                                  <p>We recommend consulting with your doctor.</p>`;
        } else {
            resultEl.innerHTML = `<span class="risk-low">LOW RISK of diabetes ✅</span>
                                  <p>Continue with healthy habits!</p>`;
        }
    } catch (error) {
        console.error("Prediction failed:", error);
        alert("An error occurred during prediction. Please try again.");
    }
});


    document.getElementById('reset-button')?.addEventListener('click', () => {
        form.reset();
        const resultEl = document.getElementById('result-text');
        if (resultEl) {
            resultEl.innerHTML = "Enter your details to get a prediction.";
        }
    });
});
