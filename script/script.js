document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const animateLogo = () => {
    const logo = document.querySelector('.loading__logo'),
          loadingBg = document.querySelector('.loading__bg');

    loadingBg.style.opacity = 1;

    setInterval(() => {
      if (loadingBg.getAttribute('style') === 'opacity: 1;') {
        loadingBg.style.opacity = 0.3;
        logo.style.transform = 'rotateY(360deg)';
      } else {
        loadingBg.style.opacity = 1;
        logo.removeAttribute('style');
      }
    }, 2000);

    
  };

  animateLogo();
});