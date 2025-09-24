document.addEventListener("DOMContentLoaded", () => {

  // === Progress Bar Animation with Milestones ===
  const progress = document.querySelector(".progress-bar .progress");
  let width = 0;
  const target = 64; // 64%

  const interval = setInterval(() => {
    if (width >= target) {
      clearInterval(interval);
    } else {
      width++;
      progress.style.width = width + "%";
    }
  }, 20);


  // === Hamburger Menu Toggle with Slide Animation ===
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".menu_mobile");

  hamburger.addEventListener("click", () => {
    if (mobileMenu.classList.contains("open")) {
      mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px"; // start height
      requestAnimationFrame(() => {
        mobileMenu.style.maxHeight = "0";
      });
      mobileMenu.classList.remove("open");
    } else {
      mobileMenu.classList.add("open");
      mobileMenu.style.maxHeight = "0";
      requestAnimationFrame(() => {
        mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
      });
    }
  });

  // Reset max-height after transition
  mobileMenu.addEventListener("transitionend", () => {
    if (!mobileMenu.classList.contains("open")) {
      mobileMenu.style.maxHeight = "";
    } else {
      mobileMenu.style.maxHeight = ""; // da omogući normalno skaliranje
    }
  });

  // === Copy Buttons for Crypto ===
  const copyButtons = document.querySelectorAll(".copy-btn");
  copyButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const text = btn.getAttribute("data-copy");
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = "Copied!";
        setTimeout(() => { btn.textContent = "Copy"; }, 1500);
      });
    });
  });

  // === Top Nav Hide/Show on Scroll ===
  const topNav = document.querySelector(".main-nav");
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      topNav.style.transform = "translateY(0)";
      return;
    }

    if (currentScroll > lastScroll) {
      // skroluje nadole → sakrij
      topNav.style.transform = "translateY(-100%)";
    } else {
      // skroluje nagore → prikazi
      topNav.style.transform = "translateY(0)";
    }

    lastScroll = currentScroll;
  });

  // === PayPal Buttons ===
  function renderPayPalButton(containerId, amount) {
    paypal.Buttons({
      style: {
        shape: 'pill',
        color: 'gold',
        layout: 'vertical',
        label: 'donate'
      },
      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: amount.toString(),
              currency_code: 'EUR'
            },
            description: "Donation of €" + amount
          }]
        });
      },
      onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
          window.location.href = "thankyou.html?amount=" + amount + "&name=" + encodeURIComponent(details.payer.name.given_name);
        });
      },
      onError: function (err) {
        console.error(err);
        alert("Došlo je do greške pri obradi donacije.");
      }
    }).render(containerId);
  }

  renderPayPalButton('#paypal-button-container-5', 5);
  renderPayPalButton('#paypal-button-container-10', 10);
  renderPayPalButton('#paypal-button-container-20', 20);

  // === Bank Transfer QR Code with 10 EUR preset ===
  const bankQR = document.getElementById("bank-qr");
  if (bankQR) {
    const epcData = [
      "BCD",                  // identifikator
      "001",                  // verzija
      "1",                    // encoding UTF-8
      "SCT",                  // SEPA Credit Transfer
      "OTPVRS22",             // SWIFT OTP banka
      "RADE KRSTIC",          // ime
      "RS35325934170593551847", // IBAN
      "EUR10.00",             // iznos
      "",                     // purpose
      "Donation for Diabetis Project" // referenca
    ].join("\n");

    // kreiranje QR koda
    const qr = new QRCode(bankQR, {
      text: epcData,
      width: 220,
      height: 220,
      correctLevel: QRCode.CorrectLevel.M
    });

    // ubacivanje natpisa "10€" u centar QR koda
    setTimeout(() => {
      const qrCanvas = bankQR.querySelector("canvas");
      if (qrCanvas) {
        const ctx = qrCanvas.getContext("2d");
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.beginPath();
        ctx.arc(qrCanvas.width / 2, qrCanvas.height / 2, 30, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#000";
        ctx.font = "bold 18px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("10€", qrCanvas.width / 2, qrCanvas.height / 2);
      }
    }, 500);
  }
});
