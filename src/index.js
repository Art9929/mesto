import {
  popupEditBtnOpen,
  popupAddBtnOpen,
  popups,
  popupEditWindow,
  popupAddWindow,
  titleAutor,
  subtitleAutor,
  nameInput,
  jobInput,
  popupFormTemplateEdit,
  popupFormTemplateAdd,
  popupImgWindow,
  popupImgOpen,
  textImg,
  placeInput,
  urlImgInput,
  catdTemplate,
  groupCards
} from './utils/selectors.js';
import items from "./utils/constants.js"
import config from "./scripts/config.js"
import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import Section from "./scripts/Section.js";
import Popup from "./scripts/Popup.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import PopupWithForm from './scripts/PopupWithForm.js';
import UserInfo from './scripts/UserInfo.js';


// card для рендеринга и submit
const card = (item) => {
  const popupImage = new PopupWithImage(popupImgWindow, item, popupImgOpen, textImg);
  const card = new Card({
    item,
    catdTemplate,
    popupImgWindow,

    // передаешь через стрелочную функцию,
    // вызываешь как функцию () => this._data(),
    // либо как ссылку this._data
    handleCardClick: () => popupImage.open()
  });
  const newCard = card.createCard();
  return newCard;
}

// РЕНДЕРИНГ КАРТОЧЕК
const list = new Section({
data: items,
renderer: (item) => {
  list.addItem(card(item));
}
}, groupCards);

list.renderItems();

// Данные
const userInfo = new UserInfo( titleAutor, subtitleAutor );

// ОТКРЫТИЕ ПОПАПА
// Class
const formValidatorAdd = new FormValidator(config, popupAddWindow)
const formValidatorEdit = new FormValidator(config, popupEditWindow)
// Listener
const popupEdit = new Popup(popupEditWindow)
const popupAdd = new Popup(popupAddWindow)

popupEditBtnOpen.addEventListener("click", () => {
  // данные для попапа перед проверкой кнопки
  nameInput.value = userInfo.getUserInfo().titleAutor;
  jobInput.value = userInfo.getUserInfo().subtitleAutor;
  // открытие и валидация попапа
  popupEdit.open()
  formValidatorEdit.enableValidation(); // class formValidator
});
popupAddBtnOpen.addEventListener("click", () => {
  popupAdd.open()
  formValidatorAdd.enableValidation(); // class formValidator
});


// SUBMIT ФОРМЫ
// // Редактирование имени
// function submitSliceEdit () {
//   titleAutor.textContent = nameInput.value;
//   subtitleAutor.textContent = jobInput.value;
// }
// Загрузка картинки
const img = new URL(urlImgInput.value, import.meta.url);
function submitSlice () {
  const item = { name: placeInput.value,  link: urlImgInput.value };
  // отображаем на странице
  groupCards.prepend(card(item));
}


const submitPopupEdit = new PopupWithForm(popupEditWindow, { submitSlice: () => userInfo.setUserInfo(nameInput, jobInput)}, popupFormTemplateEdit)
const submitPopupAdd = new PopupWithForm(popupAddWindow, { submitSlice }, popupFormTemplateAdd);

// Submit Edit btn
submitPopupEdit.setEventListeners();
// Submit Add btn
submitPopupAdd.setEventListeners();


// CSS
import './pages/index.css'; // добавьте импорт главного файла стилейimport Section from './scripts/Section.js';

