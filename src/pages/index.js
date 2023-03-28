import './index.css';
import {
  popupEditBtnOpen,
  popupAddBtnOpen,
  popups,
  popupEditWindow,
  popupAddWindow,
  titleAutor,
  subtitleAutor,
  titleInput,
  jobInput,
  popupFormTemplateEdit,
  popupFormTemplateAdd,
  popupImgWindow,
  popupImgOpen,
  textImg,
  // placeInput,
  // urlImgInput,
  catdTemplate,
  groupCards
} from '../utils/selectors.js';
import items from "../utils/constants.js"
import config from "../utils/config.js"
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

// Данные при первом открытии
titleInput.value = titleAutor.textContent;
jobInput.value = subtitleAutor.textContent;

// Попап Картинки
const popupImage = new PopupWithImage(".popup_template_img"); // Передаю селектор модального окна
// Закрытие Попапа Картинки
popupImage.setEventListeners();
// card для рендеринга и submit
const renderCard = (item) => {
  const card = new Card({
    item,
    catdTemplate,
    popupImgWindow,

    // передаешь через стрелочную функцию,
    // вызываешь как функцию () => this._data(),
    // либо как ссылку this._data
    handleCardClick: () => popupImage.open(item)
  });
  const newCard = card.createCard();
  return newCard;
}

// РЕНДЕРИНГ КАРТОЧЕК
const list = new Section({
data: items,
renderer: (item) => {
  list.addItem(renderCard(item));
}
}, ".group");

list.renderItems();

// ОТКРЫТИЕ ПОПАПА и SUBMIT ФОРМЫ
// Class
const formValidatorAdd = new FormValidator(config, popupAddWindow)
const formValidatorEdit = new FormValidator(config, popupEditWindow)
formValidatorEdit.enableValidation(); // class formValidator
formValidatorAdd.enableValidation(); // class formValidator

// Listener
const popupEdit = new PopupWithForm(".popup_template_edit", { submitCallback:  (obj) => userInfo.setUserInfo(obj) })
const popupAdd = new PopupWithForm(".popup_template_add", { submitCallback: (obj) => list.addItem(renderCard(obj)) })
// Данные
const userInfo = new UserInfo( titleAutor, subtitleAutor );

popupEditBtnOpen.addEventListener("click", () => {
  // данные для попапа перед проверкой кнопки
  const data = userInfo.getUserInfo();
  titleInput.value = data.titleAutor;
  jobInput.value = data.subtitleAutor;
  // Кнопка
  formValidatorEdit._toggleButtonState()
  popupEdit.open()
});
popupAddBtnOpen.addEventListener("click", () => {
  popupAdd.open()
});

// Submit Edit btn
popupEdit.setEventListeners();
// Submit Add btn
popupAdd.setEventListeners();
