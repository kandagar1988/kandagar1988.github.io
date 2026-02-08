document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.slider-track');
  const slides = Array.from(track.querySelectorAll('img'));
  const prevBtn = document.querySelector('.nav.prev');
  const nextBtn = document.querySelector('.nav.next');
  const dotsWrap = document.querySelector('.dots');

  if (!track || slides.length === 0) return;

  let index = 1;
  let slideWidth = slides[0].offsetWidth + 30;
  let timer;

  // ==== CLONES ====
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  let allSlides = Array.from(track.children);

  function updateSize() {
    slideWidth = allSlides[0].offsetWidth + 30;
    track.style.transition = 'none';
    track.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  window.addEventListener('resize', updateSize);
  updateSize();

  // ==== DOTS ====
  dotsWrap.innerHTML = '';
  const dots = slides.map((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dotsWrap.appendChild(dot);

    dot.addEventListener('click', () => {
      index = i + 1;
      move();
      resetAuto();
    });

    return dot;
  });

  function updateDots() {
    dots.forEach(d => d.classList.remove('active'));
    dots[(index - 1) % dots.length]?.classList.add('active');
  }

  // ==== MOVE ====
  function move(animate = true) {
    track.style.transition = animate ? 'transform 0.4s ease' : 'none';
    track.style.transform = `translateX(-${index * slideWidth}px)`;
    updateDots();
  }

  nextBtn.addEventListener('click', () => {
    index++;
    move();
    resetAuto();
  });

  prevBtn.addEventListener('click', () => {
    index--;
    move();
    resetAuto();
  });

  track.addEventListener('transitionend', () => {
    if (allSlides[index] === firstClone) {
      index = 1;
      move(false);
    }
    if (allSlides[index] === lastClone) {
      index = allSlides.length - 2;
      move(false);
    }
  });

  // ==== SWIPE ====
  let startX = 0;

  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) index++;
    if (endX - startX > 50) index--;
    move();
    resetAuto();
  });

  // ==== AUTOPLAY ====
  function autoPlay() {
    timer = setInterval(() => {
      index++;
      move();
    }, 4000);
  }

  function resetAuto() {
    clearInterval(timer);
    autoPlay();
  }

  autoPlay();
});
