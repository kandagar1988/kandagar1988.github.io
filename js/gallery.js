document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".proj-track");
  const prev = document.querySelector(".proj-nav.prev");
  const next = document.querySelector(".proj-nav.next");

  if (!track) return;

  let index = 0;

  function slideTo(i) {
    const img = track.querySelector("img");
    if (!img) return;
    const gap = 16;
    const width = img.offsetWidth + gap;
    track.style.transform = `translateX(${-i * width}px)`;
  }

  next?.addEventListener("click", () => {
    index++;
    slideTo(index);
  });

  prev?.addEventListener("click", () => {
    index = Math.max(0, index - 1);
    slideTo(index);
  });

  // свайп
  let startX = 0;

  track.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (diff > 50) index++;
    if (diff < -50) index = Math.max(0, index - 1);
    slideTo(index);
  });
});
