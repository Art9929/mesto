// Import
import initialCards from "./constants.js"
import config from "./config.js"
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const popupEditBtnOpen = document.querySelector(".profile__edit-button");
const popupAddBtnOpen = document.querySelector(".profile__add-button");

const popups = document.querySelectorAll(".popup");
const popupEditWindow = document.querySelector(".popup_template_edit");
const popupAddWindow = document.querySelector(".popup_template_add");

const titleAutor = document.querySelector(".profile__title");
const subtitleAutor = document.querySelector(".profile__subtitle");
const nameInput = document.querySelector(".popup__input_text_name");
const jobInput = document.querySelector(".popup__input_text_job");

const popupFormTemplateEdit = document.querySelector(".popup__form_template_edit");
const popupFormTemplateAdd = document.querySelector(".popup__form_template_add");

const popupImgWindow = document.querySelector(".popup_template_img");
const popupImgOpen = popupImgWindow.querySelector(".popup__image");
const textImg = popupImgWindow.querySelector(".popup__title");

const placeInput = document.querySelector(".popup__input_text_place");
const urlImgInput = document.querySelector(".popup__input_text_url-img");

// Create Template
const catdTemplate = "#card-template";
const groupCards = document.querySelector(".group"); // ul

// Functions
const openPopup = popup => {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEscape);
}

const closePopup = popup => {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeByEscape);
}

function openEditPopup() {
  openPopup(popupEditWindow)
}

function openAddPopup() {
  openPopup(popupAddWindow)
}

function createdData() {
  nameInput.value = titleAutor.textContent;
  jobInput.value = subtitleAutor.textContent;
}

// Submit Edit btn
popupFormTemplateEdit.addEventListener("submit", () => {
  titleAutor.textContent = nameInput.value;
  subtitleAutor.textContent = jobInput.value;
  closePopup(popupEditWindow);
});

// Submit Add btn
popupFormTemplateAdd.addEventListener("submit", (e) => {
  const initialCard = { name: placeInput.value,  link: urlImgInput.value };
  const newCard = renderTemplateCards(initialCard); // class Card
  // отображаем на странице
  groupCards.prepend(newCard);

  e.target.reset(); // запускает событие reset, а оно запускает деактивацию в FormValidation.js
  closePopup(popupAddWindow);
});

// Template Cards
function renderCards(initialCards) {
  const cards = initialCards.forEach((initialCard) => {
    const newCard = renderTemplateCards(initialCard);  // class Card
    // отображаем на странице
    groupCards.append(newCard);
  });
}

// Class Card.js
function renderTemplateCards(initialCard) {
  const card = new Card(initialCard, catdTemplate, openPopup, popupImgWindow, popupImgOpen, textImg);
  const newCard = card.createCard();
  return newCard;
}

// Listener
popupEditBtnOpen.addEventListener("click", openEditPopup);
popupAddBtnOpen.addEventListener("click", openAddPopup);

// Close Btn/Overlay
popups.forEach((popup) => {
  // mousedown - что бы не закрыть случайно по оверлею, при переносе курсора с формы
    popup.addEventListener('mousedown', (evt) => {
        if (
          evt.target.classList.contains('popup_opened')
          ||
          evt.target.classList.contains('popup__close')
          )
          { closePopup(popup) }
    })
})

// Close Esc
const closeByEscape = evt => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

// Class
const formValidatorAdd = new FormValidator(config, popupAddWindow)
const formValidatorEdit = new FormValidator(config, popupEditWindow)
formValidatorAdd.enableValidation(); // class formValidator
formValidatorEdit.enableValidation(); // class formValidator

createdData(); // данные для попапа перед проверкой кнопки
renderCards(initialCards);
