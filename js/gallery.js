document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".slider-track");
  const prev = document.querySelector(".slider-btn.prev");
  const next = document.querySelector(".slider-btn.next");

  if (!track || !prev || !next) return;

  const images = track.querySelectorAll("img");
  const gap = 30;

  let index = 0;

  function getImageWidth() {
    return images[0].getBoundingClientRect().width + gap;
  }

  function updateSlider() {
    track.style.transform = `translateX(-${index * getImageWidth()}px)`;
  }

  next.addEventListener("click", () => {
    if (index < images.length - 1) {
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

  // свайп для мобилки
  let startX = 0;

  track.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50 && index < images.length - 1) {
      index++;
    } else if (endX - startX > 50 && index > 0) {
      index--;
    }
    updateSlider();
  });
});
