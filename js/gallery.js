const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slider-track img');
const prevBtn = document.querySelector('.nav.prev');
const nextBtn = document.querySelector('.nav.next');

let index = 0;
let slideWidth = slides[0].offsetWidth + 30;

function updateSlider() {
  track.style.transform = `translateX(-${index * slideWidth}px)`;
}

nextBtn.addEventListener('click', () => {
  if (index < slides.length - 1) index++;
  updateSlider();
});

prevBtn.addEventListener('click', () => {
  if (index > 0) index--;
  updateSlider();
});

/* SWIPE */
let startX = 0;

track.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

track.addEventListener('touchend', e => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50 && index < slides.length - 1) index++;
  if (endX - startX > 50 && index > 0) index--;
  updateSlider();
});

window.addEventListener('resize', () => {
  slideWidth = slides[0].offsetWidth + 30;
  updateSlider();
});
