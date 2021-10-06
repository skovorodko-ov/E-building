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

  // const creatingPopupInfo = (id) => {
  //   const html = `
  //     <div class="table__title">
  //         <h2 class="tittle__moadal">Объекты</h2>
  //         <input class="modal__search" type="text" placeholder="Поиск...">
  //       </div>
  //       <table class="table">
  //         <col style="width:5%">
  //         <col style="width:40%">
  //         <col style="width:20%">
  //         <col style="width:20%">
  //         <col style="width:20%">
  //         <tr class="table__tr">
  //           <th class="table__th">№</th>
  //           <th class="table__th">
  //             <span>Наименование по пректной документации</span>
  //             <button class="sort__btn">a-z</button>
  //           </th>
  //           <th class="table__th">Участники</th>
  //           <th class="table__th">Проектная документация</th>
  //           <th class="table__th">
  //             <span>Дата создания</span>
  //             <button class="sort__btn">0-9</button></th>
  //         </tr>
  //         <tr class="table__tr" id="name__object">
  //           <th class="table__th">1</th>
  //           <th class="table__th">Наименование</th>
  //           <th class="table__th">Участник</th>
  //           <th class="table__th">ООО "..."</th>
  //           <th class="table__th">06.10.2021</th>
  //         </tr>
  //       </table>
  //       <button class="table__btn">Добавить объект</button>
  //   `;
  //   return html;
  // };

  // const popupCreating = (id, name) => {
  //   const popup = document.createElement('section'),
  //         popupInfo = document.createElement('div');
  //   popupInfo.classList.add('modal__container');
  //   popupInfo.innerHTML = creatingPopupInfo(id);

  //   popup.classList.add('modal');
  //   popup.classList.add('modal__active');
  //   popup.setAttribute('id', id + 'modal');
  //   popup.style.transform = `translate(${id * 10}px, ${id * 30}px)`;
  //   popup.style.zIndex = 0;
  //   popup.innerHTML = `
  //     <div class="modal__header" id="${id}modalHeader">
  //       <div class="modal__header__text" id="${id}modalHeaderText">
  //         <span class="modal__title">${name}</span>
  //       </div>
  //       <button class="btn__close" id="${id}btn">
  //         <img src="./img/closeIcon.svg" alt="close">
  //       </button>
  //     </div>
  //   `;
  //   desktop.append(popup);
  //   popup.append(popupInfo);
  // };

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
      const id = target.getAttribute('id') ? target.getAttribute('id') : target.parentNode.getAttribute('id'),
          name = target.getAttribute('name') ? target.getAttribute('name') : target.parentNode.getAttribute('name');

      const activeModal = document.getElementById(id + 'modal');

      if (target.closest('.desktop__icon')) {
        zeroZindexPopup();
        modalActivInDesktop(id);

        activeModal.classList.toggle('modal__active');
      }
    });
  };

  const popupWindowClosing = () => {
    const popups = document.querySelectorAll('.modal');
    popups.forEach(elem => {
      elem.addEventListener('click', event => {
        let target = event.target;

        if (target.closest('.btn__close')) {
          elem.classList.remove('modal__active');
        }
      });
    });
  };


  const moviWindows = () => {
    let flag = false;

  const mouseMove = (event, x1, y1, targetWindow, windowY, windowX) => {
    let deltaX = event.clientX - x1,
        deltaY = event.clientY - y1;
          
    targetWindow.style.top = (windowY + deltaY) + 'px';
    targetWindow.style.left = (windowX + deltaX) + 'px';
    return [targetWindow.style.top, targetWindow.style.left];
  };

  const mouseDown = (id) => {
      document.addEventListener('mousedown', (event) => {
        event.preventDefault();
        let target = event.target;
        zeroZindexPopup();

        if (target.closest('.modal__header')) {
          let id = target.getAttribute('id') ? target.getAttribute('id') : target.parentNode.getAttribute('id');
          modalActivInDesktop(id.slice(0, 1));
          flag = true;
          let x1 = event.clientX,
            y1 = event.clientY;
          if (flag) {
            const targetWindow = document.getElementById(id.slice(0, 1) + 'modal');
            let windowX = targetWindow.offsetLeft,
                windowY = targetWindow.offsetTop;
            targetWindow.addEventListener('mousemove', (event) => {
              if (!flag) {
                return;
              }
              mouseMove(event, x1, y1, targetWindow, windowY, windowX);
            });
          }
        }
      });
  };
  mouseDown();

  document.addEventListener('mouseup', () => {
      flag = false;
    });
  };

  popupWindowOpen();
  popupWindowClosing();
  moviWindows();
});