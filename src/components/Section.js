export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);;
  }

  addItem(item) {
    this._container.prepend(item);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems(initialCards) {
    this.clear();
    initialCards.forEach(item => {
      this._renderer(item);
    });
  }
}
