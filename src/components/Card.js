export default class Card {
  constructor({item, catdTemplate, popupImgWindow, handleCardClick, handleDeleteClick, handleLikesClick}) {
    this._item = item;
    this._catdTemplate = catdTemplate;
    this._popupImgWindow = popupImgWindow;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikesClick = handleLikesClick;
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
    const trash = this._card.querySelector(".group__trash");
    const quantity = this._card.querySelector(".group__quantity");
    // наполняем содержимым
    this._card.querySelector(".group__title").textContent = this._item.name;
    image.src = this._item.link;
    image.alt = this._item.name;
    quantity.textContent = this._item.likes.length;

    // Вкл. Лайки
    const action = this._item.likes.some(function (likes) {
      return likes._id === "05feda113f169d7c5cb08d1c"; // сравниваем с моим id
    });
    if (action) like.classList.add("group__vector_active");

    // Вкл. Корзину
    if (this._item.owner._id === "05feda113f169d7c5cb08d1c") {
      trash.classList.remove("group__trash_disabled");
    }

    // Удаление / Лайк / Попап Картинки
    trash.addEventListener("click", () => { this._handleDeleteClick(this._card); });
    like.addEventListener ("click", (evt) => { evt.preventDefault(); this._handleLikesClick(this._card); });
    image.addEventListener("click", () => { this._handleCardClick() });

    return this._card;
  }
}
