document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".top-nav");
  let lastScrollY = window.scrollY;

  // inicijalno prikaži meni
  nav.classList.add("show");

  window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY) {
      // skroluje nadole → sakrij meni
      nav.classList.remove("show");
      nav.classList.add("hide");
    } else {
      // skroluje nagore → prikaži meni
      nav.classList.remove("hide");
      nav.classList.add("show");
    }
    lastScrollY = window.scrollY;
  });
});
