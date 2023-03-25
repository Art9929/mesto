export default class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  open() {
      this._popup.classList.add("popup_opened");
      document.addEventListener('keydown', (evt) => {
        this._handleEscClose(evt)
    });
  }

    close() {
      this._popup.classList.remove("popup_opened");
      document.removeEventListener('keydown', (evt) => {
        this._handleEscClose(evt)
    });
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
