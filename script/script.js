document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const desktop = document.getElementById('modal_loading');

  const firstLoading = () => {
    const logo = document.querySelector('.loading__logo'),
          loadingBg = document.querySelector('.loading__bg'),
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
      menu.style.opacity = 1;
    }, 6000);
  };

  firstLoading();

  const popupCreating = (id, name) => {
    const popup = document.createElement('section');

    popup.classList.add('modal');
    popup.classList.add('modal__active');
    popup.setAttribute('id', id + 'modal');
    popup.style.transform = `translate(${id * 10}px, ${id * 30}px)`;
    popup.style.zIndex = 0;
    popup.innerHTML = `
      <div class="modal__header" id="${id}modalHeader">
        <div class="modal__header__text" id="${id}modalHeaderText">
          <span class="modal__title">${name}</span>
        </div>
        <button class="btn__close" id="${id}btn">
          <img src="./img/closeIcon.svg" alt="close">
        </button>
      </div>
      <div class="modal__container">

      </div>
    `;
    desktop.append(popup);
  };

  const zeroZindexPopup = () => {
    const popups = desktop.querySelectorAll('.modal'); 
    popups.forEach(elem => {
      elem.style.zIndex = 0;
    });
  };

  const modalActivInDesktop = (id) => {
    const activeModal = document.getElementById(id + 'modal');
    activeModal.style.zIndex = 1;
  };

  const popupWindowOpen = () => {
    const desktopMenu = document.querySelector('.desktop__menu');

    desktopMenu.addEventListener('click', (event) => {
      let target = event.target;

      const activeModal = document.getElementById(target.getAttribute('id') + 'modal');

      if (target.closest('.desktop__icon')) {
        zeroZindexPopup();
        const id = target.getAttribute('id') ? target.getAttribute('id') : target.parentNode.getAttribute('id'),
              name = target.getAttribute('name') ? target.getAttribute('name') : target.parentNode.getAttribute('name');
        if (!activeModal) {
          popupCreating(id, name);
        } else {
          activeModal.classList.add('modal__active');
          modalActivInDesktop(id);
        }
      }
    });
  };

  const popupWindowClosing = () => {
    desktop.addEventListener('click', (event) => {
      let target = event.target;
      let id = target.id ? target.id : target.parentNode.id;

      if (target.closest('.btn__close')) {
        const popups = desktop.querySelectorAll('.modal');
        popups.forEach(elem => {
          if (elem.id.slice(0, 1) === id.slice(0, 1)) {
            elem.classList.remove('modal__active');
          }
        });
      } else if (target.closest('.modal__active')){
        zeroZindexPopup();
        modalActivInDesktop(id.slice(0, 1));
      }
    });
  };

  popupWindowOpen();
  popupWindowClosing();
});