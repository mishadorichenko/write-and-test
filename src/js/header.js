const titleNavigation = document.querySelector('.title-navigation');
const listNavigation = document.querySelector('.list-navigation');

titleNavigation.addEventListener('click', titleNavigationHendler);

function titleNavigationHendler(event) {
  event.preventDefault();

  if (listNavigation.classList.contains('hide')) {
    listNavigation.classList.remove('hide');
    listNavigation.classList.add('show-menu');
  } else {
    listNavigation.classList.toggle('show-menu');
    listNavigation.classList.toggle('close-menu');
  }
}

/*Section hendler mobile menu*/
const mobileMenuItems = document.querySelectorAll(
  '.link-item-navigation-mobile-menu'
);
const mobileMenuWrapper = document.querySelector('.mobile-menu-wrapper');
const burgerMenuOpenBtn = document.querySelector('.mobile-menu-open-btn');
console.log('burgerMenuOpenBtn' + burgerMenuOpenBtn);
const burgerMenuCloseBtn = document.querySelector('.mobile-menu-close-btn');
console.log('burgerMenuCloseBtn' + burgerMenuCloseBtn);
const orderProjectLinkMobile = document.querySelector(
  '.link-order_project-navigation-mobile-menu'
);
const workTogetherSection = document.querySelector(
  '.link-order_project-navigation-mobile-menu'
);
console.log('workTogetherSection - ' + workTogetherSection);

burgerMenuOpenBtn.addEventListener('click', openMobileMenu);
burgerMenuCloseBtn.addEventListener('click', closeMobileMenu);

function openMobileMenu() {
  // mobileMenuWrapper.style.transform = 'translateX(0%)';
  mobileMenuWrapper.classList.add('modal-open');
}

function closeMobileMenu() {
  // mobileMenuWrapper.style.transform = 'translateX(100%)';
  mobileMenuWrapper.classList.remove('modal-open');
}

mobileMenuItems.forEach(function (item) {
  console.log('item = ' + item);
  item.addEventListener('click', function (event) {
    event.preventDefault();
    // const targetSectionId = item.getAttribute('href');
    // console.log('targetSectionId =  ' + targetSectionId);
    // const targetSection = document.querySelector(targetSectionId);
    // console.log('targetSection = ' + targetSection);
    console.log('ITEM = ' + item);
    if (item) {
      item.scrollIntoView({ block: 'center', behavior: 'smooth' });
      closeMobileMenu();
    }
  });
});

orderProjectLinkMobile.addEventListener('click', function (event) {
  event.preventDefault(); // Зупиняємо перехід за посиланням
  console.log('workTogetherSection = ' + workTogetherSection);
  workTogetherSection.scrollIntoView({ block: 'center', behavior: 'smooth' }); // Прокручуємо до секції "Work together"
  closeMobileMenu(); // Закриваємо мобільне меню
});
