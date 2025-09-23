document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const amount = params.get("amount");
  const name = params.get("name");

  const thanksMessage = document.getElementById("thanks-message");
  const thanksSub = document.getElementById("thanks-sub");

  if (amount && name) {
    thanksMessage.textContent = `🙏 Thank you, ${name}!`;
    thanksSub.textContent = `Your donation of €${amount} helps us make a real difference.`;
  } else if (amount) {
    thanksMessage.textContent = "🙏 Thank you for your donation!";
    thanksSub.textContent = `Your donation of €${amount} helps us make a real difference.`;
  }
});
