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
