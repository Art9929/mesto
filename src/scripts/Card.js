export default class Card {
  constructor({item, catdTemplate, popupImgWindow, handleCardClick}) {
    this._item = item;
    this._catdTemplate = catdTemplate;
    this._popupImgWindow = popupImgWindow;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
        .querySelector(this._catdTemplate)
        .content
        .querySelector('.group__element')
        .cloneNode(true);
  }

  createCard() {
    this._card = this._getTemplate();
    // клонируем содержимое тега template
    const image = this._card.querySelector(".group__image");
    const like = this._card.querySelector(".group__vector");
    const trash = this._card.querySelector(".group__trash")
    // наполняем содержимым
    this._card.querySelector(".group__title").textContent = this._item.name;
    image.src = this._item.link;
    image.alt = this._item.name;

    // Удаление / Лайк / Попап Картинки
    trash.addEventListener("click", () => { this._card.remove(); });
    like.addEventListener ("click", () => { like.classList.toggle("group__vector_active"); });
    image.addEventListener("click", () => { this._handleCardClick() });

    return this._card;
  }
}
