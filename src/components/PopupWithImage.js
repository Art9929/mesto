import Popup from './Popup';

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popupImgOpen = this._popup.querySelector(".popup__image");
    this._textImg = this._popup.querySelector(".popup__title");
  }

  open(item) {
    this._popupImgOpen.src = item.link;
    this._popupImgOpen.alt = item.name;
    this._textImg.textContent = item.name;
    super.open();
  }
}
