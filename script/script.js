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

  const creatingNewRow = () => {
    const row = document.createElement('tr');
    row.classList.add('table__tr');

    let data = localStorage.getItem('0modal'),
        name = '',
        date = '';

    data = JSON.parse(data);

    if (data) {
      name = data['0name'];
      date = data['0date'];
    }

      row.innerHTML = `
        <th class="table__th">1</th>
        <th class="table__th">${name}</th>
        <th class="table__th">
          <button class="btn__add_table" id="add__participants">Посмотреть</button>
        </th>
        <th class="table__th">
          <button class="btn__add_table" id="add__participants">Добавить</button>
        </th>
        <th class="table__th">${date}</th>
      `;
      return row;
  };


  const popupWindowOpen = () => {
    const desktopMenu = document.querySelector('.desktop__menu');

    desktopMenu.addEventListener('click', (event) => {
      let target = event.target;
      const id = target.getAttribute('id') ? target.getAttribute('id') : target.parentNode.getAttribute('id');

      const activeModal = document.getElementById(id + 'modal');

      if (target.closest('.desktop__icon')) {
        zeroZindexPopup();
        modalActivInDesktop(id);

        activeModal.classList.toggle('modal__active');

        const table = activeModal.querySelector('table');
        
        const row = creatingNewRow();

        table.append(row);

        addParticipantsPopupOpenClose();
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

  const savingInputValues = (modalWindow) => {
    let flag = false;
    let obj = {};
    const inputs = modalWindow.querySelectorAll('input');
    inputs.forEach(elem => {
      if (elem.value === '') {
        flag = true;
      } else {
        obj[elem.id] = elem.value;
      }
    });
    if (flag) {
      return alert('Все поля должны быть заполнены!');
    }
    modalWindow.classList.remove('modal__active');
    return obj;
  };


  const closingSmallModals = (smallModal, id) => {
      smallModal.addEventListener('click', (event) => {
        let target = event.target;
        if (smallModal.classList.contains('modal__active')) {
          if (!target.closest('.infoPanel__object__container')) {
          smallModal.classList.remove('modal__active');
          }
          if (target.closest('.table__btn')) {
            const data = savingInputValues(smallModal);
            if (data) {
              localStorage[id] = JSON.stringify(data);
            }
          }
        }
      });
  };


  const doInpopup = (id) => {
    const popup = document.getElementById(id);

    const smallModal = popup.querySelector('.infoPanel__object');

    popup.addEventListener('click', event => {
      let target = event.target;

      if (target.closest('.tbn__add')) {
        smallModal.classList.add('modal__active');
      }
    });

    closingSmallModals(smallModal, id);
  };

  doInpopup('0modal');

  const addParticipantsPopupOpenClose = () => {
    const addParticipantsBtn = document.getElementById('add__participants');

    addParticipantsBtn.addEventListener('click', () => {
      const smallModal = document.querySelector('.infoPanle__participants');

      smallModal.style.display = 'flex';

      smallModal.addEventListener('click', event => {
        let target = event.target;

        if (!target.closest('.participants__container') || target.closest('.prev')) {
          smallModal.style.display = 'none';
        }
      });
      
    });
  };

  
});