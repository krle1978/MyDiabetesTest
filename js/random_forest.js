// === Globalne promenljive ===
let model = null;
let scaler = null;

// === Učitaj Random Forest model i Scaler ===
async function loadModelAndScaler() {
    // Učitaj Random Forest model
    const resModel = await fetch("model/random_forest_model.json");
    if (!resModel.ok) throw new Error("Greška prilikom učitavanja modela.");
    model = await resModel.json();

    // Učitaj Scaler
    const resScaler = await fetch("model/scaler.json");
    if (!resScaler.ok) throw new Error("Greška prilikom učitavanja scaler-a.");
    scaler = await resScaler.json();

    console.log("✅ Model i scaler uspešno učitani");
}

// === Skaliranje podataka ===
function scaleInput(inputArray) {
    if (!scaler) throw new Error("Scaler nije učitan!");
    return inputArray.map((x, i) => (x - scaler.mean[i]) / scaler.scale[i]);
}

// === Random Forest predikcija ===
function predikcijaRF(ulaz, model) {
    let glasovi = Array(model.classes.length).fill(0);

    for (const drvo of model.trees) {
        let cvor = 0;

        // Prolazak kroz stablo dok ne dođemo do lista
        while (drvo.feature[cvor] !== -2) { // -2 = leaf
            const feature = drvo.feature[cvor];
            const threshold = drvo.threshold[cvor];

            if (ulaz[feature] <= threshold) {
                cvor = drvo.children_left[cvor];
            } else {
                cvor = drvo.children_right[cvor];
            }
        }

        // Glasanje klase na leaf čvoru
        const vrednosti = drvo.value[cvor]; 
        const predClass = vrednosti.indexOf(Math.max(...vrednosti));
        glasovi[predClass]++;
    }

    return glasovi.indexOf(Math.max(...glasovi));
}

// === Glavna predikcija ===
async function predvidiDijabetes(podaciKorisnika) {
    if (!model || !scaler) {
        throw new Error("Model i scaler nisu učitani!");
    }

    // 1. Skaliraj podatke
    const scaledInput = scaleInput(podaciKorisnika);

    // 2. Uradi predikciju pomoću Random Forest modela
    const klasa = predikcijaRF(scaledInput, model);

    return klasa === 1 ? "⚠️ HIGH RISK of diabetes" : "✅ LOW RISK of diabetes";
}

// === Kada se stranica učita ===
window.onload = async () => {
    await loadModelAndScaler();

    const predictBtn = document.getElementById("predictBtn");
    if (!predictBtn) return;

    predictBtn.addEventListener("click", async () => {
        try {
            // BMI računamo iz weight i height
            const weight = parseFloat(document.getElementById("weight").value);
            const height = parseFloat(document.getElementById("height").value) / 100; // cm → m
            const bmi = weight / (height * height);

            // Prikupljanje svih input vrednosti u istom redu kao u trening setu
            const podaciKorisnika = [
                parseInt(document.getElementById("highBP").value),
                parseInt(document.getElementById("highChol").value),
                parseInt(document.getElementById("cholCheck").value),
                parseInt(document.getElementById("smoker").value),
                parseInt(document.getElementById("stroke").value),
                parseInt(document.getElementById("heartDisease").value),
                parseInt(document.getElementById("physActivity").value),
                parseInt(document.getElementById("fruits").value),
                parseInt(document.getElementById("veggies").value),
                parseInt(document.getElementById("hvyAlcohol").value),
                parseInt(document.getElementById("anyHealthcare").value),
                parseInt(document.getElementById("noDocCost").value),
                parseInt(document.getElementById("genHlth").value),
                parseInt(document.getElementById("mentHlth").value),
                parseInt(document.getElementById("physHlth").value),
                parseInt(document.getElementById("diffWalk").value),
                parseInt(document.getElementById("sex").value),
                parseInt(document.getElementById("age").value),
                parseInt(document.getElementById("education").value),
                parseInt(document.getElementById("income").value),
                bmi // poslednji feature
            ];

            // Predikcija
            const rezultat = await predvidiDijabetes(podaciKorisnika);

            // Ispis rezultata
            const resultEl = document.getElementById("result-text") || document.getElementById("result");
            if (resultEl) resultEl.innerText = rezultat;
            else alert(rezultat);

        } catch (error) {
            console.error("Prediction failed:", error);
            alert("Došlo je do greške prilikom predikcije. Pokušajte ponovo.");
        }
    });
};
