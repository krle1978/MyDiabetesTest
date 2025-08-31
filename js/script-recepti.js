// Baza recepata
const recipes = {
    breakfast: {
        "Zobena kaša sa voćem": `
            <h3>Zobena kaša sa voćem</h3>
            <p><b>Sastojci:</b> 50 g ovsenih pahuljica, 200 ml nemasnog mleka, 1 jabuka, cimet.</p>
            <p><b>Priprema:</b> Ovsene pahuljice kuvati u mleku 5 minuta. Dodati narendanu jabuku i malo cimeta.</p>
        `,
        "Proteinski omlet": `
            <h3>Proteinski omlet</h3>
            <p><b>Sastojci:</b> 2 belanca + 1 celo jaje, spanać, paradajz, 1 kašičica maslinovog ulja.</p>
            <p><b>Priprema:</b> Umutiti jaja i ispeći na ulju, dodati povrće.</p>
        `,
        "Integralni tost sa avokadom": `
            <h3>Integralni tost sa avokadom</h3>
            <p><b>Sastojci:</b> 2 kriške integralnog hleba, 1 avokado, malo limunovog soka.</p>
            <p><b>Priprema:</b> Avokado izgnječiti i premazati po hlebu, dodati par kapi limuna.</p>
        `,
        "Grčki jogurt sa orasima": `
            <h3>Grčki jogurt sa orasima</h3>
            <p><b>Sastojci:</b> 150 g grčkog jogurta, 1 kašika mlevenih oraha, nekoliko borovnica.</p>
            <p><b>Priprema:</b> Sve sastojke sjediniti i poslužiti hladno.</p>
        `
    },
    lunch: {
        "Piletina sa povrćem": `
            <h3>Piletina sa povrćem</h3>
            <p><b>Sastojci:</b> 150 g pilećih grudi, tikvica, paprika, šargarepa, maslinovo ulje.</p>
            <p><b>Priprema:</b> Iseći povrće i dinstati sa piletinom 20 minuta.</p>
        `,
        "Pasulj salata": `
            <h3>Pasulj salata</h3>
            <p><b>Sastojci:</b> Kuvani pasulj, luk, paradajz, peršun, maslinovo ulje.</p>
            <p><b>Priprema:</b> Sve sastojke pomešati i začiniti uljem.</p>
        `,
        "Riblji file na žaru": `
            <h3>Riblji file na žaru</h3>
            <p><b>Sastojci:</b> File lososa ili oslića, limun, maslinovo ulje.</p>
            <p><b>Priprema:</b> Ispeći ribu na roštilju, poslužiti sa povrćem.</p>
        `,
        "Integralna testenina sa povrćem": `
            <h3>Integralna testenina sa povrćem</h3>
            <p><b>Sastojci:</b> Integralna testenina, brokoli, tikvica, maslinovo ulje.</p>
            <p><b>Priprema:</b> Skuvati testeninu i pomešati sa povrćem na tiganju.</p>
        `
    },
    dinner: {
        "Supa od povrća": `
            <h3>Supa od povrća</h3>
            <p><b>Sastojci:</b> Šargarepa, tikvica, brokoli, celer, začini.</p>
            <p><b>Priprema:</b> Povrće skuvati u vodi i začiniti po ukusu.</p>
        `,
        "Ćuretina sa salatom": `
            <h3>Ćuretina sa salatom</h3>
            <p><b>Sastojci:</b> 120 g ćurećih prsa, zelena salata, paradajz, maslinovo ulje.</p>
            <p><b>Priprema:</b> Ispeći meso na tiganju i poslužiti sa svežom salatom.</p>
        `,
        "Tunjevina sa povrćem": `
            <h3>Tunjevina sa povrćem</h3>
            <p><b>Sastojci:</b> Konzerva tunjevine u sopstvenom soku, kukuruz, paradajz, krastavac.</p>
            <p><b>Priprema:</b> Sve sastojke pomešati i začiniti maslinovim uljem.</p>
        `,
        "Pečene tikvice sa sirom": `
            <h3>Pečene tikvice sa sirom</h3>
            <p><b>Sastojci:</b> Tikvice, posni sir, peršun.</p>
            <p><b>Priprema:</b> Tikvice preseći, napuniti sirom i peći 20 minuta.</p>
        `
    },
    dessert: {
        "Čia puding": `
            <h3>Čia puding</h3>
            <p><b>Sastojci:</b> 3 kašike čia semenki, 200 ml bademovog mleka, borovnice.</p>
            <p><b>Priprema:</b> Ostaviti seme u mleku preko noći i poslužiti sa voćem.</p>
        `,
        "Kolač od šargarepe": `
            <h3>Kolač od šargarepe</h3>
            <p><b>Sastojci:</b> Rendana šargarepa, ovseno brašno, jaja, orašasti plodovi.</p>
            <p><b>Priprema:</b> Sve sastojke sjediniti i peći 30 min na 180°C.</p>
        `,
        "Voćna salata": `
            <h3>Voćna salata</h3>
            <p><b>Sastojci:</b> Jabuka, kruška, borovnice, limunov sok.</p>
            <p><b>Priprema:</b> Voće iseći na kockice i preliti limunovim sokom.</p>
        `,
        "Jogurt tortica": `
            <h3>Jogurt tortica</h3>
            <p><b>Sastojci:</b> Nemasni jogurt, želatin, maline, ovseni keks.</p>
            <p><b>Priprema:</b> Umutiti jogurt sa želatinom, dodati voće i složiti preko keksa.</p>
        `
    }
};

// DOM elementi
const mealType = document.getElementById("meal-type");
const mealRecipe = document.getElementById("meal-recipe");
const recipeContent = document.getElementById("recipe-text");

// Kada se promeni tip obroka
mealType.addEventListener("change", () => {
    const type = mealType.value;
    mealRecipe.innerHTML = `<option value="">-- Izaberi recept --</option>`;
    mealRecipe.disabled = !type;

    if (type && recipes[type]) {
        Object.keys(recipes[type]).forEach(recipeName => {
            const opt = document.createElement("option");
            opt.value = recipeName;
            opt.textContent = recipeName;
            mealRecipe.appendChild(opt);
        });
    }
});

// Kada se izabere recept
mealRecipe.addEventListener("change", () => {
    const type = mealType.value;
    const selected = mealRecipe.value;
    if (type && selected && recipes[type][selected]) {
        recipeContent.innerHTML = recipes[type][selected];
    }
});

// Klik na karticu (sliku)
document.querySelectorAll(".meal-card").forEach(card => {
    card.addEventListener("click", () => {
        const type = card.dataset.meal;
        mealType.value = type;
        mealType.dispatchEvent(new Event("change"));
        recipeContent.innerHTML = `<h2>Izaberite recept iz menija za ${type} 🍴</h2>`;
    });
});
