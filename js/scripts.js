'use strict';

const feedbackLink = document.querySelector('.js-feedback');
const feedbackPopup = document.querySelector('.modal-feedback');
const modalFeedbackClose = feedbackPopup.querySelector('.modal-close');
const feedbackForm = feedbackPopup.querySelector('.feedback-form');
const feedbackName = feedbackPopup.querySelector('#feedback-form-name');
const feedbackEmail = feedbackPopup.querySelector('#feedback-form-email');
const feedbackMessage = feedbackPopup.querySelector('#feedback-form-text');

const mapPopup = document.querySelector('.modal-map');
const mapLink = document.querySelector('.map-link');
const mapPopupClose = mapPopup.querySelector('.modal-close');

let isStorageSupport = true;
let storage = '';

try {
  storage = localStorage.getItem('Name');
} catch (err) {
  isStorageSupport = false;
}

const openPopup = function (modal) {
  modal.classList.add('modal-show');
};

const closePopup = function (modal) {
  modal.classList.remove('modal-show');
};

const pressEscKey = function (evt) {
  if (evt.key === 'Escape') {
    if (feedbackPopup.classList.contains('modal-show')) {
      evt.preventDefault();
      feedbackPopup.classList.remove('modal-show');
      feedbackPopup.classList.remove('modal-error');
    }
  }
};

const fillFeedbackForm = function () {
  if (storage) {
    feedbackName.value = localStorage.getItem('Name');
    feedbackEmail.value = localStorage.getItem('Email');
    feedbackMessage.focus();
  } else {
    feedbackMessage.focus();
  }
};

const closeFeedbackPopup = function () {
  modalFeedbackClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    closePopup(feedbackPopup);
    feedbackPopup.classList.remove('modal-error');
  });
};

const checkInputValidity = function (input) {
  if (input === '') {
    input.classList.add('input-invalid');
  } else {
    input.classList.remove('input-invalid');
  }
};

feedbackForm.addEventListener('input', function (evt) {
  if (evt.target === feedbackName || evt.target === feedbackEmail) {
    checkInputValidity(evt.target);
  }
});

const checkFormValidity = function () {
  feedbackForm.addEventListener('submit', function (evt) {
    if (!feedbackName.value || !feedbackEmail.value) {
      evt.preventDefault();
      if (!feedbackName.value) {
        feedbackName.classList.add('input-invalid');
      }
      if (!feedbackEmail.value) {
        feedbackEmail.classList.add('input-invalid');
      }
      feedbackPopup.classList.remove('modal-error');
      feedbackPopup.offsetWidth;
      feedbackPopup.classList.add('modal-error');
    } else {
      if (isStorageSupport) {
        localStorage.setItem('Name', feedbackName.value);
        localStorage.setItem('Email', feedbackEmail.value);
      }
    }
  });
};

feedbackLink.addEventListener('click', function (evt) {
  evt.preventDefault();
  openPopup(feedbackPopup);
  fillFeedbackForm();
  checkFormValidity();
  closeFeedbackPopup();
});

window.addEventListener('keydown', function (evt) {
  pressEscKey(evt);
});

mapLink.addEventListener('click', function (evt) {
  evt.preventDefault();
  openPopup(mapPopup);
  window.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      if (mapPopup.classList.contains('modal-show')) {
        evt.preventDefault();
        mapPopup.classList.remove('modal-show');
      }
    }
  });
});

mapPopupClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  closePopup(mapPopup);
});

const sliderControls = document.querySelector('.slider-controls');
const sliderList = document.querySelector('.slider-list');
const sliderItems = document.querySelectorAll('.slider-item');

sliderControls.addEventListener('click', function (evt) {
  const sliderButtons = sliderControls.querySelectorAll('.slider-button');

  for (let i = 0; i < sliderButtons.length; i++) {
    if (evt.target === sliderButtons[i]) {

      sliderList.style.transform = `translateX(-${sliderItems[i].offsetWidth * [i]}px)`;
    }
  }

  if (evt.target.classList.contains('slider-button')) {
    for (let button of sliderButtons) {
      button.classList.remove('slider-button-current');
    }
    evt.target.classList.add('slider-button-current');
  }
});

const servicesControls = document.querySelector('.services-control');
const servicesList = document.querySelector('.services-slider');
const servicesItems = document.querySelectorAll('.services-slider-item');

servicesControls.addEventListener('click', function (evt) {
  evt.preventDefault();
  const servicesButtons = servicesControls.querySelectorAll('.services-control-button');

  for (let i = 0; i < servicesButtons.length; i++) {
    if (evt.target === servicesButtons[i]) {
      for (let slide of servicesItems) {
        slide.style.display = 'none';
      }
      servicesItems[i].style.display = 'block';
    }
  }

  if (evt.target.classList.contains('services-control-button')) {
    for (let button of servicesButtons) {
      button.classList.remove('services-control-button-active');
    }
    evt.target.classList.add('services-control-button-active');
  }
});
