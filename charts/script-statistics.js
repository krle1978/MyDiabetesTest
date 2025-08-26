//function toggleLanguage() {
//    const currentLang = document.documentElement.lang; // Provera trenutnog jezika
//    const isEnglish = currentLang === "en"; // Da li je trenutni jezik engleski
//
//    // Promena atributa jezika
//    document.documentElement.lang = isEnglish ? "sr" : "en";
//
//    // Tekstovi za svaki jezik
//    const texts = {
//        en: {
//            title: "Diabetes Data Statistics",
//            predictions: "Predictions and Statistics",
//            youngest: "Youngest person with diabetes: 21",
//            oldest: "Oldest person with diabetes: 70",
//            highestBMI: "Person with the highest BMI with diabetes: 67.10",
//            highestGlucose: "Person with the highest glucose level with diabetes: 199",
//            highestInsulin: "Person with the highest insulin level with diabetes: 846",
//            averageAgeSick: "Average age of those with diabetes: 37.12",
//            averageAgeHealthy: "Average age of healthy individuals: 31.22",
//            averageBMISick: "Average BMI of those with diabetes: 35.11",
//            averageBMIHealthy: "Average BMI of healthy individuals: 30.30",
//            averageGlucoseSick: "Average glucose level of those with diabetes: 141.29",
//            averageGlucoseHealthy: "Average glucose level of healthy individuals: 110.02",
//            averageInsulinSick: "Average insulin level of those with diabetes: 100.41",
//            averageInsulinHealthy: "Average insulin level of healthy individuals: 68.93",
//            totalPregnancies: "Total pregnancies in women with diabetes: 1306",
//            averagePregnancies: "Average pregnancies in women with diabetes: 4.86",
//        },
//        sr: {
//            title: "Statistika podataka o dijabetesu",
//            predictions: "Predikcije i Statistike",
//            youngest: "Najmlađa osoba obolela od dijabetesa: 21",
//            oldest: "Najstarija osoba obolela od dijabetesa: 70",
//            highestBMI: "Osoba sa najvećim BMI obolela od dijabetesa: 67.10",
//            highestGlucose: "Osoba sa najvećim nivoom glukoze obolela od dijabetesa: 199",
//            highestInsulin: "Osoba sa najvećim nivoom insulina obolela od dijabetesa: 846",
//            averageAgeSick: "Prosečna starost obolelih: 37.12",
//            averageAgeHealthy: "Prosečna starost zdravih: 31.22",
//            averageBMISick: "Prosečan BMI obolelih: 35.11",
//            averageBMIHealthy: "Prosečan BMI zdravih: 30.30",
//            averageGlucoseSick: "Prosečan nivo glukoze obolelih: 141.29",
//            averageGlucoseHealthy: "Prosečan nivo glukoze zdravih: 110.02",
//            averageInsulinSick: "Prosečan nivo insulina obolelih: 100.41",
//            averageInsulinHealthy: "Prosečan nivo insulina zdravih: 68.93",
//            totalPregnancies: "Ukupan broj trudnoća kod obolelih žena: 1306",
//            averagePregnancies: "Prosečan broj trudnoća kod obolelih žena: 4.86",
//        },
//    };
//
//    const selectedTexts = isEnglish ? texts.sr : texts.en;
//
//    // Ažuriranje tekstova na stranici, ignorisanje navigacije
//    document.querySelector("h1").innerText = selectedTexts.title;
//    document.querySelector("h2").innerText = selectedTexts.predictions;
//
//    const listItems = document.querySelectorAll("body ul li"); // Selektujemo samo elemente u body
//    listItems[0].innerText = selectedTexts.youngest;
//    listItems[1].innerText = selectedTexts.oldest;
//    listItems[2].innerText = selectedTexts.highestBMI;
//    listItems[3].innerText = selectedTexts.highestGlucose;
//    listItems[4].innerText = selectedTexts.highestInsulin;
//    listItems[5].innerText = selectedTexts.averageAgeSick;
//    listItems[6].innerText = selectedTexts.averageAgeHealthy;
//    listItems[7].innerText = selectedTexts.averageBMISick;
//    listItems[8].innerText = selectedTexts.averageBMIHealthy;
//    listItems[9].innerText = selectedTexts.averageGlucoseSick;
//    listItems[10].innerText = selectedTexts.averageGlucoseHealthy;
//    listItems[11].innerText = selectedTexts.averageInsulinSick;
//    listItems[12].innerText = selectedTexts.averageInsulinHealthy;
//    listItems[13].innerText = selectedTexts.totalPregnancies;
//    listItems[14].innerText = selectedTexts.averagePregnancies;
//}

// Event listener za klik na ikonicu
document.addEventListener("DOMContentLoaded", () => {
    const languageIcon = document.querySelector(".language-icon");
    if (languageIcon) {
        languageIcon.addEventListener("click", toggleLanguage);
    }
});
function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('open'); // Dodaje/uklanja klasu "open"
}
