const popupEditBtnOpen = document.querySelector(".profile__edit-button");
const popupAddBtnOpen = document.querySelector(".profile__add-button");

const popups = document.querySelectorAll(".popup");
const popupEditWindow = document.querySelector(".popup_edit");
const popupAddWindow = document.querySelector(".popup_add");
const popupImgWindow = document.querySelector(".popup_template_img");
const popupImgOpen = popupImgWindow.querySelector(".popup__image");
const textImg = popupImgWindow.querySelector(".popup__title");

const titleAutor = document.querySelector(".profile__title");
const subtitleAutor = document.querySelector(".profile__subtitle");
const nameInput = document.querySelector(".popup__input_text_name");
const jobInput = document.querySelector(".popup__input_text_job");

const popupFormTemplateEdit = document.querySelector(".popup__form_template_edit");
const popupFormTemplateAdd = document.querySelector(".popup__form_template_add");

const placeInput = document.querySelector(".popup__input_text_place");
const urlImgInput = document.querySelector(".popup__input_text_url-img");

// Create Template
const groupCards = document.querySelector(".group"); // ul


export default class Card {
  constructor( { initialCards, template } ) {
    this._initialCards = initialCards;
    this._template = template;
  }
  // Functions
  _openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener('keydown', this._closeByEscape);
  }

  _closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', this._closeByEscape);
  }

  _openEditPopup() {
    this._openPopup(popupEditWindow)
  }

  _openAddPopup() {
    this._openPopup(popupAddWindow)
  }

  _editText() {
    nameInput.value = titleAutor.textContent;
    jobInput.value = subtitleAutor.textContent;
  }

  // Submit Edit btn
  _popupFormTemplateEdit() {
    popupFormTemplateEdit.addEventListener("submit", () => {
      titleAutor.textContent = nameInput.value;
      subtitleAutor.textContent = jobInput.value;
      this._closePopup(popupEditWindow);
    });
  }

  // Submit Add btn
  _popupFormTemplateAdd() {
    popupFormTemplateAdd.addEventListener("submit", (e) => {
      const newCardData = { name: placeInput.value,  link: urlImgInput.value };
      const card = this._createCard(newCardData);
      // отображаем на странице
      groupCards.prepend(card);

      e.target.reset(); // запускает событие reset, а оно запускает деактивацию в validate.js
      this._closePopup(popupAddWindow);
    });
  }

  // Create Card
  _createCard(item) {
    // клонируем содержимое тега template
    const card = this._template.content.querySelector(".group__element").cloneNode(true);
    const image = card.querySelector(".group__image");
    const like = card.querySelector(".group__vector");
    // наполняем содержимым
    card.querySelector(".group__title").textContent = item.name;
    image.src = item.link;
    image.alt = item.name;

    // Удаление
    card.querySelector(".group__trash").addEventListener("click", () => {
      card.remove();
    });

    // Лайк
    like.addEventListener("click", () => {
      like.classList.toggle("group__vector_active");
    });

    // Попап Картинки
    image.addEventListener("click", () => {
      this._openPopup(popupImgWindow)
      popupImgOpen.src = item.link;
      popupImgOpen.alt = item.name;
      textImg.textContent = item.name;
    });
    return card;
  }

  // Template Cards
  renderCards() {
    this._editText(); // данные для попапа перед проверкой кнопки
    this._popupFormTemplateEdit()   // Submit Edit btn
    this._popupFormTemplateAdd()    // Submit Add btn

    const cards = this._initialCards.map((initialCard) => {
      return this._createCard(initialCard);
    });
    // отображаем на странице
    groupCards.append(...cards);

    this._popupEditBtnOpen();   // Listener
    this._popupAddBtnOpen();    // Listener
    this._popups();   // Close Btn/Overlay
  }

  // Listener
  _popupEditBtnOpen () {
    popupEditBtnOpen.addEventListener("click", () => {
      this._openEditPopup();
    });
  }
  _popupAddBtnOpen () {
    popupAddBtnOpen.addEventListener("click", () => {
      this._openAddPopup();
    });
  }

  // Close Btn/Overlay
  _popups = () => {
    popups.forEach((popup) => {
      // mousedown - что бы не закрыть случайно по оверлею, при переносе курсора с формы
      popup.addEventListener('mousedown', (evt) => {
          if (evt.target.classList.contains('popup_opened')) {
            this._closePopup(popup)
          }
          if (evt.target.classList.contains('popup__close')) {
            this._closePopup(popup)
          }
      })
    })
  }

  // Close Esc
  _closeByEscape = evt => {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened')
      this._closePopup(openedPopup)
    }
  }

}
