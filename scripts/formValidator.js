
export default class FormValidator {
  constructor(config) {
    this._config = config;
    this._formSelector = this._config.formSelector;
    this.inputSelector = this._config.inputSelector;
    this.submitButtonSelector = this._config.submitButtonSelector;
    this.inactiveButtonClass = this._config.inactiveButtonClass;
    this.inputErrorClass = this._config.inputErrorClass;
    this.errorClass = this._config.errorClass;
  }

  _enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', evt => {
        evt.preventDefault();
      });
    });
    formList.forEach((formElement) => {
      this._setEventListeners(formElement);
    });
  }

  _setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(this.inputSelector));
    const buttonElement = formElement.querySelector(this.submitButtonSelector)

    // деактивируем кнопку при 1й загрузке сайта
    this._toggleButtonState(inputList, buttonElement);

    formElement.addEventListener('reset', () => {
      // `setTimeout` нужен для того, чтобы дождаться очищения формы (вызов уйдет в конце стэка) и только потом вызвать `toggleButtonState`
      setTimeout(() => {
        this._toggleButtonState(inputList, buttonElement);
      }, 0); // достаточно указать 0 миллисекунд, чтобы после `reset` уже сработало действие
    });

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input',  () => {
        this._toggleButtonState(inputList, buttonElement)
        this._checkInputValidity(formElement, inputElement);
      });
    });
  };

  // Button
  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this.inactiveButtonClass);
      buttonElement.setAttribute("disabled", "disabled");
    } else {
      buttonElement.classList.remove(this.inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // Input
  _checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  // показываем ошибки
  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.errorClass);
  };

  // скрываем ошибки
  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.inputErrorClass);
    errorElement.classList.remove(this.errorClass);
    errorElement.textContent = '';
  };
}
