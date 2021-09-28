document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const firstLoading = () => {
    const logo = document.querySelector('.loading__logo'),
          loadingBg = document.querySelector('.loading__bg'),
          section = document.getElementById('modal_loading'),
          menu = document.querySelector('.desktop__menu');

    loadingBg.style.opacity = 1;

    const loadingSectionAnimat = setInterval(() => {
      if (loadingBg.getAttribute('style') === 'opacity: 1;') {
        loadingBg.style.opacity = 0.3;
        logo.style.transform = 'rotateY(360deg)';
      } else {
        loadingBg.style.opacity = 1;
        logo.removeAttribute('style');
      }
    }, 2000);

    setTimeout(() => {
      clearInterval(loadingSectionAnimat);
      loadingBg.style.opacity = 1;
      menu.style.opacity = 0.3;
    }, 6000);
  };

  firstLoading();
});