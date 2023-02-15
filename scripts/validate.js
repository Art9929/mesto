const popupEditBtnOpen = document.querySelector(".profile__edit-button");
const popupAddBtnOpen = document.querySelector(".profile__add-button");

const popups = document.querySelectorAll(".popup");
const popupEditWindow = document.querySelector(".popup_edit");
const popupAddWindow = document.querySelector(".popup_add");
const popupImgWindow = document.querySelector(".popup_template_img");

const popupFormTemplateEdit = document.querySelector(".popup__form_template_edit");
const popupFormTemplateAdd = document.querySelector(".popup__form_template_add");

const titleAutor = document.querySelector(".profile__title");
const subtitleAutor = document.querySelector(".profile__subtitle");
const nameInput = document.querySelector(".popup__input_text_name");
const jobInput = document.querySelector(".popup__input_text_job");
const placeInput = document.querySelector(".popup__input_text_place");
const urlImgInput = document.querySelector(".popup__input_text_url-img");

// Create Template
const template = document.querySelector("#card-template").content.querySelector(".group__element"); //template
const groupCards = document.querySelector(".group"); // ul

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const enableValidation = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});


const enableValid = config => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
      if (popupFormTemplateEdit === formElement) {
        submitEditPopup();
        closePopup(popupEditWindow);
      } else {
        submitAddPopup();
        closePopup(popupAddWindow);
      }
    });
  });
  formList.forEach((formElement) => {
    setEventListeners(config, formElement);
  });
}

const setEventListeners = (config, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector)
    nameInput.value = titleAutor.textContent;
    jobInput.value = subtitleAutor.textContent;
    // чтобы проверить состояние кнопки в самом начале
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        toggleButtonState(inputList, buttonElement)
        checkInputValidity(formElement, inputElement);
      });
    });
  };

// Button
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_active');
    buttonElement.removeAttribute("disabled");
  } else {
    buttonElement.classList.remove('popup__button_active');
    buttonElement.setAttribute("disabled", "disabled");
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.every((inputElement) => {
  return inputElement.validity.valid;
});
};

// Input
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// показываем ошибки
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

// скрываем ошибки
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

