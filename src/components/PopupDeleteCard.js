import Popup from './Popup';

export default class PopupDeleteCard extends Popup {
  constructor(popup) {
    super(popup);
    this._popupFormTemplate = this._popup.querySelector(".popup__form");
  }

  data(action) {
    this._handleSubmitCallback = action;
  }

  setEventListeners() {
    this._popupFormTemplate.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
  })
    super.setEventListeners()
  }
}
