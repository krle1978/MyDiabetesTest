// js/diabetes-predictor-inline.js

// Weights from correlation analysis + Age
const weights = {
    GenHlth: 0.40,
    HighBP: 0.37,
    HighChol: 0.28,
    BMI: 0.29,
    DiffWalk: 0.26,
    HeartDiseaseorAttack: 0.15,
    Age: 0.10 // nova težina za Age
};

// Normalize input
function normalizeInput(feature, value) {
    switch (feature) {
        case "GenHlth": return (value - 1) / 4;
        case "HighBP":
        case "HighChol":
        case "DiffWalk":
        case "HeartDiseaseorAttack":
            return value;
        case "BMI": return Math.min(Math.max((value - 15) / (50 - 15), 0), 1);
        case "Age": return Math.min(Math.max((value - 0) / (120 - 0), 0), 1); // normalize Age 0-120
        default: return 0;
    }
}

// Sigmoid
function sigmoid(z) {
    return 1 / (1 + Math.exp(-z));
}

// Predict diabetes
function predictDiabetesModel(inputs) {
    let z = 0;
    for (const key in weights) {
        const normalized = normalizeInput(key, inputs[key]);
        z += normalized * weights[key];
    }
    const probability = sigmoid(z);
    let riskCategory = "";
    let message = "";

    if (probability < 0.33) {
        riskCategory = "Low Risk ✅";
        message = "Your risk is low. Maintain a healthy diet, exercise regularly, and monitor your weight.";
    } else if (probability < 0.66) {
        riskCategory = "Medium Risk ⚠️";
        message = "Your risk is moderate. Consider improving your diet, increase physical activity, and consult a health professional if necessary.";
    } else {
        riskCategory = "High Risk ❌";
        message = "Your risk is high. Immediate lifestyle changes are recommended: consult a doctor, follow a structured diet and exercise plan.";
    }

    return {
        probability: (probability * 100).toFixed(2),
        riskCategory,
        message
    };
}

// Calculate BMI
function calculateBMI(weightKg, heightCm) {
    const heightM = heightCm / 100;
    return weightKg / (heightM * heightM);
}

// Update BMI display
function updateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const bmiValue = document.getElementById('bmi-value');
    const bmiCategory = document.getElementById('bmi-category');

    if (weight && height) {
        const bmi = calculateBMI(weight, height).toFixed(1);
        bmiValue.textContent = bmi;

        let category = "";
        if (bmi < 18.5) category = " (Underweight)";
        else if (bmi < 25) category = " (Normal)";
        else if (bmi < 30) category = " (Overweight)";
        else category = " (Obese)";
        bmiCategory.textContent = category;
    } else {
        bmiValue.textContent = "-";
        bmiCategory.textContent = "";
    }
}

// Validate Age input
function validateAge() {
    const ageInput = document.getElementById('age');
    const ageError = document.getElementById('age-error');
    const age = parseInt(ageInput.value);
    if (isNaN(age) || age < 0 || age > 120) {
        ageError.textContent = "Please enter a valid age between 0 and 120";
        ageInput.classList.add('input-error');
        return false;
    } else {
        ageError.textContent = "";
        ageInput.classList.remove('input-error');
        return true;
    }
}

// Animate progress bar
function animateProgressBar(bar, width) {
    let w = 0;
    bar.style.width = "0%";
    const id = setInterval(() => {
        if (w >= width) clearInterval(id);
        else {
            w += 1;
            bar.style.width = w + "%";
        }
    }, 10);
}

// Form submission
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("diabetes-prediction-form");
    const resultContainer = document.getElementById("result");
    const resultContent = document.getElementById("result-content");
    const resetBtn = document.getElementById("reset-button");

    // BMI live update
    document.getElementById('weight').addEventListener('input', updateBMI);
    document.getElementById('height').addEventListener('input', updateBMI);

    // Age validation
    document.getElementById('age').addEventListener('input', validateAge);

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!validateAge()) return; // prekid ako Age nije validan

        const data = {
            weight: parseFloat(document.getElementById("weight").value),
            height: parseFloat(document.getElementById("height").value),
            GenHlth: parseInt(document.getElementById("GenHlth").value),
            HighBP: parseInt(document.getElementById("HighBP").value),
            HighChol: parseInt(document.getElementById("HighChol").value),
            DiffWalk: parseInt(document.getElementById("DiffWalk").value),
            HeartDiseaseorAttack: parseInt(document.getElementById("HeartDiseaseorAttack").value),
            Age: parseInt(document.getElementById("age").value)
        };

        const bmi = calculateBMI(data.weight, data.height);
        data.BMI = bmi;

        const prediction = predictDiabetesModel(data);

        // Build result HTML
        resultContent.innerHTML = `
            <div class="probability-bar">
                <div class="probability-fill"></div>
            </div>
            <p><strong>Probability:</strong> ${prediction.probability}%</p>
            <p><strong>Risk Category:</strong> ${prediction.riskCategory}</p>
            <div class="recommendations">
                <h4>Recommendations:</h4>
                <ul>
                    <li>${prediction.message}</li>
                </ul>
            </div>
        `;

        // Animate progress bar
        const bar = resultContent.querySelector('.probability-fill');
        animateProgressBar(bar, prediction.probability);

        // Show recipes card
        const recipesCardHTML = `
            <a href="recipes.html" class="card recipes">
                <img src="pics/icons/recipes.svg" alt="Recipes Icon" class="card-icon">
                <h2>Recipes</h2>
            </a>
            <a href="fitness.html" class="card fitnes">
                <img src="pics/icons/fitness.svg" alt="Fitness Icon" class="card-icon">
                <h2>Fitness Program</h2>
            </a>
        `;
        const recommendationsContainer = resultContent.querySelector('.recommendations');
        recommendationsContainer.insertAdjacentHTML('afterend', recipesCardHTML);

        resultContainer.style.display = "block";
    });

    resetBtn.addEventListener("click", () => {
        form.reset();
        document.getElementById('bmi-value').textContent = "-";
        document.getElementById('bmi-category').textContent = "";
        resultContainer.style.display = "none";
        const existingCard = document.querySelector('.recipes');
        if (existingCard) existingCard.remove();
    });
});
