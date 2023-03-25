import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(popup, { submitSlice }, popupFormTemplate ) {
    super(popup);
    this._submitSlice = submitSlice;
    this._popupFormTemplate  = popupFormTemplate ;
  }

  _getInputValues() {
    // собираем данные всех полей формы.
   this._submitSlice();
  }

  // Добавляем 3 обработчика на закрытие
  // Редактируем текст
  setEventListeners() {
      this._popupFormTemplate.addEventListener("submit", (evt) => {
      this._getInputValues();
      this.close(evt);
    })

    super.setEventListeners()
  }

  close() {
    this._popupFormTemplate.reset()
    super.close();
  }
}
