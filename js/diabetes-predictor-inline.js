// js/diabetes-predictor-inline.js

// Težine za predikciju (uključuje i Age)
const weights = {
    GenHlth: 0.40,
    HighBP: 0.37,
    HighChol: 0.28,
    BMI: 0.29,
    DiffWalk: 0.26,
    HeartDiseaseorAttack: 0.15,
    Age: 0.10
};

// Normalizacija ulaza
function normalizeInput(feature, value) {
    switch (feature) {
        case "GenHlth": return (value - 1) / 4;
        case "HighBP":
        case "HighChol":
        case "DiffWalk":
        case "HeartDiseaseorAttack":
            return value;
        case "BMI": return Math.min(Math.max((value - 15) / (50 - 15), 0), 1);
        case "Age": return Math.min(Math.max((value - 0) / (120 - 0), 0), 1);
        default: return 0;
    }
}

// Sigmoid funkcija
function sigmoid(z) {
    return 1 / (1 + Math.exp(-z));
}

// Predikcija dijabetesa
function predictDiabetesModel(inputs) {
    let z = 0;
    for (const key in weights) {
        z += normalizeInput(key, inputs[key]) * weights[key];
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

// Izračunavanje BMI
function calculateBMI(weightKg, heightCm) {
    const heightM = heightCm / 100;
    return weightKg / (heightM * heightM);
}

// Update BMI prikaza
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

// Validacija Age inputa
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

// Animacija progress bara
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

// Parsiranje CSV fajla
function parseCSV(data) {
    const rows = data.split("\n").map(r => r.trim()).filter(r => r.length > 0);
    const headers = rows[0].split(",");
    return rows.slice(1).map(row => {
        const values = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        return headers.reduce((obj, h, i) => {
            obj[h.trim()] = values[i] ? values[i].replace(/^"|"$/g, '').trim() : "";
            return obj;
        }, {});
    });
}

// DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("diabetes-prediction-form");
    const resultContainer = document.getElementById("result");
    const resultContent = document.getElementById("result-content");
    const resetBtn = document.getElementById("reset-button");

    // Live update BMI
    document.getElementById('weight').addEventListener('input', updateBMI);
    document.getElementById('height').addEventListener('input', updateBMI);

    // Age validacija
    document.getElementById('age').addEventListener('input', validateAge);

    // Submit forme
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!validateAge()) return;

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
        data.BMI = calculateBMI(data.weight, data.height);

        const prediction = predictDiabetesModel(data);

        // Rezultat HTML
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

        const bar = resultContent.querySelector('.probability-fill');
        animateProgressBar(bar, prediction.probability);

        // Cards row
        const cardsHTML = `
            <div class="cards-row">
                <a href="recipes.html" class="card">
                    <img src="pics/buttons/Recipes.png" alt="Recipes Background" class="card-bg">
                    <div class="card-overlay">
                        <img src="pics/icons/recipes.svg" alt="Recipes Icon" class="card-icon">
                        <h2>Recipes</h2>
                    </div>
                </a>

                <a href="#" class="card fitness">
                    <img src="pics/buttons/Fitness.png" alt="Fitness Background" class="card-bg">
                    <div class="card-overlay">
                        <img src="pics/icons/fitness.svg" alt="Fitness Icon" class="card-icon">
                        <h2>Exercises for you</h2>
                    </div>
                </a>

                <a href="donations.html" class="card">
                    <img src="pics/buttons/Donations.png" alt="Donations Background" class="card-bg">
                    <div class="card-overlay">
                        <img src="pics/icons/donations.svg" alt="Donations Icon" class="card-icon">
                        <h2>Donations</h2>
                    </div>
                </a>
            </div>
        `;
        const recommendationsContainer = resultContent.querySelector('.recommendations');
        recommendationsContainer.insertAdjacentHTML('afterend', cardsHTML);

        resultContainer.style.display = "block";
    });

    // Reset dugme
    resetBtn.addEventListener("click", () => {
        form.reset();
        document.getElementById('bmi-value').textContent = "-";
        document.getElementById('bmi-category').textContent = "";
        resultContainer.style.display = "none";
        const existingCard = document.querySelector('.cards-row');
        if (existingCard) existingCard.remove();
    });

    // Fitness preporuke
    document.addEventListener("click", async (e) => {
        const fitnessCard = e.target.closest(".card.fitness");
        if (!fitnessCard) return;
        e.preventDefault();

        try {
            const response = await fetch("model_tfjs/diabetes_fitness_recommendations.csv");
            const csvText = await response.text();
            const records = parseCSV(csvText);

            const genHlthVal = document.getElementById("GenHlth").selectedOptions[0].text;
            const highBPVal = document.getElementById("HighBP").value === "1" ? "Yes" : "No";
            const highCholVal = document.getElementById("HighChol").value === "1" ? "Yes" : "No";
            const diffWalkVal = document.getElementById("DiffWalk").value === "1" ? "Yes" : "No";
            const heartDiseaseVal = document.getElementById("HeartDiseaseorAttack").value === "1" ? "Yes" : "No";

            const age = parseInt(document.getElementById("age").value);
            let ageGroup = "";
            if (age >= 18 && age <= 40) ageGroup = "18-40";
            else if (age <= 65) ageGroup = "41-65";
            else ageGroup = "66-90";

            const match = records.find(r =>
                r["General Health"] === genHlthVal &&
                r["High Blood Pressure"] === highBPVal &&
                r["High Cholesterol"] === highCholVal &&
                r["Difficulty Walking"] === diffWalkVal &&
                r["Heart Disease"] === heartDiseaseVal &&
                r["Age Group"] === ageGroup
            );

            let fitnessDiv = document.getElementById("fitness-recommendation");
            if (!fitnessDiv) {
                fitnessDiv = document.createElement("div");
                fitnessDiv.id = "fitness-recommendation";
                resultContent.appendChild(fitnessDiv);
            }

            if (match) {
                fitnessDiv.innerHTML = `
                    <div class="recommendations">
                        <h4>Recommended Exercises for You:</h4>
                        <p>${match["Recommendation"]}</p>
                    </div>
                `;
            } else {
                fitnessDiv.innerHTML = `<p>No exact match found for your profile.</p>`;
            }
        } catch (err) {
            console.error("Error loading fitness recommendations:", err);
        }
    });

    // Show nav bar
    document.querySelector(".top-nav").classList.add("show");

    // Hamburger toggle
    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector(".menu");
    hamburger.addEventListener("click", () => {
        menu.classList.toggle("open");
    });
});
