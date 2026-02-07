document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".slider-track");
  const slides = document.querySelectorAll(".slider-track img");
  const prev = document.querySelector(".nav.prev");
  const next = document.querySelector(".nav.next");

  if (!track || slides.length === 0 || !prev || !next) {
    console.error("Slider elements not found");
    return;
  }

  let index = 0;

  function updateSlider() {
    const slideWidth = slides[0].offsetWidth + 20;
    track.style.transform = `translateX(${-index * slideWidth}px)`;
  }

  next.addEventListener("click", () => {
    if (index < slides.length - 1) {
      index++;
      updateSlider();
    }
  });

  prev.addEventListener("click", () => {
    if (index > 0) {
      index--;
      updateSlider();
    }
  });

  // 🔍 увеличение фото
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "rgba(0,0,0,0.9)";
  overlay.style.display = "none";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.zIndex = "9999";

  const bigImg = document.createElement("img");
  bigImg.style.maxWidth = "90%";
  bigImg.style.maxHeight = "90%";
  bigImg.style.borderRadius = "12px";

  overlay.appendChild(bigImg);
  document.body.appendChild(overlay);

  slides.forEach(img => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      bigImg.src = img.src;
      overlay.style.display = "flex";
    });
  });

  overlay.addEventListener("click", () => {
    overlay.style.display = "none";
  });

  window.addEventListener("resize", updateSlider);
});
// mobile menu
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}
