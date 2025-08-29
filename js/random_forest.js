// === Globalne promenljive ===
let model = null;
let scaler = null;

// === Učitaj Random Forest model i Scaler ===
async function loadModelAndScaler() {
    try {
        const resModel = await fetch("model/random_forest_model.json");
        if (!resModel.ok) throw new Error("Greška prilikom učitavanja modela.");
        model = await resModel.json();

        const resScaler = await fetch("model/scaler.json");
        if (!resScaler.ok) throw new Error("Greška prilikom učitavanja scaler-a.");
        scaler = await resScaler.json();

        console.log("✅ Model i scaler uspešno učitani");
    } catch (err) {
        console.error(err);
        alert("Ne mogu da učitam model i scaler. Proverite putanje.");
    }
}

// === Skaliranje podataka ===
function scaleInput(inputArray) {
    if (!scaler) throw new Error("Scaler nije učitan!");
    return inputArray.map((x, i) => (x - scaler.mean[i]) / scaler.scale[i]);
}

// === Random Forest predikcija sa procentom rizika ===
function predikcijaRFProcent(ulaz, model) {
    let glasovi = Array(model.classes.length).fill(0);

    for (const drvo of model.trees) {
        let cvor = 0;
        while (drvo.feature[cvor] !== -2) { // -2 = leaf
            const feature = drvo.feature[cvor];
            const threshold = drvo.threshold[cvor];
            cvor = ulaz[feature] <= threshold ? drvo.children_left[cvor] : drvo.children_right[cvor];
        }
        const vrednosti = drvo.value[cvor];
        const predClass = vrednosti.indexOf(Math.max(...vrednosti));
        glasovi[predClass]++;
    }

    const ukupno = glasovi.reduce((a,b)=>a+b,0);
    const rizikProcent = (glasovi[1]/ukupno) * 100; // klasa 1 = dijabetes
    return rizikProcent;
}

// === Preporuke na osnovu procenta rizika ===
function preporukePoRiziku(rizik) {
    let mere = [];

    if (rizik < 20) {
        mere.push("✅ Održavajte zdravu ishranu.");
        mere.push("✅ Redovno vežbajte i održavajte fizičku aktivnost.");
        mere.push("✅ Posetite lekara po rasporedu, kontrola jednom godišnje.");
    } else if (rizik < 50) {
        mere.push("⚠️ Povećajte unos povrća i voća, smanjite šećer i masnoće.");
        mere.push("⚠️ Vežbajte najmanje 30 minuta dnevno.");
        mere.push("⚠️ Posetite lekara za osnovne preglede i laboratorijske analize.");
    } else {
        mere.push("❌ Hitno smanjite unos šećera i masnoća, držite zdrav BMI.");
        mere.push("❌ Intenzivna fizička aktivnost 4-5 puta nedeljno, pod nadzorom.");
        mere.push("❌ Posetite lekara radi detaljnih testova i konsultacija.");
    }

    return mere;
}

// === Glavna predikcija sa procentom i preporukama ===
async function predvidiDijabetesSaPreporukama(podaciKorisnika) {
    if (!model || !scaler) throw new Error("Model i scaler nisu učitani!");

    const scaledInput = scaleInput(podaciKorisnika);
    const rizikProcent = predikcijaRFProcent(scaledInput, model);

    const mere = preporukePoRiziku(rizikProcent);

    return {
        procentRizika: rizikProcent.toFixed(2),
        mere
    };
}

// === Kada se stranica učita ===
window.addEventListener("DOMContentLoaded", async () => {
    await loadModelAndScaler();
    predictBtn.disabled = true;
    await loadModelAndScaler();
    predictBtn.disabled = false;


    //const predictBtn = document.getElementById("predictBtn");
    if (!predictBtn) return;

    predictBtn.addEventListener("click", async () => {
        try {
            console.log("Button click!");
            const weight = parseFloat(document.getElementById("weight").value);
            const height = parseFloat(document.getElementById("height").value) / 100; 
            const bmi = weight / (height * height);

            const podaciKorisnika = [
                parseInt(document.getElementById("highBP").value),
                parseInt(document.getElementById("highChol").value),
                parseInt(document.getElementById("cholCheck").value),
                bmi,
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
                parseInt(document.getElementById("income").value)
            ];

             // --- DEBUG LOG ---
            console.log("Podaci korisnika:", podaciKorisnika);
            console.log("Model feature count:", model.trees[0].feature.length);
            console.log("Scaler mean count:", scaler.mean.length);
            // --- END DEBUG ---

            const rezultat = await predvidiDijabetesSaPreporukama(podaciKorisnika);

            const resultEl = document.getElementById("result-text") || document.getElementById("result");
            if (resultEl) {
                resultEl.innerHTML = `
                    ⚠️ Procena rizika: <b>${rezultat.procentRizika}%</b><br>
                    <b>Preporuke:</b><br>
                    <ul>
                        ${rezultat.mere.map(m => `<li>${m}</li>`).join("")}
                    </ul>
                `;
            } else {
                alert(`Rizik: ${rezultat.procentRizika}%\nMere:\n${rezultat.mere.join("\n")}`);
            }

        } catch (error) {
            console.error("Prediction failed:", error);
            alert("Došlo je do greške prilikom predikcije. Pokušajte ponovo.");
        }
    });
});
