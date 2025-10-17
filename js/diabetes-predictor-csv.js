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
  if (!bar) return;
  width = Math.max(0, Math.min(100, parseFloat(width))); // sigurnost 0–100
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
      obj[h] = isNaN(val) ? val : parseFloat(val);
    });
    return obj;
  });
}

// ================= Fitness Recommendation (find closest or top 3) =================
function findClosestFitnessRecord(user, records, k = 3) {
  if (!records.length) return null;

  let distances = records.map(r => {
    let d = 0;
    if (r["Age Group"] && user.AgeGroup && r["Age Group"] !== user.AgeGroup) d += 1;
    if (r["High Blood Pressure"] !== user.HighBP) d += 1;
    if (r["High Cholesterol"] !== user.HighChol) d += 1;
    if (r["Difficulty Walking"] !== user.DiffWalk) d += 1;
    if (r["Heart Disease"] !== user.HeartDiseaseorAttack) d += 1;
    if (r["General Health"] !== user.GenHlth) d += 1;
    return { rec: r, d };
  });

  distances.sort((a, b) => a.d - b.d);
  const nearest = distances.slice(0, k).map(x => x.rec);

  if (!nearest.length) return null;
  if (nearest.length === 1) return nearest[0];

  // spoji preporuke ako ih ima više
  let combined = { Recommendation: nearest.map(n => n.Recommendation).join(" | ") };
  return combined;
}

// ================= MAIN =================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("diabetes-prediction-form");
  const resultContainer = document.getElementById("result");
  const resultContent = document.getElementById("result-content");
  const resetBtn = document.getElementById("reset-button");

  console.log("Form element is:", form);
   if (!form) {
    console.error("Form #diabetes-prediction-form not found!");
    return;
  }
  document.getElementById('weight').addEventListener('input', updateBMI);
  document.getElementById('height').addEventListener('input', updateBMI);
  document.getElementById('age').addEventListener('input', validateAge);

    const scrollableBox = document.querySelector(".exercise-content");
  if (scrollableBox) {
    scrollableBox.addEventListener("click", (e) => {
      e.stopPropagation(); // ✋ blokira klik od bubbling-a ka roditelju <a>
    });
  }

  // ===== Mode Switch =====
  let advancedMode = false;
  const scenarioBtn = document.getElementById("scenario-button");
  scenarioBtn.addEventListener("click", () => {
    advancedMode = !advancedMode;
    scenarioBtn.textContent = advancedMode ? "Simple Prediction" : "Advanced Prediction";
    document.getElementById("simple-fields").style.display = advancedMode ? "none" : "block";
    document.getElementById("advanced-fields").style.display = advancedMode ? "block" : "none";
  });

  // ================= Simple Prediction =================
  async function runSimplePrediction() {
    try {
      const response = await fetch("model_tfjs/diabetes_predictions_1.csv");
      if (!response.ok) throw new Error("CSV not found");
      const csvText = await response.text();
      const records = parseCSV(csvText);

      const weight = parseFloat(document.getElementById("weight").value);
      const height = parseFloat(document.getElementById("height").value);

      const data = {
        Age: parseInt(document.getElementById("age").value),
        BMI: parseFloat(calculateBMI(weight, height).toFixed(1)),
        Smoking: parseInt(document.getElementById("Smoking").value || 0),
        GenHlth: parseInt(document.getElementById("GenHlth").value || 3),
        HighBP: parseInt(document.getElementById("HighBP").value || 0),
        HighChol: parseInt(document.getElementById("HighChol").value || 0),
        DiffWalk: parseInt(document.getElementById("DiffWalk").value || 0),
        HeartDiseaseorAttack: parseInt(document.getElementById("HeartDiseaseorAttack").value || 0)
      };

      let best = records.reduce((prev, r) => {
        let d = Math.abs(r.Age - data.Age) + Math.abs(r.BMI - data.BMI);
        return d < prev.d ? { d, r } : prev;
      }, { d: Infinity, r: null });

      console.log("Best simple match:", best.r);

      return best.r ? parseFloat(best.r.DiabetesRiskPercent) : 0;
    } catch (err) {
      console.error("Error in simple prediction:", err);
      return 0;
    }
  }

  // ================= Advanced Prediction =================
  async function runAdvancedPrediction() {
    console.log("⚡ runAdvancedPrediction started");
    try {
      const response = await fetch("model_tfjs/diabetes_scenario_predictions.csv");
      if (!response.ok) throw new Error("CSV not found");
      const csvText = await response.text();

      const rows = csvText.split("\n").map(r => r.trim()).filter(r => r.length > 0);
      const headers = rows[0].split(",").map(h => h.trim());
      const records = rows.slice(1).map(row => {
        const values = row.split(",").map(v => v.replace(/^"|"$/g, '').trim());
        const obj = {};
        headers.forEach((h, i) => {
          let val = values[i];
          if (["age","bmi","HbA1c_level","blood_glucose_level","diabetes_prob_%"].includes(h)) {
            obj[h] = parseFloat(val);
          } else if (["hypertension","heart_disease"].includes(h)) {
            obj[h] = parseInt(val);
          } else {
            obj[h] = (val || "").toLowerCase();
          }
        });
        return obj;
      });

      if (!records.length) throw new Error("Empty advanced CSV");

      const userData = {
        gender: document.getElementById("gender").value.toLowerCase(),
        age: parseInt(document.getElementById("age").value),
        hypertension: parseInt(document.getElementById("HighBP").value),
        heart_disease: parseInt(document.getElementById("HeartDiseaseorAttack").value),
        smoking_history: document.getElementById("SmokingHistory").value.toLowerCase(),
        bmi: parseFloat(document.getElementById("bmi-value").textContent),
        HbA1c_level: parseFloat(document.getElementById("HbA1c").value),
        blood_glucose_level: parseFloat(document.getElementById("Glucose").value)
      };

      let best = records.reduce((prev, r) => {
        let d = 0;
        d += Math.abs(r.age - userData.age);
        d += Math.abs(r.bmi - userData.bmi);
        d += Math.abs(r.HbA1c_level - userData.HbA1c_level) * 2;
        d += Math.abs(r.blood_glucose_level - userData.blood_glucose_level) * 2;
        if ((r.gender || "").toLowerCase() !== userData.gender) d += 1;
        if ((r.smoking_history || "").toLowerCase() !== userData.smoking_history) d += 1;
        if (parseInt(r.hypertension) !== userData.hypertension) d += 1;
        if (parseInt(r.heart_disease) !== userData.heart_disease) d += 1;
        return d < prev.d ? { d, r } : prev;
      }, { d: Infinity, r: null });

      console.log("Best advanced match:", best.r);

      return best.r && !isNaN(best.r["diabetes_prob_%"])
        ? parseFloat(best.r["diabetes_prob_%"])
        : await runSimplePrediction();
    } catch (err) {
      console.error("Error in advanced prediction, falling back to Simple:", err);
      return await runSimplePrediction();
    }
  }

  // ================= Submit =================
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!validateAge()) return;

  // 📦 Prikupljanje svih podataka van funkcija
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const userData = {
    Age: parseInt(document.getElementById("age").value),
    BMI: parseFloat(calculateBMI(weight, height).toFixed(1)),
    Smoking: parseInt(document.getElementById("Smoking").value || 0),
    GenHlth: parseInt(document.getElementById("GenHlth").value || 3),
    HighBP: parseInt(document.getElementById("HighBP").value || 0),
    HighChol: parseInt(document.getElementById("HighChol").value || 0),
    DiffWalk: parseInt(document.getElementById("DiffWalk").value || 0),
    HeartDiseaseorAttack: parseInt(document.getElementById("HeartDiseaseorAttack").value || 0)
  };

  let probability = 0;
  if (advancedMode) {
    probability = await runAdvancedPrediction();
  } else {
    probability = await runSimplePrediction();
  }

  probability = Math.max(0, Math.min(100, parseFloat(probability)));

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
    <p><strong>${advancedMode ? "Advanced" : "Simple"} Diabetes Probability:</strong> ${probability.toFixed(2)}%</p>
    <p><strong>Risk Category:</strong> ${riskCategory}</p>
    <div class="recommendations">
      <h4>Recommendations:</h4>
      <ul><li>${message}</li></ul>
    </div>
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

          <!-- ✅ ispravljeno: koristi userData -->
          <a href="fitness.html?age=${userData.Age}&weight=${weight}&height=${height}&Smoking=${userData.Smoking}&GenHlth=${userData.GenHlth}&HighBP=${userData.HighBP}&HighChol=${userData.HighChol}&DiffWalk=${userData.DiffWalk}&HeartDiseaseorAttack=${userData.HeartDiseaseorAttack}" class="card-link-btn">More exercises</a>
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

    const bar = resultContent.querySelector(".probability-fill");
    if (bar) animateProgressBar(bar, probability);

    resultContainer.style.display = "block";
    resultContainer.scrollIntoView({ behavior: "smooth", block: "start" });

    // === Učitaj fitness preporuke ===
    try {
      const response = await fetch("model_tfjs/diabetes_fitness_recommendations.csv");
      const csvText = await response.text();
      const rows = csvText.split("\n").map(r => r.trim()).filter(r => r.length > 0);
      const headers = rows[0].split(",").map(h => h.trim());
      const records = rows.slice(1).map(row => {
        const values = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.replace(/^"|"$/g, '').trim());
        const obj = {};
        headers.forEach((h, i) => obj[h] = values[i]);
        return obj;
      });

      const ageVal = parseInt(document.getElementById("age").value);
      let ageGroup = "";
      if (ageVal >= 18 && ageVal <= 40) ageGroup = "18-40";
      else if (ageVal <= 65) ageGroup = "41-65";
      else ageGroup = "66-90";

      const yesNo = v => v === "1" || v === 1 ? "Yes" : "No";
      const healthMap = { 1: "Excellent", 2: "Very Good", 3: "Good", 4: "Poor", 5: "Very Poor" };

      const userData = {
        AgeGroup: ageGroup,
        GenHlth: healthMap[parseInt(document.getElementById("GenHlth")?.value) || 3],
        HighBP: yesNo(document.getElementById("HighBP").value),
        HighChol: yesNo(document.getElementById("HighChol")?.value || 0),
        DiffWalk: yesNo(document.getElementById("DiffWalk")?.value || 0),
        HeartDiseaseorAttack: yesNo(document.getElementById("HeartDiseaseorAttack").value)
      };

      const match = findClosestFitnessRecord(userData, records, 3);
        if (match) {
          const fitnessDiv = document.getElementById("fitness-recommendation");

          // Parsiranje preporuka po ";"
          const parts = match.Recommendation
            .split(";")
            .map(p => p.trim())
            .filter(p => p.length > 0);

          // Prikaz kao lista
          const listHTML = parts.map(item => `<li>${item}</li>`).join("");

          fitnessDiv.innerHTML = `
            <ul class="fitness-list">
              ${listHTML}
            </ul>
          `;
        }

    } catch (err) {
      console.error("Error loading fitness recommendations:", err);
    }
  });

  // ================= Reset =================
  resetBtn.addEventListener("click", () => {
    form.reset();
    document.getElementById('bmi-value').textContent = "-";
    document.getElementById('bmi-category').textContent = "";
    resultContainer.style.display = "none";
  });
});
