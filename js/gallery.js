const track = document.querySelector('.slider-track');
let slides = Array.from(track.children);
const prevBtn = document.querySelector('.nav.prev');
const nextBtn = document.querySelector('.nav.next');
const dotsWrap = document.querySelector('.dots');

let index = 1;
let slideWidth;
let autoTimer;

/* CLONE */
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

slides = Array.from(track.children);

function setSize() {
  slideWidth = slides[0].offsetWidth + 30;
  track.style.transform = `translateX(-${index * slideWidth}px)`;
}
window.addEventListener('resize', setSize);
setSize();

/* DOTS */
const dots = slides.slice(1, -1).map((_, i) => {
  const d = document.createElement('span');
  if (i === 0) d.classList.add('active');
  dotsWrap.appendChild(d);
  d.addEventListener('click', () => {
    index = i + 1;
    move();
    resetAuto();
  });
  return d;
});

function updateDots() {
  dots.forEach(d => d.classList.remove('active'));
  dots[(index - 1) % dots.length]?.classList.add('active');
}

/* MOVE */
function move(animate = true) {
  track.style.transition = animate ? 'transform 0.4s ease' : 'none';
  track.style.transform = `translateX(-${index * slideWidth}px)`;
  updateDots();
}

nextBtn.onclick = () => { index++; move(); resetAuto(); };
prevBtn.onclick = () => { index--; move(); resetAuto(); };

track.addEventListener('transitionend', () => {
  if (slides[index].isSameNode(firstClone)) {
    index = 1;
    move(false);
  }
  if (slides[index].isSameNode(lastClone)) {
    index = slides.length - 2;
    move(false);
  }
});

/* SWIPE */
let startX = 0;
track.addEventListener('touchstart', e => startX = e.touches[0].clientX);
track.addEventListener('touchend', e => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) index++;
  if (endX - startX > 50) index--;
  move();
  resetAuto();
});

/* AUTOPLAY */
function autoPlay() {
  autoTimer = setInterval(() => {
    index++;
    move();
  }, 4000);
}
function resetAuto() {
  clearInterval(autoTimer);
  autoPlay();
}
autoPlay();
