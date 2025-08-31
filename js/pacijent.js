// Reset dugme funkcionalnost
document.addEventListener('DOMContentLoaded', function() {
    const resetButton = document.getElementById('reset-button');
    const result = document.getElementById('result');
    const resultContent = document.getElementById('result-content');
    
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            // Resetuj formu
            const form = document.getElementById('diabetes-prediction-form');
            if (form) form.reset();
            
            // Sakrij rezultate
            result.style.display = 'none';
            resultContent.innerHTML = '';
        });
    }
    
    // Dodaj event listenere za live validaciju
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
});

// Funkcija za validaciju polja
function validateField(field) {
    if (!field.checkValidity()) {
        field.classList.add('input-error');
        // Dodaj poruku o grešci ako već ne postoji
        if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = field.validationMessage;
            field.parentNode.appendChild(errorDiv);
        }
    } else {
        field.classList.remove('input-error');
        // Ukloni poruku o grešci ako postoji
        const errorDiv = field.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
}