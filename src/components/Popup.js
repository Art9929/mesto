export default class Popup {
  constructor(popup) {
    this._popup = document.querySelector(popup);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Close Esc
  _handleEscClose (evt) {
      if (evt.key === 'Escape') this.close()
    }

  // Close Btn/Overlay
  setEventListeners() {
    // mousedown - что бы не закрыть случайно по оверлею, при переносе курсора с формы
      this._popup.addEventListener('mousedown', (evt) => {
          if (
            evt.target.classList.contains('popup_opened')
            ||
            evt.target.classList.contains('popup__close')
            )
            {  this.close() }
      })
  }
}
