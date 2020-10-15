'use strict';

const feedbackLink = document.querySelector(".js-feedback");
const feedbackPopup = document.querySelector(".modal-feedback");
const modalFeedbackClose = feedbackPopup.querySelector(".modal-close");
const feedbackForm = feedbackPopup.querySelector(".feedback-form");
const feedbackName = feedbackPopup.querySelector("#feedback-form-name");
const feedbackEmail = feedbackPopup.querySelector("#feedback-form-email");
const feedbackMessage = feedbackPopup.querySelector("#feedback-form-text");

const mapPopup = document.querySelector('.modal-map');
const mapLink = document.querySelector('.map-link');
const mapPopupClose = mapPopup.querySelector('.modal-close');

let isStorageSupport = true;
let storage = "";

try {
  storage = localStorage.getItem("Name");
} catch (err) {
  isStorageSupport = false;
}

const openPopup = function (modal) {
  modal.classList.add("modal-show");
};

const closePopup = function (modal) {
  modal.classList.remove("modal-show");
};

const pressEscKey = function (evt) {
  if (evt.key === 'Escape') {
    if (feedbackPopup.classList.contains("modal-show")) {
      evt.preventDefault();
      feedbackPopup.classList.remove("modal-show");
      feedbackPopup.classList.remove("modal-error");
    }
  }
};

const fillFeedbackForm = function () {
  if (storage) {
    feedbackName.value = localStorage.getItem("Name");
    feedbackEmail.value = localStorage.getItem("Email");
    feedbackMessage.focus();
  } else {
    feedbackMessage.focus();
  }
};

const closeFeedbackPopup = function () {
  modalFeedbackClose.addEventListener("click", function (evt) {
    evt.preventDefault();
    closePopup(feedbackPopup);
    feedbackPopup.classList.remove("modal-error");
  });
};

const checkFormValidity = function () {
  feedbackForm.addEventListener("submit", function (evt) {
    if (!feedbackName.value || !feedbackEmail.value) {
      evt.preventDefault();
      feedbackPopup.classList.remove("modal-error");
      feedbackPopup.offsetWidth;
      feedbackPopup.classList.add("modal-error");

    } else {
      if (isStorageSupport) {
        localStorage.setItem("Name", feedbackName.value);
        localStorage.setItem("Email", feedbackEmail.value);
      }
    }
  });
};

feedbackLink.addEventListener("click", function (evt) {
  evt.preventDefault();
  openPopup(feedbackPopup);
  fillFeedbackForm();
  checkFormValidity();
  closeFeedbackPopup();
});

window.addEventListener("keydown", function (evt) {
  pressEscKey(evt);
});

mapLink.addEventListener('click', function (evt) {
  evt.preventDefault();
  openPopup(mapPopup);
  window.addEventListener("keydown", function (evt) {
    if (evt.key === 'Escape') {
      if (mapPopup.classList.contains("modal-show")) {
        evt.preventDefault();
        mapPopup.classList.remove("modal-show");
      }
    }
  });
});

mapPopupClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  closePopup(mapPopup);
});
