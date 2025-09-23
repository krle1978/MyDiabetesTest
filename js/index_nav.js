document.addEventListener("DOMContentLoaded", () => {
  // === Hamburger Menu Toggle ===
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".menu_mobile");

  hamburger.addEventListener("click", () => {
    if (mobileMenu.classList.contains("open")) {
      mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
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
      // skroluje nagore → prikaži
      topNav.style.transform = "translateY(0)";
    }

    lastScroll = currentScroll;
  });
});
