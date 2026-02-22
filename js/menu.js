const burger = document.getElementById('burger');
const sideMenu = document.getElementById('sideMenu');
const closeMenu = document.getElementById('closeMenu');
const overlay = document.getElementById('menuOverlay');

if (burger && sideMenu && closeMenu && overlay) {

  burger.addEventListener('click', () => {
    sideMenu.classList.add('open');
    overlay.classList.add('open');
    document.body.classList.add('menu-open');
  });

  closeMenu.addEventListener('click', closeAll);
  overlay.addEventListener('click', closeAll);

  function closeAll() {
    sideMenu.classList.remove('open');
    overlay.classList.remove('open');
    document.body.classList.remove('menu-open');
  }
}
