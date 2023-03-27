import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(popup, { submitCallback }) {
    super(popup);
    this._popupFormTemplate  = this._popup.querySelector(".popup__form");
    this._inputList = Array.from(this._popupFormTemplate.querySelectorAll(".popup__input"));
    this._submitCallback = submitCallback;
  }

  _getInputValues() {
    // собираем данные всех полей формы.
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  // Добавляем 3 обработчика на закрытие
  // Редактируем текст
  setEventListeners() {
      this._popupFormTemplate.addEventListener("submit", (evt) => {
      this._submitCallback(this._getInputValues());
      this.close(evt);
    })

    super.setEventListeners()
  }

  close() {
    this._popupFormTemplate.reset()
    super.close();
  }
}
