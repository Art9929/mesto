export default class Card {
  constructor( initialCard, catdTemplate, openPopup, popupImgWindow, popupImgOpen, textImg ) {
    this._initialCard = initialCard;
    this._catdTemplate = catdTemplate;
    this._openPopup = openPopup;
    this._popupImgOpen = popupImgOpen;
    this._textImg = textImg;
    this._popupImgWindow = popupImgWindow;
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
    // наполняем содержимым
    this._card.querySelector(".group__title").textContent = this._initialCard.name;
    image.src = this._initialCard.link;
    image.alt = this._initialCard.name;

    // Удаление
    this._card.querySelector(".group__trash").addEventListener("click", () => {
      this._card.remove();
    });

    // Лайк
    like.addEventListener("click", () => {
      like.classList.toggle("group__vector_active");
    });

    // Попап Картинки
    image.addEventListener("click", () => {


      this._openPopup(this._popupImgWindow)
      this._popupImgOpen.src = this._initialCard.link;
      this._popupImgOpen.alt = this._initialCard.name;
      this._textImg.textContent = this._initialCard.name;
    });
    return this._card;
  }
}
