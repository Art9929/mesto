import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(popup, {api,  submitCallback } ) {
    super(popup);
    this._api = api;
    this._popupFormTemplate  = this._popup.querySelector(".popup__form");
    this._inputList = Array.from(this._popupFormTemplate.querySelectorAll(".popup__input"));
    this._button = this._popupFormTemplate.querySelector(".popup__button");
    this._submitCallback = submitCallback;
  }

  // Добавляем 3 обработчика на закрытие
  // Редактируем текст
  setEventListeners() {
      this._popupFormTemplate.addEventListener("submit", (evt) => {
        super._renderLoading (true)
        this._api(super._getInputValues())
        .then((res) => {
          // РЕНДЕРИНГ КАРТОЧКИ / О СЕБЕ
          this._submitCallback(res);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
          this._renderLoading (false)
          this.close(evt);
        })
    })
    super.setEventListeners()
  }

  close() {
    this._popupFormTemplate.reset()
    super.close();
  }
}
