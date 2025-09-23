// js/diabetes-predictor-csv.js

// ================= BMI =================
function calculateBMI(weightKg, heightCm) {
    const heightM = heightCm / 100;
    return weightKg / (heightM * heightM);
}

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

// ================= Age Validation =================
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

// ================= Progress Bar =================
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

// ================= CSV Parser =================
function parseCSV(data) {
    const rows = data.split("\n").map(r => r.trim()).filter(r => r.length > 0);
    const headers = rows[0].split(",");

    return rows.slice(1).map(row => {
        const values = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        const obj = {};

        headers.forEach((h, i) => {
            let val = values[i] ? values[i].replace(/^"|"$/g, '').trim() : "";

            if (h === "DiabetesRiskPercent" || h === "BMI") {
                obj[h] = parseFloat(val);
            } else {
                // Binarne kolone ostavljamo kao 0/1 iz CSV
                obj[h] = parseInt(val) || 0;
            }
        });

        // 🔄 Preimenovanje "Smoker" u "Smoking"
        if ("Smoker" in obj) {
            obj.Smoking = obj.Smoker;
            delete obj.Smoker;
        }

        return obj;
    });
}

// ================= k-NN Algoritam =================
function findKNearestAverage(data, records, k = 3) {
    if (!records.length) return null;

    const distances = records.map(r => {
        let d = 0;
        d += Math.abs(r.Age - data.Age);
        d += Math.abs(r.BMI - data.BMI);
        d += Math.abs(r.Smoking - data.Smoking) * 0.3;
        d += Math.abs(r.GenHlth - data.GenHlth) * 2;
        d += Math.abs(r.HighBP - data.HighBP) * 1.5;
        d += Math.abs(r.HighChol - data.HighChol) * 1.5;
        d += Math.abs(r.DiffWalk - data.DiffWalk) * 1.5;
        d += Math.abs(r.HeartDiseaseorAttack - data.HeartDiseaseorAttack) * 1.5;
        return { record: r, distance: d };
    });

    distances.sort((a, b) => a.distance - b.distance);
    const nearest = distances.slice(0, k).map(d => d.record);

    const avgProbability = nearest.reduce((sum, r) => sum + r.DiabetesRiskPercent, 0) / nearest.length;
    return { avgProbability, nearest };
}

// ================= Fitness Recommendation (closest match) =================
function findClosestFitnessRecord(user, records) {
    if (!records.length) return null;

    const healthMap = { 1: "Excellent", 2: "Very Good", 3: "Good", 4: "Poor", 5: "Very Poor" };
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

    // Tačno podudaranje
    const exactMatch = records.find(r =>
        r["General Health"] === genHlthVal &&
        r["High Blood Pressure"] === highBPVal &&
        r["High Cholesterol"] === highCholVal &&
        r["Difficulty Walking"] === diffWalkVal &&
        r["Heart Disease"] === heartDiseaseVal &&
        r["Age Group"] === userAgeGroup
    );
    if (exactMatch) return exactMatch;

    // Closest match
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

// ================= MAIN =================
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("diabetes-prediction-form");
    const resultContainer = document.getElementById("result");
    const resultContent = document.getElementById("result-content");
    const resetBtn = document.getElementById("reset-button");

    document.getElementById('weight').addEventListener('input', updateBMI);
    document.getElementById('height').addEventListener('input', updateBMI);
    document.getElementById('age').addEventListener('input', validateAge);

    let csvRecords = [];

    // Helper za mapiranje "Yes"/"No" u 1/0
    const yesNoToBinary = val => val === "Yes" ? 1 : 0;

    // Učitavanje CSV fajla sa Smoking poljem
    fetch("model_tfjs/diabetes_predictions_1.csv")
        .then(response => response.text())
        .then(text => { csvRecords = parseCSV(text); })
        .catch(err => console.error("Error loading CSV:", err));

    // ================= Form Submit =================
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!validateAge()) return;

        const weight = parseFloat(document.getElementById("weight").value);
        const height = parseFloat(document.getElementById("height").value);

        const data = {
            Age: parseInt(document.getElementById("age").value),
            BMI: parseFloat(calculateBMI(weight, height).toFixed(1)),
            Smoking: yesNoToBinary(document.getElementById("Smoking").value),
            GenHlth: parseInt(document.getElementById("GenHlth").value),
            HighBP: yesNoToBinary(document.getElementById("HighBP").value),
            HighChol: yesNoToBinary(document.getElementById("HighChol").value),
            DiffWalk: yesNoToBinary(document.getElementById("DiffWalk").value),
            HeartDiseaseorAttack: yesNoToBinary(document.getElementById("HeartDiseaseorAttack").value)
        };

        // === Predikcija dijabetesa ===
        const match = findKNearestAverage(data, csvRecords, 3);
        const probability = match ? match.avgProbability.toFixed(2) : 0;

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

        // === Prikaz rezultata ===
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

        // === Kartice ===
        const cardsHTML = `
            <div class="cards-row">
                <div class="card exercises">
                    <div class="card-left">
                        <img src="pics/buttons/Fitness.png" class="card-bg">
                    </div>
                    <div class="card-right">
                        <h2>Exercises for You</h2>
                        <div class="exercise-content" id="fitness-recommendation">
                            <p>Loading...</p>
                        </div>
                    </div>
                </div>

                <a href="recipes.html" class="card">
                    <div class="card-left">
                        <img src="pics/buttons/Recipes.png" class="card-bg">
                    </div>
                    <div class="card-right">
                        <h2>Recipes</h2>
                        <p>Practical dietary tips to reduce the risk of diabetes.</p>
                    </div>
                </a>

                <a href="donations.html" class="card">
                    <div class="card-left">
                        <img src="pics/buttons/Donations.png" class="card-bg">
                    </div>
                    <div class="card-right">
                        <h2>Donations</h2>
                        <p>Support our project with small donations that mean a lot to us.</p>
                    </div>
                </a>
            </div>
        `;
        resultContainer.style.display = "block";

        // === Fitness preporuke odmah ===
        try {
            const response = await fetch("model_tfjs/diabetes_fitness_recommendations.csv");
            const csvText = await response.text();
            const rows = csvText.split("\n").map(r => r.trim()).filter(r => r.length > 0);
            const headers = rows[0].split(",");
            const records = rows.slice(1).map(row => {
                const values = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.replace(/^"|"$/g, '').trim());
                const obj = {};
                headers.forEach((h,i)=>obj[h]=values[i]);
                return obj;
            });

            const userData = {
                Age: parseInt(document.getElementById("age").value),
                GenHlth: parseInt(document.getElementById("GenHlth").value),
                HighBP: yesNoToBinary(document.getElementById("HighBP").value),
                HighChol: yesNoToBinary(document.getElementById("HighChol").value),
                DiffWalk: yesNoToBinary(document.getElementById("DiffWalk").value),
                HeartDiseaseorAttack: yesNoToBinary(document.getElementById("HeartDiseaseorAttack").value)
            };

            const matchFitness = findClosestFitnessRecord(userData, records);
            if (matchFitness) {
                const fitnessDiv = document.getElementById("fitness-recommendation");
                fitnessDiv.innerHTML = `<p>${matchFitness["Recommendation"]}</p>`;
            }

        } catch(err) {
            console.error("Error loading fitness recommendations:", err);
        }

        resultContent.querySelector('.recommendations').insertAdjacentHTML('afterend', cardsHTML);

        // Učitavanje fitness preporuke
        await loadFitnessRecommendation();        
        // Glatko skrolovanje do rezultata
        resultContainer.scrollIntoView({ behavior: "smooth", block: "start" });

    });

    // ================= Reset =================
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

    // ================= Fitness card click =================
    document.addEventListener("click", async (e) => {
        const fitnessCard = e.target.closest(".card.fitness");
        if (!fitnessCard) return;
        e.preventDefault();

        try {
            const response = await fetch("model_tfjs/diabetes_fitness_recommendations.csv");
            const csvText = await response.text();
            const rows = csvText.split("\n").map(r => r.trim()).filter(r => r.length > 0);
            const headers = rows[0].split(",");
            const records = rows.slice(1).map(row => {
                const values = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.replace(/^"|"$/g, '').trim());
                const obj = {};
                headers.forEach((h, i) => obj[h] = values[i]);
                return obj;
            });

            const userData = {
                Age: parseInt(document.getElementById("age").value),
                GenHlth: parseInt(document.getElementById("GenHlth").value),
                HighBP: yesNoToBinary(document.getElementById("HighBP").value),
                HighChol: yesNoToBinary(document.getElementById("HighChol").value),
                DiffWalk: yesNoToBinary(document.getElementById("DiffWalk").value),
                HeartDiseaseorAttack: yesNoToBinary(document.getElementById("HeartDiseaseorAttack").value)
            };

            const match = findClosestFitnessRecord(userData, records);
            if (!match) return;

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

    // ================= Hamburger menu =================
    document.querySelector(".top-nav").classList.add("show");
    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector(".menu");
    hamburger.addEventListener("click", () => menu.classList.toggle("open"));
});

// ================= Fitness preporuka =================
async function loadFitnessRecommendation() {
    const fitnessDiv = document.getElementById("fitness-recommendation");
    if (!fitnessDiv) return;

    try {
        // Učitavanje CSV fajla
        const response = await fetch("model_tfjs/diabetes_fitness_recommendations.csv");
        const csvText = await response.text();

        const rows = csvText.split("\n").map(r => r.trim()).filter(r => r.length > 0);
        const headers = rows[0].split(",");
        const records = rows.slice(1).map(row => {
            const values = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
                              .map(v => v.replace(/^"|"$/g, '').trim());
            const obj = {};
            headers.forEach((h,i)=>obj[h]=values[i]);
            return obj;
        });

        // Priprema korisničkih podataka iz forme
        const yesNo = v => v === "Yes" || v === 1 || v === "1" ? "Yes" : "No";
        const healthMap = { 1: "Excellent", 2: "Very Good", 3: "Good", 4: "Poor", 5: "Very Poor" };

        const ageVal = parseInt(document.getElementById("age").value);
        let ageGroup = "";
        if (ageVal >= 18 && ageVal <= 40) ageGroup = "18-40";
        else if (ageVal <= 65) ageGroup = "41-65";
        else ageGroup = "66-90";

        const userData = {
            Age: ageVal,
            GenHlth: healthMap[parseInt(document.getElementById("GenHlth").value)],
            HighBP: yesNo(document.getElementById("HighBP").value),
            HighChol: yesNo(document.getElementById("HighChol").value),
            DiffWalk: yesNo(document.getElementById("DiffWalk").value),
            HeartDiseaseorAttack: yesNo(document.getElementById("HeartDiseaseorAttack").value),
            AgeGroup: ageGroup
        };

        // Pronalaženje tačnog ili najbližeg podudaranja
        const match = records.find(r =>
            r["General Health"] === userData.GenHlth &&
            r["High Blood Pressure"] === userData.HighBP &&
            r["High Cholesterol"] === userData.HighChol &&
            r["Difficulty Walking"] === userData.DiffWalk &&
            r["Heart Disease"] === userData.HeartDiseaseorAttack &&
            r["Age Group"] === userData.AgeGroup
        );

        // Ako nema tačnog, pokušaj closest match (po jednostavnom stepenu poklapanja)
        let finalMatch = match;
        if (!match) {
            let minDiff = Infinity;
            records.forEach(r => {
                let diff = 0;
                if (r["General Health"] !== userData.GenHlth) diff += 1;
                if (r["High Blood Pressure"] !== userData.HighBP) diff += 1;
                if (r["High Cholesterol"] !== userData.HighChol) diff += 1;
                if (r["Difficulty Walking"] !== userData.DiffWalk) diff += 1;
                if (r["Heart Disease"] !== userData.HeartDiseaseorAttack) diff += 1;
                if (r["Age Group"] !== userData.AgeGroup) diff += 1;

                if (diff < minDiff) {
                    minDiff = diff;
                    finalMatch = r;
                }
            });
        }

        // Ispis u div
        if (finalMatch) {
            fitnessDiv.innerHTML = `<p>${finalMatch["Recommendation"]}</p>`;
        } else {
            fitnessDiv.innerHTML = `<p>No recommendation found for your profile.</p>`;
        }

    } catch(err) {
        console.error("Error loading fitness recommendations:", err);
        fitnessDiv.innerHTML = `<p>Error loading recommendations.</p>`;
    }
}
