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
    this._popupFormElement = popupFormElement;
  }

  enableValidation() {
    const formElement = this._popupFormElement.querySelector(this._config.formSelector);
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    this._setEventListeners(formElement);
  }

  _setEventListeners = (formElement) => {
    // Получаем input и button соответствующего попапа
    const inputList = Array.from(formElement.querySelectorAll(this._config.inputSelector));
    const buttonElement = formElement.querySelector(this._config.submitButtonSelector);

    // деактивируем кнопку при 1й загрузке сайта
    this._toggleButtonState(inputList, buttonElement);

    formElement.addEventListener('reset', () => {
      this._disableSubmitButton(buttonElement);
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
      this._disableSubmitButton(buttonElement);
    } else {
      this._enableSubmitButton(buttonElement);
    }
  };

  // Выкл Button
  _disableSubmitButton(buttonElement) {
    buttonElement.classList.add(this._config.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
  }

  // Вкл Button
  _enableSubmitButton(buttonElement) {
    buttonElement.classList.remove(this._config.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }

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
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  };

  // скрываем ошибки
  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  };
}
