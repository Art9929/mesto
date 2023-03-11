export default class Card {
  constructor(  initialCard, catdTemplate, openPopup ) {
    this._initialCard = initialCard;
    this._catdTemplate = catdTemplate;
    this._openPopup = openPopup
  }

  _getTemplate() {
      const cardElement = document
        .querySelector(this._catdTemplate)
        .content
        .querySelector('.group__element')
        .cloneNode(true);

      return cardElement;
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
      const popupImgWindow = document.querySelector(".popup_template_img");
      const popupImgOpen = popupImgWindow.querySelector(".popup__image");
      const textImg = popupImgWindow.querySelector(".popup__title");

      this._openPopup(popupImgWindow)
      popupImgOpen.src = this._initialCard.link;
      popupImgOpen.alt = this._initialCard.name;
      textImg.textContent = this._initialCard.name;
    });
    return this._card;
  }
}
