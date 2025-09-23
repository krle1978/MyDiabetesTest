document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".menu_mobile");

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener("click", () => {
    if (mobileMenu.classList.contains("open")) {
      // zatvaranje
      mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
      requestAnimationFrame(() => {
        mobileMenu.style.maxHeight = "0";
      });
      mobileMenu.classList.remove("open");
    } else {
      // otvaranje
      mobileMenu.classList.add("open");
      mobileMenu.style.maxHeight = "0";
      requestAnimationFrame(() => {
        mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
      });
    }
  });

  mobileMenu.addEventListener("transitionend", () => {
    mobileMenu.style.maxHeight = "";
  });

  // Klik na link zatvara meni
  const menuLinks = mobileMenu.querySelectorAll("li a");
  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      mobileMenu.style.maxHeight = "0";
    });
  });
});
