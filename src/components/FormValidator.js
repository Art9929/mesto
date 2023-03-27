/*
  Создайте класс FormValidator, который настраивает валидацию полей формы:

  - принимает в конструктор объект настроек с селекторами и классами формы;
  - принимает вторым параметром элемент той формы, которая валидируется;
  - имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
  - имеет публичный метод enableValidation, который включает валидацию формы.

  Для каждой проверяемой формы создайте экземпляр класса FormValidator.
 */
export default class FormValidator {
  constructor(config, popupFormElement) {
    this._config = config; // далее берем значения из конфига
    this._popupFormElement = popupFormElement; // открытая форма
    this._formElement = this._popupFormElement.querySelector(this._config.formSelector); // popup__form
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector)); // inputs
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector); // button
  }

  enableValidation() {
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  _setEventListeners = () => {
    // деактивируем кнопку при 1й загрузке сайта
    this._toggleButtonState();

    this._formElement.addEventListener('reset', () => {
      this._disableSubmitButton();
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input',  () => {
        this._toggleButtonState()
        this._checkInputValidity(inputElement);
      });
    });
  };

  // Button
  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  };

  // Выкл Button
  _disableSubmitButton() {
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", "disabled");
  }

  // Вкл Button
  _enableSubmitButton() {
    this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    this._buttonElement.removeAttribute("disabled");
  }

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // Input
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  // показываем ошибки
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  };

  // скрываем ошибки
  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  };
}
