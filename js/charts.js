const chartContainer = document.getElementById('chart-container');
const chartSelect = document.getElementById('chart-select');
const chartSubSelect = document.getElementById('chart-subselect');

const dataSetOptions = [
    {label: "Show all", src: null},
    {label: "distribution of diabetes", src: "charts/Raspodela dijabetesa.png"},
    {label: "gender of the respondent", src: "charts/Pol ispitanika.png"},
    {label: "level of education", src: "charts/Obrazovanje ispitanika.png"},
    {label: "age groups", src: "charts/Starosne grupe u data setu.png"},
    {label: "share of diabetics by age group", src: "charts/Udeo dijabetičara po starosnim grupama.png"},
    {label: "diabetes by gender", src: "charts/Distribucija dijabetesa po polu.png"},
    {label: "diabetes by BMI", src: "charts/BMI i dijabetes.png"},
    {label: "diabetes by education", src: "charts/Obrazovanje i dijabetes.png"},
    {label: "diabetes by general health", src: "charts/Opšte zdravlje i dijabetes.png"},
    {label: "correlation heat map", src: "charts/Korelaciona matrica dijabetes.png"}
];

const impactOptions = [
    {label: "Show all", src: null},
    {label: "cholesterol", src: "charts/Holesterol i Dijabetes.png"},
    {label: "blood pressure", src: "charts/Visok krvni pritisak i dijabetes.png"},
    {label: "smoking", src: "charts/Pušenje i dijabetes.png"},
    {label: "heart disease", src: "charts/Srčane bolesti i dijabetes.png"},
    {label: "stroke", src: "charts/Moždani udar i dijabetes.png"},
    {label: "alcohol", src: "charts/Alkohol i dijabetes.png"}
];

const extremeProfiles = [
    {
        title: "Person with the LEAST probability of diabetes (0.13%)",
        img: "pics/Zdrava Žena Srednjih Godina.png",
        text: `Basic Information

Gender: Female (Sex = 0.0).<br>
Age group: 25-29 years (Age_2.0 = True).<br>
Education: Highest level - postgraduate studies (Education_6.0 = True).<br>
Income: Highest level - more than $75,000 per year (Income_8.0 = True).<br>

Emotional and financial context:
Due to excellent health, high education and financial stability, this person probably has a very stable emotional status.
High income allows access to quality nutrition, gyms and preventive health care.
The absence of health problems and financial worries significantly reduces everyday stressors.
Higher education indicates a good level of health literacy and awareness of disease prevention.
Key protective factors: Ideal weight, absence of chronic diseases, extremely healthy lifestyle habits, high education and high income.`
    },
    {
        title: "Person with the HIGHEST probability of diabetes (97.42%)",
        img: "pics/Zdravstveni Rizik Čoveka.png",
        text: `Basic Information

Gender: Male (Sex = 1.0).
Age group: 45-49 years (Age_6.0 = True).
Education: Low - High school without a diploma (Education_2.0 = True).
Income: Low income - $10k–15k per year (Income_2.0 = True).

Emotional and financial context:
Severe emotional state - 30 days of poor mental health in the past month (MentHlth = 30.0).
Severe physical state - 30 days of poor physical health in the past month (PhysHlth = 30.0).
Financial hardship - low income and skips doctor visits due to cost (NoDocbcCost = 1.0).

Due to the combination of severe chronic illnesses, obesity, physical limitations, and low socioeconomic status, this person likely has an extremely stressful and limited life.
Financial hardship directly limits access to adequate health care and quality nutrition.
Emotional well-being is severely compromised by long-term health problems and daily physical suffering.
Key risk factors: Extreme obesity, high blood pressure, high cholesterol, heart disease, low socioeconomic status, physical inactivity, poor diet, and poor mental and physical health.`
    },
    {
        title: "Young Woman with Diabetes",
        img: "pics/Najmlađa osoba Mlada žena s dijabetesom.png",
        text: `Basic Information

Gender: Female
Age: 18
BMI: 22.3
Education: College
Diabetes: Yes

Health Characteristics 
Diabetes Status: Has diabetes (Diabetes_binary = 1) <br>
High Blood Pressure: No (HighBP = 0)<br> 
High Cholesterol: No (HighChol = 0) <br>
Cholesterol Check: Had a cholesterol check (CholCheck = 1) <br>
BMI: 27.3 (Overweight category) <br>
Smoker: Never smoked (Smoker = 0) <br>
Stroke: Never had a stroke (Stroke = 0) <br>
Heart Disease/Attack: No history (HeartDiseaseorAttack = 0) <br>
Physical Activity: Does not exercise (PhysActivity = 0) <br>
Fruits & Vegetables: Does not consume daily fruits or vegetables <br>
Heavy Alcohol Consumption: Not a heavy drinker (HvyAlcoholConsump = 0) <br>
Healthcare Access: Has healthcare coverage (AnyHealthcare = 1) <br>
Doctor Visits: Visited doctor in the last 12 months (NoDocbcCost = 0) <br>
General Health: Rated as “Very Good” (GenHlth = 2) <br>
Physical Health: No days of poor physical health in the last 30 days (PhysHlth = 0) <br>
Mental Health: No days of poor mental health in the last 30 days (MentHlth = 0) <br>
Mobility Issues: No difficulty walking/climbing stairs (DiffWalk = 0) <br>

Interpretation 
This profile represents a very young woman who has been diagnosed with diabetes despite having no major comorbidities, normal blood pressure, no cholesterol problems, and relatively healthy self-perceptions. 
The lack of physical activity and absence of fruit/vegetable intake may have contributed to her health status.`
    },
    {
        title: "Person with the HIGHEST BMI (98) – Risk of diabetes: 10.23%",
        img: "pics/Najveći BMI i dijabetes Zdravstveni Izazovi Žene.png",
        text: `Basic Information

Gender: Female <br>
Age: 55–59 years (Age = 9) <br>
Education: High school or GED (Education = 4) <br>
Income: $20,000–$25,000 (Income = 3) <br>

Health characteristics 
Diabetes status: Has diabetes (Diabetes_binary = 1) <br>
High blood pressure: Yes (HighBP = 1) <br>
High cholesterol: Yes (HighChol = 1) <br>
Cholesterol check: Has had cholesterol checked (CholCheck = 1) <br>
BMI: 98 (extreme morbid obesity) <br>
Smoker: Former smoker (Smoker = 1) <br>
Stroke: No history of stroke (Stroke = 0) <br>
Heart disease/heart attack: Yes (HeartDiseaseorAttack = 1) <br>
Physical activity: Not physically active (PhysActivity = 0) <br>
Fruits and vegetables: Consumes fruits (1), but not vegetables (0) <br>
Alcohol consumption: Not a heavy drinker (HvyAlcoholConsump = 0) <br>
Healthcare access: Has healthcare coverage (AnyHealthcare = 1) <br>
Doctor visits: Did not see a doctor due to cost (NoDocbcCost = 1) <br>
General health: Rated as “Poor” (GenHlth = 5) <br>
Physical health: 30 days of poor physical health in the last month (PhysHlth = 30) <br>
Mental health: 30 days of poor mental health in the last month (MentHlth = 30) <br>
Mobility issues: Yes, difficulty walking/climbing stairs (DiffWalk = 1) <br>

Interpretation 
This profile represents a middle-aged woman with the highest recorded BMI in the dataset (BMI = 98). 
She has multiple comorbidities including hypertension, high cholesterol, and heart disease. 
She is physically inactive, with severe limitations in mobility and quality of life, and reports poor health across all domains. 
This case illustrates the extreme impact of morbid obesity on diabetes and overall health.`
    },
    {
        title: "Oldest Man with Diabetes",
        img: "pics/Najstarija osoba Aktivan Stariji Muškarac.png",
        text: `Basic Information

Gender: Male <br>
Age: 80 or older (Age = 13) <br>
Education: University graduate (Education = 6) <br>
Income: $75,000 or more (Income = 8) <br>

Health characteristics 
Diabetes status: Has diabetes (Diabetes_binary = 1) <br>
High blood pressure: No (HighBP = 0) <br>
High cholesterol: No (HighChol = 0) <br>
Cholesterol check: Has had cholesterol checked (CholCheck = 1) <br>
BMI: 23.8 (normal weight) <br>
Smoker: Never smoked (Smoker = 0) <br>
Stroke: No history of stroke (Stroke = 0) <br>
Heart disease/attack: No history (HeartDiseaseorAttack = 0) <br>
Physical activity: Physically active (PhysActivity = 1) <br>
Fruits and vegetables: Consumes both daily (Fruits = 1, Veggies = 1) <br>
Alcohol consumption: Not a heavy drinker (HvyAlcoholConsump = 0) <br>
Healthcare access: Has healthcare coverage (AnyHealthcare = 1) <br>
Doctor visits: No problem accessing doctor due to cost (NoDocbcCost = 0) <br>
General health: Rated as "Excellent" (GenHlth = 1) <br>
Physical health: No days of poor physical health in the last 30 days (PhysHlth = 0) <br>
Mental health: No days of poor mental health in the last 30 days (MentHlth = 0) <br>
Mobility issues: No difficulty walking or climbing stairs (DiffWalk = 0) <br>

Interpretation 
This profile represents an elderly man (80+) who, despite his age, maintains excellent physical and mental health. 
He leads a healthy lifestyle with normal BMI, physical activity, and daily fruit/vegetable consumption. 
He has no major cardiovascular risk factors (blood pressure and cholesterol are normal, no smoking, no heart disease, no stroke). 
His diabetes diagnosis likely reflects the effects of advanced age and genetics, rather than poor lifestyle. 
He is an example of “healthy aging with diabetes.”`
    },
    {
        title: "Heavy Drinker with Diabetes",
        img: "pics/Teški alkoholičar sa dijabetesom.png",
        text: `Basic Information

Gender: Male <br>
Age: 70–74 years (Age = 12) <br>
Education: College graduate (Education = 5) <br>
Income: $75,000 or more (Income = 8) <br>

Health characteristics 
Diabetes status: Has diabetes (Diabetes_binary = 1) <br>
High blood pressure: Yes (HighBP = 1) <br>
High cholesterol: No (HighChol = 0) <br>
Cholesterol check: Has had cholesterol checked (CholCheck = 1) <br>
BMI: 29 (overweight, near obesity) <br>
Smoker: Current smoker (Smoker = 1) <br>
Stroke: No history of stroke (Stroke = 0) <br>
Heart disease/attack: No history (HeartDiseaseorAttack = 0) <br>
Physical activity: Not physically active (PhysActivity = 0) <br>
Fruits and vegetables: Does not consume either daily (Fruits = 0, Veggies = 0) <br>
Alcohol consumption: Heavy drinker (HvyAlcoholConsump = 1) <br>
Healthcare access: Has healthcare coverage (AnyHealthcare = 1) <br>
Doctor visits: Has not avoided doctor due to cost (NoDocbcCost = 0) <br>
General health: Rated as “Good” (GenHlth = 3) <br>
Physical health: No days of poor physical health in the last month (PhysHlth = 0) <br>
Mental health: No days of poor mental health in the last month (MentHlth = 0) <br>
Mobility issues: No difficulty walking or climbing stairs (DiffWalk = 0) <br>

Interpretation 
This profile represents an elderly man who is a heavy drinker with diabetes. 
Despite his alcohol consumption, smoking, and lack of physical activity, he does not report major physical or mental health problems. 
His overweight BMI, hypertension, and diabetes indicate elevated risk, but he perceives his overall health as “good.” 
This case highlights how risky lifestyle behaviors can coexist with relatively stable health in older age, though the long-term risks are very high.`
    }
];

// Sada opcije tačno prate indekse iz extremeProfiles
const extremeOptions = [
    {label: "Show all", profileIndex: null},
    {label: "Person with the LEAST probability of diabetes (0.13%)", profileIndex: 0},
    {label: "Person with the HIGHEST probability of diabetes (97.42%)", profileIndex: 1},
    {label: "Young Woman with Diabetes", profileIndex: 2},
    {label: "Person with the HIGHEST BMI (98)", profileIndex: 3},
    {label: "Oldest Man with Diabetes", profileIndex: 4},
    {label: "Heavy Drinker with Diabetes", profileIndex: 5},
];

// funkcija za popunjavanje drugog selecta
function populateSubSelect(type) {
    chartSubSelect.innerHTML = "";

    let options = [];
    if (type === "dataset") options = dataSetOptions;
    else if (type === "impact") options = impactOptions;
    else if (type === "extreme") options = extremeOptions;

    options.forEach((opt, idx) => {
        const option = document.createElement("option");
        option.value = idx;
        option.textContent = opt.label;
        chartSubSelect.appendChild(option);
    });

    renderCharts(type, 0);
}

// glavna funkcija rendera
function renderCharts(type, index) {
    chartContainer.innerHTML = "";

    if (type === "dataset") {
        if (index === 0) {
            dataSetOptions.slice(1).forEach(opt => {
                const img = document.createElement("img");
                img.src = opt.src;
                img.alt = opt.label;
                chartContainer.appendChild(img);
            });
        } else {
            const img = document.createElement("img");
            img.src = dataSetOptions[index].src;
            img.alt = dataSetOptions[index].label;
            chartContainer.appendChild(img);
        }

    } else if (type === "impact") {
        if (index === 0) {
            impactOptions.slice(1).forEach(opt => {
                const img = document.createElement("img");
                img.src = opt.src;
                img.alt = opt.label;
                chartContainer.appendChild(img);
            });
        } else {
            const img = document.createElement("img");
            img.src = impactOptions[index].src;
            img.alt = impactOptions[index].label;
            chartContainer.appendChild(img);
        }

    } else if (type === "extreme") {
        if (index === 0) {
            extremeProfiles.forEach(profile => {
                const div = document.createElement("div");
                div.className = "profile";

                const img = document.createElement("img");
                img.src = profile.img;

                const textDiv = document.createElement("div");
                textDiv.className = "profile-text";

                const h3 = document.createElement("h3");
                h3.textContent = profile.title;

                const pre = document.createElement("pre");
                pre.textContent = profile.text;

                textDiv.appendChild(h3);
                textDiv.appendChild(pre);

                div.appendChild(img);
                div.appendChild(textDiv);

                chartContainer.appendChild(div);
            });
        } else {
            const profile = extremeProfiles[extremeOptions[index].profileIndex];
            const div = document.createElement("div");
            div.className = "profile";

            const img = document.createElement("img");
            img.src = profile.img;

            const textDiv = document.createElement("div");
            textDiv.className = "profile-text";

            const h3 = document.createElement("h3");
            h3.textContent = profile.title;

            const pre = document.createElement("pre");
            pre.textContent = profile.text;

            textDiv.appendChild(h3);
            textDiv.appendChild(pre);

            div.appendChild(img);
            div.appendChild(textDiv);

            chartContainer.appendChild(div);
        }
    }
}

// event listeneri
chartSelect.addEventListener('change', function() {
    populateSubSelect(this.value);
});

chartSubSelect.addEventListener('change', function() {
    renderCharts(chartSelect.value, parseInt(this.value));
});

// inicijalno
populateSubSelect("dataset");
