import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(popup, { api }) {
    super(popup);
    this._popupFormTemplate  = this._popup.querySelector(".popup__form");
    this._inputList = Array.from(this._popupFormTemplate.querySelectorAll(".popup__input"));
    this._button = this._popupFormTemplate.querySelector(".popup__button");
    this._api = api;
  }

  // Добавляем 3 обработчика на закрытие
  // Редактируем текст
  setEventListeners() {
      this._popupFormTemplate.addEventListener("submit", () => {
        this.renderLoading (true)
        // Сервер
        this._api(this._getInputValues())
      })
      super.setEventListeners()
    }
  close() {
    this._popupFormTemplate.reset()
    super.close();
  }

  // Сбор значиний в input
  _getInputValues() {
    // собираем данные всех полей формы.
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

// Ожидание загрузки
  renderLoading (isLoading) {
    if (isLoading) {
      this._button.textContent = "Сохранение...";
    } else {
      this._button.textContent = "Создать";
    }
  }
}
