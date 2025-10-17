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

  if (!isNaN(weight) && !isNaN(height) && height > 0) {
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

// ================= Popunjavanje forme iz URL parametara =================
function populateFromURL() {
  const params = new URLSearchParams(window.location.search);
  const age = params.get("age");
  const bmi = params.get("bmi");
  const Smoking = params.get("Smoking");
  const GenHlth = params.get("GenHlth");
  const HighBP = params.get("HighBP");
  const HighChol = params.get("HighChol");
  const DiffWalk = params.get("DiffWalk");
  const HeartDiseaseorAttack = params.get("HeartDiseaseorAttack");

  if (age !== null) document.getElementById("age").value = age;
  if (Smoking !== null) document.getElementById("Smoking").value = Smoking;
  if (GenHlth !== null) document.getElementById("GenHlth").value = GenHlth;
  if (HighBP !== null) document.getElementById("HighBP").value = HighBP;
  if (HighChol !== null) document.getElementById("HighChol").value = HighChol;
  if (DiffWalk !== null) document.getElementById("DiffWalk").value = DiffWalk;
  if (HeartDiseaseorAttack !== null) document.getElementById("HeartDiseaseorAttack").value = HeartDiseaseorAttack;

  if (bmi !== null) {
    const bmiValue = document.getElementById("bmi-value");
    bmiValue.textContent = parseFloat(bmi).toFixed(1);
  }
}

// ================= MAIN =================
document.addEventListener("DOMContentLoaded", () => {
  populateFromURL();

  const form = document.getElementById("fitness-form");
  const resultContainer = document.getElementById("advice-result");
  const resultContent = document.getElementById("advice-content");
  const resetBtn = document.getElementById("reset-button");

  document.getElementById('weight').addEventListener('input', updateBMI);
  document.getElementById('height').addEventListener('input', updateBMI);
  document.getElementById('age').addEventListener('input', validateAge);

  // ===== Submit Event =====
  form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!validateAge()) return;

  try {
    // ⚠️ koriste novi CSV fajl na engleskom
    const response = await fetch("model_tfjs/diabetes_training_advice_weekly_english.csv");
    if (!response.ok) throw new Error("CSV not found");
    const csvText = await response.text();
    const records = parseCSV(csvText);

    // učitaj vrednosti iz forme
    const age = parseFloat(document.getElementById("age").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);
    let bmi = null;
    if (!isNaN(weight) && !isNaN(height) && height > 0) {
      bmi = parseFloat(calculateBMI(weight, height).toFixed(1));
    } else {
      const bmiText = document.getElementById("bmi-value").textContent;
      bmi = parseFloat(bmiText) || 0;
    }

    const user = {
      Age: age,
      BMI: bmi,
      Smoker: parseFloat(document.getElementById("Smoking").value || 0),
      GenHlth: parseFloat(document.getElementById("GenHlth").value),
      HighBP: parseFloat(document.getElementById("HighBP").value),
      HighChol: parseFloat(document.getElementById("HighChol").value),
      DiffWalk: parseFloat(document.getElementById("DiffWalk").value),
      HeartDiseaseorAttack: parseFloat(document.getElementById("HeartDiseaseorAttack").value)
    };

    // pronađi najbolji zapis
    const best = records.reduce((prev, rec) => {
      let d = 0;
      d += Math.abs((rec.Age || 0) - user.Age);
      d += Math.abs((rec.BMI || 0) - user.BMI);
      d += Math.abs((rec.Smoker || 0) - user.Smoker) * 1.5;
      d += Math.abs((rec.GenHlth || 0) - user.GenHlth);
      d += Math.abs((rec.HighBP || 0) - user.HighBP);
      d += Math.abs((rec.HighChol || 0) - user.HighChol);
      d += Math.abs((rec.DiffWalk || 0) - user.DiffWalk);
      d += Math.abs((rec.HeartDiseaseorAttack || 0) - user.HeartDiseaseorAttack);
      return d < prev.d ? { d, rec } : prev;
    }, { d: Infinity, rec: null });

    if (!best.rec) throw new Error("No matching record found");
    const rec = best.rec;

    // parsiranje TrainingAdvice po "|" i WeeklyPlan po ";"
    const advParts = (rec.TrainingAdvice || "").split("|").map(s => s.trim()).filter(s => s);
    const planParts = (rec.WeeklyPlan || "").split(";").map(s => s.trim()).filter(s => s);

    let adviceHTML = `<h3>Training Advice</h3><ul class="advice-list">`;
    advParts.forEach(item => {
      adviceHTML += `<li>${item}</li>`;
    });
    adviceHTML += `</ul><h3>Weekly Plan</h3><ul class="plan-list">`;
    planParts.forEach(item => {
      adviceHTML += `<li>${item}</li>`;
    });
    adviceHTML += `</ul>`;

    resultContent.innerHTML = adviceHTML;
    resultContainer.style.display = "block";
    resultContainer.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (err) {
    console.error("Error loading advice CSV:", err);
    resultContent.innerHTML = `<p class="error-message">Error loading fitness data.</p>`;
    resultContainer.style.display = "block";
  }
});

  // ===== Reset =====
  resetBtn.addEventListener("click", () => {
    form.reset();
    document.getElementById('bmi-value').textContent = "-";
    document.getElementById('bmi-category').textContent = "";
    resultContainer.style.display = "none";
  });
});
