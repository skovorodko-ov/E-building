'use strict';

const iconInfoPanel = document.getElementById('iconInfoPanel'),
      infoPanel = document.getElementById('infoPanel'),
      modalObject = document.getElementById('modalObject'),
      tableInfoObject = document.getElementById('tableInfoObject'),
      modalParticipant = document.getElementById('modalParticipant'),
      modalAddParticipant = document.getElementById('modalAddParticipant'),
      modalProjectOrganization = document.getElementById('modalProjectOrganization');

const creatingObjects = () => {
  // здесь должно быть получение данных из локалсторэдж и создание новых строк
  const tableRows = tableInfoObject.querySelectorAll('.spetialClass');

  tableRows.forEach(elem => {
    elem.parentNode.removeChild(elem);
  });

  for (let i = 0; i < localStorage.length; i++) {
    let infoAboutObject = localStorage.key(i),
        data = JSON.parse(localStorage.getItem(infoAboutObject));

    const row = document.createElement('tr');
    row.classList.add('table__tr');
    row.classList.add('spetialClass');
    row.innerHTML = `
          <th class="table__th">${i + 1}</th>
          <th class="table__th">${data['nameObject']}</th>
          <th class="table__th">
            <button class="btn__add_table" id="btnParticipants">Просмотреть</button>
          </th>
          <th class="table__th">
            <button class="btn__add_table" id="btnAddProjectDocumentation">Добавить</button>
          </th>
          <th class="table__th">${data['timeCreating']}</th>
    `;
    tableInfoObject.append(row);
  }
};

iconInfoPanel.addEventListener('click', (event) => {
  let target = event.target;

  if (target.closest('.desktop__icon')) {
    infoPanel.classList.toggle('modal__active');
    if (infoPanel.classList.contains('modal__active')) {
      creatingObjects(); 
    }
  }
});

const openModalObject = () => {
  infoPanel.addEventListener('click', event => {
    let target = event.target;

    // закрытие модалки информационная панель
    if (target.closest('#btnInfoPanelClose')) {
      infoPanel.classList.remove('modal__active');
    }

    // модалка информации об объекте
    if (target.closest('#btnAddObject')) {
      modalObject.classList.add('modal__active');
    }

    // модалка добавления участника
    if (target.closest('#btnParticipants')) {
      modalParticipant.classList.add('modal__active');
    }

    // модалка проектных организаций
    if (target.closest('#btnAddProjectDocumentation')) {
      modalProjectOrganization.classList.add('modal__active');
    }
  });
};

openModalObject();

const takingInfoForObject = () => {

  modalObject.addEventListener('click', event => {
    let target = event.target;

      // закрытие модалки об объекте
    if (!target.closest('.infoPanel__object__container')) {
      modalObject.classList.remove('modal__active');
    }

    // сохранение значений инпутов
    if (target.closest('.btn__save')) {
      const inputs = modalObject.querySelectorAll('input');
      let data = {},
          timeCreating = new Date().toISOString().slice(0, 10),
          nameObjectLocal;

      data.timeCreating = timeCreating;

      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value.trim() === '') {
          alert('введите все значения!');
          return;
        } else {
          data[inputs[i].id] = inputs[i].value;
          if (inputs[i].id === 'nameObject') {
            nameObjectLocal = inputs[i].value;
          }
        }
      }

      localStorage.setItem(nameObjectLocal, JSON.stringify(data));

      inputs.forEach(elem => {
        elem.value = '';
      });
      modalObject.classList.remove('modal__active');
      creatingObjects();
    }
  });
};

takingInfoForObject();

const tacingInfoAboutParticipants = () => {
  modalAddParticipant.addEventListener('click', event => {
    let target = event.target;

    if (!target.closest('.infoPanel__object__container')) {
      modalAddParticipant.classList.remove('modal__active');
    }
  });
};

const participants = () => {
  modalParticipant.addEventListener('click', event => {
    let target = event.target;

    if (!target.closest('.participants__container') || 
    target.closest('.prev')) {
      modalParticipant.classList.remove('modal__active');
    }

    // открытие модалки добавления участников
    if (target.closest('#btaAddParticipant')) {
      modalAddParticipant.classList.add('modal__active');
      tacingInfoAboutParticipants();
    }
  });
};

participants();


// сделать добавление в локалсторэдж инфы!!!
const projectDocumentation = () => {
  modalProjectOrganization.addEventListener('click', event => {
    let target = event.target;

    if (!target.closest('.infoPanel__object__container')) {
      modalProjectOrganization.classList.remove('modal__active');
    }
  });
};

projectDocumentation();



