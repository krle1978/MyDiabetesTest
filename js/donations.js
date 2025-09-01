// Donacije – logika

// Dugmad za jednokratne/mesečne donacije
document.querySelectorAll(".donate-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const once = btn.getAttribute("data-once");
    const monthly = btn.getAttribute("data-monthly");

    if (once) {
      if (once === "paypal") window.open("https://paypal.me/yourlink", "_blank");
      if (once === "stripe") window.open("https://your-stripe-link", "_blank");
      if (once === "coffee") window.open("https://buymeacoffee.com/yourpage", "_blank");
    }

    if (monthly) {
      window.open(`https://your-stripe-subscription-link/${monthly}`, "_blank");
    }
  });
});

// Kopiranje kripto adrese
document.querySelectorAll(".copy-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const cryptoKey = btn.getAttribute("data-copy");
    const addr = document.querySelector(`[data-crypto="${cryptoKey}"]`).textContent;

    navigator.clipboard.writeText(addr).then(() => {
      btn.textContent = "Copied!";
      setTimeout(() => (btn.textContent = "Copy"), 2000);
    });
  });
});
