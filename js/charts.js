const chartContainer = document.getElementById('chart-container');

const dataSetImages = [
    "charts/Raspodela dijabetesa.png",
    "charts/Pol ispitanika.png",
    "charts/Obrazovanje ispitanika.png",
    "charts/Starosne grupe u data setu.png",
    "charts/Udeo dijabetičara po starosnim grupama.png",
    "charts/Korelaciona matrica dijabetes.png"
];

const impactImages = [
    "charts/Holesterol i Dijabetes.png",
    "charts/Visok krvni pritisak i dijabetes.png",
    "charts/Pušenje i dijabetes.png",
    "charts/Srčane bolesti i dijabetes.png",
    "charts/Moždani udar i dijabetes.png",
    "charts/Alkohol i dijabetes.png",
    "charts/Distribucija dijabetesa po polu.png",
    "charts/BMI i dijabetes.png",
    "charts/Obrazovanje i dijabetes.png",
    "charts/Opšte zdravlje i dijabetes.png",
    "charts/Prihodi i dijabetes.png"
];

const extremeProfiles = [
    {
        title: "Young Woman with Diabetes",
        img: "pics/Najmlađa osoba Mlada žena s dijabetesom.png",
        text: `Basic Information

Gender: Female
Age: 18–24
Education: High school or GED (Education = 4)
Income: $20,000–$34,999 (Income = 3)

Health Characteristics

Diabetes Status: Has diabetes (Diabetes_binary = 1)
High Blood Pressure: No (HighBP = 0)
High Cholesterol: No (HighChol = 0)
Cholesterol Check: Had a cholesterol check (CholCheck = 1)
BMI: 27.3 (Overweight category)
Smoker: Never smoked (Smoker = 0)
Stroke: Never had a stroke (Stroke = 0)
Heart Disease/Attack: No history (HeartDiseaseorAttack = 0)
Physical Activity: Does not exercise (PhysActivity = 0)
Fruits & Vegetables: Does not consume daily fruits or vegetables
Heavy Alcohol Consumption: Not a heavy drinker (HvyAlcoholConsump = 0)
Healthcare Access: Has healthcare coverage (AnyHealthcare = 1)
Doctor Visits: Visited doctor in the last 12 months (NoDocbcCost = 0)
General Health: Rated as “Very Good” (GenHlth = 2)
Physical Health: No days of poor physical health in the last 30 days (PhysHlth = 0)
Mental Health: No days of poor mental health in the last 30 days (MentHlth = 0)
Mobility Issues: No difficulty walking/climbing stairs (DiffWalk = 0)

Interpretation
This profile represents a very young woman who has been diagnosed with diabetes despite having no major comorbidities, normal blood pressure, no cholesterol problems, and relatively healthy self-perceptions. The lack of physical activity and absence of fruit/vegetable intake may have contributed to her health status.`
    },
    {
        title: "Oldest Man with Diabetes",
        img: "pics/Najstarija osoba Aktivan Stariji Muškarac.png",
        text: `Profile of the oldest person with diabetes

Basic information

Gender: Male
Age: 80 or older (Age = 13)
Education: University graduate (Education = 6)
Income: $75,000 or more (Income = 8)

Health characteristics

Diabetes status: Has diabetes (Diabetes_binary = 1)
High blood pressure: No (HighBP = 0)
High cholesterol: No (HighChol = 0)
Cholesterol check: Has had cholesterol checked (CholCheck = 1)
BMI: 23.8 (normal weight)
Smoker: Never smoked (Smoker = 0)
Stroke: No history of stroke (Stroke = 0)
Heart disease/attack: No history (HeartDiseaseorAttack = 0)
Physical activity: Physically active (PhysActivity = 1)
Fruits and vegetables: Consumes both daily (Fruits = 1, Veggies = 1)
Alcohol consumption: Not a heavy drinker (HvyAlcoholConsump = 0)
Healthcare access: Has healthcare coverage (AnyHealthcare = 1)
Doctor visits: No problem accessing doctor due to cost (NoDocbcCost = 0)
General health: Rated as "Excellent" (GenHlth = 1)
Physical health: No days of poor physical health in the last 30 days (PhysHlth = 0)
Mental health: No days of poor mental health in the last 30 days (MentHlth = 0)
Mobility issues: No difficulty walking or climbing stairs (DiffWalk = 0)

Interpretation
This profile represents an elderly man (80+) who, despite his age, maintains excellent physical and mental health. He leads a healthy lifestyle with normal BMI, physical activity, and daily fruit/vegetable consumption. He has no major cardiovascular risk factors (blood pressure and cholesterol are normal, no smoking, no heart disease, no stroke). His diabetes diagnosis likely reflects the effects of advanced age and genetics, rather than poor lifestyle. He is an example of “healthy aging with diabetes.”`
    },
    {
        title: "Highest BMI and Diabetes",
        img: "pics/Najveći BMI i dijabetes Zdravstveni Izazovi Žene.png",
        text: `Person profile – highest BMI and diabetes

Basic information

Gender: Female
Age: 55–59 years (Age = 9)
Education: High school or GED (Education = 4)
Income: $20,000–$25,000 (Income = 3)

Health characteristics

Diabetes status: Has diabetes (Diabetes_binary = 1)
High blood pressure: Yes (HighBP = 1)
High cholesterol: Yes (HighChol = 1)
Cholesterol check: Has had cholesterol checked (CholCheck = 1)
BMI: 98 (extreme morbid obesity)
Smoker: Former smoker (Smoker = 1)
Stroke: No history of stroke (Stroke = 0)
Heart disease/heart attack: Yes (HeartDiseaseorAttack = 1)
Physical activity: Not physically active (PhysActivity = 0)
Fruits and vegetables: Consumes fruits (1), but not vegetables (0)
Alcohol consumption: Not a heavy drinker (HvyAlcoholConsump = 0)
Healthcare access: Has healthcare coverage (AnyHealthcare = 1)
Doctor visits: Did not see a doctor due to cost (NoDocbcCost = 1)
General health: Rated as “Poor” (GenHlth = 5)
Physical health: 30 days of poor physical health in the last month (PhysHlth = 30)
Mental health: 30 days of poor mental health in the last month (MentHlth = 30)
Mobility issues: Yes, difficulty walking/climbing stairs (DiffWalk = 1)

Interpretation
This profile represents a middle-aged woman with the highest recorded BMI in the dataset (BMI = 98). She has multiple comorbidities including hypertension, high cholesterol, and heart disease. She is physically inactive, with severe limitations in mobility and quality of life, and reports poor health across all domains. This case illustrates the extreme impact of morbid obesity on diabetes and overall health.`
    },
    {
        title: "Heavy Drinker with Diabetes",
        img: "pics/Teški alkoholičar sa dijabetesom.png",
        text: `Profile – Heavy drinker with diabetes

Basic information

Gender: Male
Age: 70–74 years (Age = 12)
Education: College graduate (Education = 5)
Income: $75,000 or more (Income = 8)

Health characteristics

Diabetes status: Has diabetes (Diabetes_binary = 1)
High blood pressure: Yes (HighBP = 1)
High cholesterol: No (HighChol = 0)
Cholesterol check: Has had cholesterol checked (CholCheck = 1)
BMI: 29 (overweight, near obesity)
Smoker: Current smoker (Smoker = 1)
Stroke: No history of stroke (Stroke = 0)
Heart disease/attack: No history (HeartDiseaseorAttack = 0)
Physical activity: Not physically active (PhysActivity = 0)
Fruits and vegetables: Does not consume either daily (Fruits = 0, Veggies = 0)
Alcohol consumption: Heavy drinker (HvyAlcoholConsump = 1)
Healthcare access: Has healthcare coverage (AnyHealthcare = 1)
Doctor visits: Has not avoided doctor due to cost (NoDocbcCost = 0)
General health: Rated as “Good” (GenHlth = 3)
Physical health: No days of poor physical health in the last month (PhysHlth = 0)
Mental health: No days of poor mental health in the last month (MentHlth = 0)
Mobility issues: No difficulty walking or climbing stairs (DiffWalk = 0)

Interpretation
This profile represents an elderly man who is a heavy drinker with diabetes. Despite his alcohol consumption, smoking, and lack of physical activity, he does not report major physical or mental health problems. His overweight BMI, hypertension, and diabetes indicate elevated risk, but he perceives his overall health as “good.” This case highlights how risky lifestyle behaviors can coexist with relatively stable health in older age, though the long-term risks are very high.`
    }
];

function renderCharts(type) {
    chartContainer.innerHTML = "";

    if (type === "dataset") {
        dataSetImages.forEach(src => {
            const img = document.createElement("img");
            img.src = src;
            img.alt = "Chart";
            chartContainer.appendChild(img);
        });
    } else if (type === "impact") {
        impactImages.forEach(src => {
            const img = document.createElement("img");
            img.src = src;
            img.alt = "Chart";
            chartContainer.appendChild(img);
        });
    } else if (type === "extreme") {
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
    }
}

// inicijalno prikaži Data set layout
renderCharts("dataset");

document.getElementById('chart-select').addEventListener('change', function() {
    renderCharts(this.value);
});
