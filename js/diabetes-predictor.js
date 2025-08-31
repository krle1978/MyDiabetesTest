// diabetes-predictor.js

let model = null;
let scaler = null;

// --- Inicijalizacija modela i skalera sa fallback za InputLayer ---
async function initModel() {
  const statusText = document.getElementById("status-text");
  const statusLoader = document.getElementById("status-loader");

  const loaderSymbols = ["⏳","⌛","🔄"];
  let loaderIndex = 0;
  let loaderInterval = null;

  const startLoader = () => {
    loaderInterval = setInterval(() => {
      statusLoader.textContent = loaderSymbols[loaderIndex % loaderSymbols.length];
      loaderIndex++;
    }, 300);
  };
  const stopLoader = () => {
    clearInterval(loaderInterval);
    statusLoader.textContent = "";
  };
  const updateStatus = (modelLoaded, scalerLoaded, message="") => {
    const modelSymbol = modelLoaded ? "✅" : "❌";
    const scalerSymbol = scalerLoaded ? "✅" : "❌";
    statusText.textContent = `Model: ${modelSymbol} | Scaler: ${scalerSymbol}`;
    statusText.style.color = modelLoaded && scalerLoaded ? "green" : "red";
    statusText.title = message;
  };

  startLoader();
  updateStatus(false, false, "Učitavanje u toku...");

  try {
    // --- Pokušaj direktnog učitavanja modela ---
    try {
      model = await tf.loadLayersModel("./model_tfjs/model.json");
      console.log("✅ Model uspešno učitan direktno!");
    } catch (err) {
      console.warn("⚠️ Problem sa InputLayer, kreiram fallback model:", err);

      // --- Fallback model ---
      model = tf.sequential();
      const nFeatures = 7; // Broj inputa

      model.add(tf.layers.dense({ units: 32, activation: 'relu', inputShape: [nFeatures] }));
      model.add(tf.layers.batchNormalization());
      model.add(tf.layers.dropout({ rate: 0.3 }));
      model.add(tf.layers.dense({ units: 16, activation: 'relu' }));
      model.add(tf.layers.dropout({ rate: 0.2 }));
      model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

      // Učitaj težine
      await model.loadWeights("./model_tfjs/group1-shard1of1.bin");
      console.log("✅ Fallback model kreiran i težine učitane!");
    }

    updateStatus(true, false, "Model učitan, scaler još nije učitan.");

    // --- Učitaj scaler ---
    const scalerResponse = await fetch("./model_tfjs/scaler.json");
    scaler = await scalerResponse.json();
    console.log("✅ Scaler učitan:", scaler);
    updateStatus(true, true, "Model i scaler uspešno učitani!");

  } catch (err) {
    console.error("❌ Greška pri učitavanju modela/scalera:", err);
    updateStatus(false, false, "Greška pri učitavanju fajlova. Proveri putanje.");
    alert("Greška pri učitavanju modela ili skalera. Proveri putanje.");
  } finally {
    stopLoader();
  }
}

// --- Pokreni inicijalizaciju na učitavanje stranice ---
window.addEventListener("load", initModel);

// --- Funkcija za proračun BMI ---
function calculateBMI() {
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value) / 100;

  const bmiValue = document.getElementById("bmi-value");
  const bmiCategory = document.getElementById("bmi-category");

  if (!isNaN(weight) && !isNaN(height) && height > 0) {
    const bmi = (weight / (height * height)).toFixed(1);
    bmiValue.textContent = bmi;

    let category = "";
    if (bmi < 18.5) category = "(Pothranjenost)";
    else if (bmi < 25) category = "(Normalna težina)";
    else if (bmi < 30) category = "(Prekomerna težina)";
    else category = "(Gojaznost)";

    bmiCategory.textContent = category;
    return parseFloat(bmi);
  } else {
    bmiValue.textContent = "-";
    bmiCategory.textContent = "";
    return null;
  }
}

// --- Event listener za automatski proračun BMI ---
document.getElementById("weight").addEventListener("input", calculateBMI);
document.getElementById("height").addEventListener("input", calculateBMI);

// --- Reset forme ---
document.getElementById("reset-button").addEventListener("click", () => {
  document.getElementById("bmi-value").textContent = "-";
  document.getElementById("bmi-category").textContent = "";
  document.getElementById("result-content").innerHTML = "";
});

// --- Funkcija za predikciju ---
async function predictDiabetes(event) {
  event.preventDefault();

  const form = document.getElementById("diabetes-prediction-form");
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  if (!model || !scaler) {
    alert("Model ili scaler još nisu učitani.");
    return;
  }

  document.getElementById("loading").style.display = "block";

  try {
    const bmi = calculateBMI();

    const inputFeatures = {
      "GenHlth": parseInt(document.getElementById("GenHlth").value),
      "HighBP": parseInt(document.getElementById("HighBP").value),
      "BMI": bmi,
      "BP_Chol_Risk": parseInt(document.getElementById("HighBP").value) * parseInt(document.getElementById("HighChol").value),
      "HighChol": parseInt(document.getElementById("HighChol").value),
      "DiffWalk": parseInt(document.getElementById("DiffWalk").value),
      "HeartDiseaseorAttack": parseInt(document.getElementById("HeartDiseaseorAttack").value)
    };

    const inputArray = scaler.feature_names.map(f => {
      const idx = scaler.feature_names.indexOf(f);
      return (inputFeatures[f] - scaler.mean[idx]) / scaler.scale[idx];
    });

    const inputTensor = tf.tensor2d([inputArray]);
    const prediction = model.predict(inputTensor);
    const probability = (await prediction.data())[0];

    const resultContent = document.getElementById("result-content");
    resultContent.innerHTML = `
      <p><strong>Verovatnoća rizika od dijabetesa:</strong> ${(probability * 100).toFixed(2)}%</p>
      <p style="color: ${probability > 0.5 ? "red" : "green"}">
        ${probability > 0.5 ? "⚠️ Visok rizik" : "✅ Nizak rizik"}
      </p>
    `;

  } catch (err) {
    console.error("Greška prilikom predikcije:", err);
    alert("Došlo je do greške prilikom predikcije.");
  } finally {
    document.getElementById("loading").style.display = "none";
  }
}

// --- Vežemo funkciju za submit forme ---
document.getElementById("diabetes-prediction-form")
  .addEventListener("submit", predictDiabetes);
