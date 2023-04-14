export default class Card {
  constructor({item, cardTemplate, popupImgWindow, userId, handleCardClick, handleDeleteClick, handleLikesClick}) {
    this._item = item;
    this._cardTemplate = cardTemplate;
    this._popupImgWindow = popupImgWindow;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikesClick = handleLikesClick;
  }

  _getTemplate() {
    return document
        .querySelector(this._cardTemplate)
        .content
        .querySelector('.group__element')
        .cloneNode(true);
  }

  createCard() {
    this._card = this._getTemplate();
    // клонируем содержимое тега template
    const image = this._card.querySelector(".group__image");
    this._like = this._card.querySelector(".group__vector");
    const trash = this._card.querySelector(".group__trash");
    this._quantity = this._card.querySelector(".group__quantity");
    // наполняем содержимым
    this._card.querySelector(".group__title").textContent = this._item.name;
    image.src = this._item.link;
    image.alt = this._item.name;
    this._quantity.textContent = this._item.likes.length;

    // Вкл. Лайки
    const userId = this._userId;
    const action = this._item.likes.some(function (likes) {
      return likes._id === userId; // сравниваем с моим id
    });
    if (action) this._like.classList.add("group__vector_active");

    // Вкл. Корзину
    if (this._item.owner._id === this._userId) {
      trash.classList.remove("group__trash_disabled");
    }
    // Удаление / Лайк / Попап Картинки
    trash.addEventListener("click", () => { this._handleDeleteClick(this); }); // прокидываешь в this весь объект карточки
    this._like.addEventListener ("click", (evt) => { evt.preventDefault(); this._handleLikesClick(this); });
    image.addEventListener("click", () => { this._handleCardClick() });

    return this._card;
  }

  setLikeStatus(data, templateLike) {
    this._item.likes = data.likes;
    this._quantity.textContent = data.likes.length;

    templateLike ? this._like.classList.add("group__vector_active") : this._like.classList.remove("group__vector_active");
  }

  removeCard() {
    this._card.remove();
    this._card = null;
  }
}
