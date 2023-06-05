const burger = document.querySelector('.burger-menu');
const menu = document.querySelector('.header-menu');
const body = document.body;

function handlerBurger(e) {
  if (
    (!e.target.closest('.header-menu') && menu.classList.contains('active')) ||
    e.target === burger
  ) {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
  }
}

function handlerResize(e) {
  const minWidth = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(
      '--sm-max-content'
    )
  );
  const currentWidth = window.innerWidth;

  if (currentWidth > minWidth) {
    burger.classList.remove('active');
    menu.classList.remove('active');
  }
}

body.addEventListener('click', handlerBurger);
window.addEventListener('resize', handlerResize);
