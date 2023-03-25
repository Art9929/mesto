import Popup from './Popup';

export default class PopupWithImage extends Popup {
  constructor(popup, item, popupImgOpen, textImg) {
    super(popup);
    this._item = item;
    this._popupImgOpen = popupImgOpen;
    this._textImg = textImg;
  }

  open() {
    this._popupImgOpen.src = this._item.link;
    this._popupImgOpen.alt = this._item.name;
    this._textImg.textContent = this._item.name;
    super.open();
    super.setEventListeners();
  }
}
