import Popup from './Popup';

export default class PopupAvatar extends Popup {
  constructor(popup, avatar, {api}) {
    super(popup);
    this._api = api;
    this._avatar = avatar;
    this._popupFormTemplate  = this._popup.querySelector(".popup__form");
    this._inputList = Array.from(this._popupFormTemplate.querySelectorAll(".popup__input"));
    this._button = this._popupFormTemplate.querySelector(".popup__button");
  }

  setEventListeners() {
    this._popupFormTemplate.addEventListener("submit", (evt) => {
    super._renderLoading (true)
    this._api(super._getInputValues())
      .then((res) => {
          this._avatar.src = res.avatar;
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        this._renderLoading (false)
        this.close(evt);
      })
    })
    super.setEventListeners();
  }

  _renderLoading (isLoading) { // Ожидание загрузки
    if (isLoading) {
      this._button.textContent = "Сохранение...";
    } else {
      this._button.textContent = "Сохранить";
    }
  }

  close() {
    this._popupFormTemplate.reset()
    super.close();
  }
}
