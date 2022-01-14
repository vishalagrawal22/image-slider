let nextTimeout = null;
function setCurrentSlide(slideNo) {
  const slidesList = document.querySelector('.image-slider main').children;
  slidesList.item(slideNo).classList.add('visible');

  const navItems = document.querySelector('.image-slider nav').children;
  navItems.item(slideNo).classList.add('current-slide');

  nextTimeout = setTimeout(() => {
    const nextButton = document.querySelector('.next-button');
    nextButton.click();
  }, 5000);
}

function clearCurrentSlide() {
  const currentSlide = document.querySelector('.image-slider main .visible');
  currentSlide.classList.remove('visible');

  const currentNavItem = document.querySelector(
    '.image-slider nav .current-slide'
  );
  currentNavItem.classList.remove('current-slide');

  clearTimeout(nextTimeout);
}

function changeSlide(slideNo) {
  clearCurrentSlide();
  setCurrentSlide(slideNo);
}

function getCurrentSlideNo() {
  const currentNavItem = document.querySelector(
    '.image-slider nav .current-slide'
  );
  const id = currentNavItem.getAttribute('data-id');
  return parseInt(id);
}

function createNav() {
  const nav = document.createElement('nav');

  const len = document.querySelector('.image-slider main').children.length;
  for (let i = 0; i < len; i++) {
    const itemButton = document.createElement('div');
    itemButton.setAttribute('data-id', i);
    itemButton.addEventListener('click', () => {
      changeSlide(i);
    });
    nav.append(itemButton);
  }

  const slider = document.querySelector('.image-slider');
  slider.append(nav);
}

function setupNextButton() {
  const nextButton = document.querySelector('.next-button');
  const len = document.querySelector('.image-slider main').children.length;
  nextButton.addEventListener('click', () => {
    const currentNo = getCurrentSlideNo();
    const nextNo = (currentNo + 1) % len;
    changeSlide(nextNo);
  });
}

function setupPreviousButton() {
  const previousButton = document.querySelector('.previous-button');
  const len = document.querySelector('.image-slider main').children.length;
  previousButton.addEventListener('click', () => {
    const currentNo = getCurrentSlideNo();
    const previousNo = (currentNo + len - 1) % len;
    changeSlide(previousNo);
  });
}

function setupActionButtons() {
  setupNextButton();
  setupPreviousButton();
}

(function initSlider() {
  createNav();
  setupActionButtons();
  setCurrentSlide(0);
})();
