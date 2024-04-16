const titleNavigation = document.querySelector('.title-navigation');
const listNavigation = document.querySelector('.list-navigation');
const linkItemNavigation = document.querySelectorAll('.link-item-navigation');

titleNavigation.addEventListener('click', titleNavigationHendler);

function titleNavigationHendler(event) {
  event.preventDefault();

  listNavigation.classList.toggle('show-menu');
}

linkItemNavigation.forEach(function (item) {
  item.addEventListener('click', function () {
    listNavigation.classList.toggle('show-menu');
  });
});

// Додамо обробник кліків на всю сторінку
document.addEventListener('click', function (event) {
  // Перевіряємо, чи клікнули не на елемент меню або кнопки відкриття/закриття меню
  if (
    !event.target.closest('.title-navigation') &&
    !event.target.closest('.link-item-navigation')
  ) {
    listNavigation.classList.remove('show-menu');
  }
});

/*Section hendler mobile menu*/
const mobileMenuItems = document.querySelectorAll(
  '.link-item-navigation-mobile-menu'
);
const mobileMenuWrapper = document.querySelector('.mobile-menu-wrapper');
const burgerMenuOpenBtn = document.querySelector('.mobile-menu-open-btn');
const burgerMenuCloseBtn = document.querySelector('.mobile-menu-close-btn');
const orderProjectLinkMobile = document.querySelector(
  '.link-order_project-navigation-mobile-menu'
);
const header = document.querySelector('.header');
const containerHero = document.querySelector('.container-hero');

burgerMenuOpenBtn.addEventListener('click', openMobileMenu);
burgerMenuCloseBtn.addEventListener('click', closeMobileMenu);

function openMobileMenu() {
  mobileMenuWrapper.classList.add('modal-open');
  header.classList.add('invisible');
  containerHero.classList.add('invisible');
}

function closeMobileMenu() {
  mobileMenuWrapper.classList.remove('modal-open');
  header.classList.remove('invisible');
  containerHero.classList.remove('invisible');
}

mobileMenuItems.forEach(function (item) {
  item.addEventListener('click', function () {
    closeMobileMenu();
  });
});

orderProjectLinkMobile.addEventListener('click', function () {
  closeMobileMenu(); // Закриваємо мобільне меню
});

// Додаємо обробник події прокрутки для мобільної версії
window.addEventListener(
  'touchmove' && 'scroll',
  function (event) {
    // Отримуємо поточну позицію прокрутки
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let lastScrollTop = 0;
    if (
      mobileMenuWrapper.classList.contains('modal-open') &&
      scrollTop > lastScrollTop
    ) {
      closeMobileMenu();
    }
    lastScrollTop = 0;
  },
  { passive: true }
);
