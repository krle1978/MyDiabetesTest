document.addEventListener('DOMContentLoaded', function () {
    const resultEl = document.getElementById('result-text');

    // Stil za rezultate i greške
    const style = document.createElement('style');
    style.textContent = `
        .risk-high { color: #ff4444; font-weight: bold; }
        .risk-low { color: #4CAF50; font-weight: bold; }
        .input-error { border-color: red !important; }
    `;
    document.head.appendChild(style);

    // Reset dugme
    document.getElementById('reset-button')?.addEventListener('click', () => {
        const form = document.getElementById('diabetes-prediction-form');
        form.reset();
        if (resultEl) resultEl.innerHTML = "Enter your details to get a prediction.";
    });
});
