// js/diabetes-predictor-csv.js

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

// Parsiranje CSV fajla u brojeve
function parseCSV(data) {
    const rows = data.split("\n").map(r => r.trim()).filter(r => r.length > 0);
    const headers = rows[0].split(",");
    return rows.slice(1).map(row => {
        const values = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        const obj = {};
        headers.forEach((h, i) => {
            let val = values[i] ? values[i].replace(/^"|"$/g, '').trim() : "";
            if (h === "DiabetesRiskPercent" || h === "BMI") obj[h] = parseFloat(val);
            else obj[h] = parseInt(val) || 0;
        });
        return obj;
    });
}

// Funkcija za pronalaženje najbližeg zapisa u CSV-u
function findClosestRecord(data, records) {
    if (!records.length) return null;

    let closest = records[0];
    let minDistance = Infinity;

    records.forEach(r => {
        let distance = 0;
        distance += Math.abs(r.Age - data.Age);
        distance += Math.abs(r.BMI - data.BMI);
        distance += Math.abs(r.GenHlth - data.GenHlth) * 2;
        distance += Math.abs(r.HighBP - data.HighBP) * 1.5;
        distance += Math.abs(r.HighChol - data.HighChol) * 1.5;
        distance += Math.abs(r.DiffWalk - data.DiffWalk) * 1.5;
        distance += Math.abs(r.HeartDiseaseorAttack - data.HeartDiseaseorAttack) * 1.5;

        if (distance < minDistance) {
            minDistance = distance;
            closest = r;
        }
    });

    return closest;
}

// Funkcija za pronalaženje najbliže fitness preporuke
function findClosestFitnessRecord(user, records) {
    if (!records.length) return null;

    const healthMap = {1:"Excellent",2:"Very Good",3:"Good",4:"Poor",5:"Very Poor"};
    const yesNoStr = v => v === 1 ? "Yes" : "No";

    let userAgeGroup = "";
    if (user.Age >= 18 && user.Age <= 40) userAgeGroup = "18-40";
    else if (user.Age <= 65) userAgeGroup = "41-65";
    else userAgeGroup = "66-90";

    const genHlthVal = healthMap[user.GenHlth];
    const highBPVal = yesNoStr(user.HighBP);
    const highCholVal = yesNoStr(user.HighChol);
    const diffWalkVal = yesNoStr(user.DiffWalk);
    const heartDiseaseVal = yesNoStr(user.HeartDiseaseorAttack);

    // 1️⃣ Tačno podudaranje
    const exactMatch = records.find(r =>
        r["General Health"] === genHlthVal &&
        r["High Blood Pressure"] === highBPVal &&
        r["High Cholesterol"] === highCholVal &&
        r["Difficulty Walking"] === diffWalkVal &&
        r["Heart Disease"] === heartDiseaseVal &&
        r["Age Group"] === userAgeGroup
    );

    if (exactMatch) return exactMatch;

    // 2️⃣ Closest match
    let closest = null;
    let minDistance = Infinity;

    records.forEach(r => {
        let distance = 0;
        const recordHealthNum = parseInt(Object.keys(healthMap).find(k => healthMap[k] === r["General Health"])) || 3;

        distance += Math.abs(user.GenHlth - recordHealthNum);
        if ((r["High Blood Pressure"] === "Yes" ? 1 : 0) !== user.HighBP) distance += 1.5;
        if ((r["High Cholesterol"] === "Yes" ? 1 : 0) !== user.HighChol) distance += 1.5;
        if ((r["Difficulty Walking"] === "Yes" ? 1 : 0) !== user.DiffWalk) distance += 1.5;
        if ((r["Heart Disease"] === "Yes" ? 1 : 0) !== user.HeartDiseaseorAttack) distance += 1.5;
        if (r["Age Group"] !== userAgeGroup) distance += 1;

        if (distance < minDistance) {
            minDistance = distance;
            closest = r;
        }
    });

    return closest;
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("diabetes-prediction-form");
    const resultContainer = document.getElementById("result");
    const resultContent = document.getElementById("result-content");
    const resetBtn = document.getElementById("reset-button");

    document.getElementById('weight').addEventListener('input', updateBMI);
    document.getElementById('height').addEventListener('input', updateBMI);
    document.getElementById('age').addEventListener('input', validateAge);

    let csvRecords = [];

    fetch("model_tfjs/diabetes_predictions.csv")
        .then(response => response.text())
        .then(text => { csvRecords = parseCSV(text); })
        .catch(err => console.error("Error loading CSV:", err));

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!validateAge()) return;

        const weight = parseFloat(document.getElementById("weight").value);
        const height = parseFloat(document.getElementById("height").value);
        const data = {
            Age: parseInt(document.getElementById("age").value),
            GenHlth: parseInt(document.getElementById("GenHlth").value),
            HighBP: parseInt(document.getElementById("HighBP").value),
            HighChol: parseInt(document.getElementById("HighChol").value),
            DiffWalk: parseInt(document.getElementById("DiffWalk").value),
            HeartDiseaseorAttack: parseInt(document.getElementById("HeartDiseaseorAttack").value)
        };
        data.BMI = parseFloat(calculateBMI(weight, height).toFixed(1));

        const match = findClosestRecord(data, csvRecords);
        const probability = match ? match.DiabetesRiskPercent.toFixed(2) : 0;

        let riskCategory = "";
        let message = "";
        if (probability < 33) {
            riskCategory = "Low Risk ✅";
            message = "Your risk is low. Maintain a healthy diet, exercise regularly, and monitor your weight.";
        } else if (probability < 66) {
            riskCategory = "Medium Risk ⚠️";
            message = "Your risk is moderate. Consider improving your diet, increase physical activity, and consult a health professional if necessary.";
        } else {
            riskCategory = "High Risk ❌";
            message = "Your risk is high. Immediate lifestyle changes are recommended: consult a doctor, follow a structured diet and exercise plan.";
        }

        resultContent.innerHTML = `
            <div class="probability-bar">
                <div class="probability-fill"></div>
            </div>
            <p><strong>Probability:</strong> ${probability}%</p>
            <p><strong>Risk Category:</strong> ${riskCategory}</p>
            <div class="recommendations">
                <h4>Recommendations:</h4>
                <ul><li>${message}</li></ul>
            </div>
        `;

        animateProgressBar(resultContent.querySelector('.probability-fill'), probability);

        const cardsHTML = `
            <div class="cards-row">
                <a href="recipes.html" class="card">
                    <img src="pics/buttons/Recipes.png" class="card-bg">
                    <div class="card-overlay">
                        <img src="pics/icons/recipes.svg" class="card-icon">
                        <h2>Recipes</h2>
                    </div>
                </a>
                <a href="#" class="card fitness">
                    <img src="pics/buttons/Fitness.png" class="card-bg">
                    <div class="card-overlay">
                        <img src="pics/icons/fitness.svg" class="card-icon">
                        <h2>Exercises for you</h2>
                    </div>
                </a>
                <a href="donations.html" class="card">
                    <img src="pics/buttons/Donations.png" class="card-bg">
                    <div class="card-overlay">
                        <img src="pics/icons/donations.svg" class="card-icon">
                        <h2>Donations</h2>
                    </div>
                </a>
            </div>
        `;
        resultContent.querySelector('.recommendations').insertAdjacentHTML('afterend', cardsHTML);
        resultContainer.style.display = "block";
    });

    resetBtn.addEventListener("click", () => {
        form.reset();
        document.getElementById('bmi-value').textContent = "-";
        document.getElementById('bmi-category').textContent = "";
        resultContainer.style.display = "none";
        const existingCard = document.querySelector('.cards-row');
        if (existingCard) existingCard.remove();
        const fitnessDiv = document.getElementById("fitness-recommendation");
        if (fitnessDiv) fitnessDiv.remove();
    });

    document.addEventListener("click", async (e) => {
    const fitnessCard = e.target.closest(".card.fitness");
    if (!fitnessCard) return;
    e.preventDefault();

    try {
        // Učitavanje CSV fajla
        const response = await fetch("model_tfjs/diabetes_fitness_recommendations.csv");
        const csvText = await response.text();
        const rows = csvText.split("\n").map(r => r.trim()).filter(r => r.length > 0);
        const headers = rows[0].split(",");
        const records = rows.slice(1).map(row => {
            const values = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.replace(/^"|"$/g,'').trim());
            const obj = {};
            headers.forEach((h,i) => obj[h] = values[i]);
            return obj;
        });

        // Priprema korisničkih vrednosti
        const userData = {
            Age: parseInt(document.getElementById("age").value),
            GenHlth: parseInt(document.getElementById("GenHlth").value),
            HighBP: parseInt(document.getElementById("HighBP").value),
            HighChol: parseInt(document.getElementById("HighChol").value),
            DiffWalk: parseInt(document.getElementById("DiffWalk").value),
            HeartDiseaseorAttack: parseInt(document.getElementById("HeartDiseaseorAttack").value)
        };

        // Mapiranje u string vrednosti za CSV
        const healthMap = {1:"Excellent",2:"Very Good",3:"Good",4:"Poor",5:"Very Poor"};
        const yesNo = v => v === 1 ? "Yes" : "No";

        const userAgeGroup = userData.Age <= 40 ? "18-40" : (userData.Age <= 65 ? "41-65" : "66-90");

        const userRecord = {
            "General Health": healthMap[userData.GenHlth],
            "High Blood Pressure": yesNo(userData.HighBP),
            "High Cholesterol": yesNo(userData.HighChol),
            "Difficulty Walking": yesNo(userData.DiffWalk),
            "Heart Disease": yesNo(userData.HeartDiseaseorAttack),
            "Age Group": userAgeGroup
        };

        // Pronalaženje tačnog ili najbližeg podudaranja
        let match = records.find(r =>
            r["General Health"] === userRecord["General Health"] &&
            r["High Blood Pressure"] === userRecord["High Blood Pressure"] &&
            r["High Cholesterol"] === userRecord["High Cholesterol"] &&
            r["Difficulty Walking"] === userRecord["Difficulty Walking"] &&
            r["Heart Disease"] === userRecord["Heart Disease"] &&
            r["Age Group"] === userRecord["Age Group"]
        );

        // Ako nema tačnog, uzimamo prvi closest (može se dodatno poboljšati)
        if (!match) match = records[0];

        // Kreiranje/fresh prikaza
        let fitnessDiv = document.getElementById("fitness-recommendation");
        if (!fitnessDiv) {
            fitnessDiv = document.createElement("div");
            fitnessDiv.id = "fitness-recommendation";
            fitnessDiv.classList.add("recommendations");
            document.getElementById("result-content").appendChild(fitnessDiv);
        }

        fitnessDiv.innerHTML = `
            <h4>Recommended Exercises for You:</h4>
            <p>${match["Recommendation"]}</p>
        `;

    } catch (err) {
        console.error("Error loading fitness recommendations:", err);
    }
});

    document.querySelector(".top-nav").classList.add("show");
    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector(".menu");
    hamburger.addEventListener("click", () => menu.classList.toggle("open"));
});
