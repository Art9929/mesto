import './index.css';
import {
  popupEditBtnOpen,
  popupAddBtnOpen,
  // popups,
  popupEditWindow,
  popupAddWindow,
  popupAvatarWindow,
  titleAutor,
  subtitleAutor,
  titleInput,
  jobInput,
  // popupFormTemplateEdit,
  // popupFormTemplateAdd,
  popupImgWindow,
  popupImgOpen,
  textImg,
  // placeInput,
  // urlImgInput,
  catdTemplate,
  avatar
} from '../utils/selectors.js';
// import items from "../utils/constants.js" // default cards
import config from "../utils/config.js"
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDeleteCard from '../components/PopupDeleteCard';
import PopupAvatar from '../components/PopupAvatar';
import Likes from '../components/Likes.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';


// подключение к API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: 'cae42bd9-08a7-4ce1-b408-eabcb666728e',
    'Content-Type': 'application/json'
  }
});
// =============================================================

// Карточки с сервера при открытии страницы
api.getInitialCards()
  .then((itemsApi) => {
    listCards(itemsApi).renderItems();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

// Данные с сервера при открытии страницы
api.profile()
  .then((res) => {
    // Загрузка аватара
    avatar.src = res.avatar;
    // Загрузка input в edit
    titleAutor.textContent = res.name;
    subtitleAutor.textContent = res.about;
    titleInput.value = res.name;
    jobInput.value = res.about;
  });

// Валидация Форм
const formValidatorAdd = new FormValidator(config, popupAddWindow)
const formValidatorEdit = new FormValidator(config, popupEditWindow)
const formValidatorAvatar = new FormValidator(config, popupAvatarWindow)
formValidatorEdit.enableValidation(); // class formValidator
formValidatorAdd.enableValidation(); // class formValidator
formValidatorAvatar.enableValidation(); // class formValidator

// Попап Картинки
const popupImage = new PopupWithImage(".popup_template_img"); // Передаю селектор модального окна
// Попап Удаления
const popupDeleteCard = new PopupDeleteCard(".popup_template_trash",  {api: (item) => api.deleteCard(item)})
// Лайки
const changeLikes = new Likes({apiAddLike: (id, likes) => api.addLike(id, likes), apiDeleteLike: (id, likes) => api.deleteLike(id, likes)} )
// Попапы Edit Add Avatar
const popupEdit = new PopupWithForm(".popup_template_edit", { api: (item) => api.editProfile(item), submitCallback:  (obj) => userInfo.setUserInfo(obj) })
const popupAdd = new PopupWithForm(".popup_template_add", { api: (item) => api.addNewCard(item), submitCallback: (obj) => listCards(obj).addItem(renderCard(obj)) })
const popupAvatar = new PopupAvatar(".popup_template_avatar", avatar, {api: (item) => api.changeAvatar(item)})

// card для рендеринга и submit
const renderCard = (item) => {
  const card = new Card({
    item,
    catdTemplate,
    popupImgWindow,

    // передаешь через стрелочную функцию,
    // вызываешь как функцию () => this._data(),
    // либо как ссылку this._data
    handleCardClick: () => popupImage.open(item),
    handleDeleteClick: (templateCard) => popupDeleteCard.setEventListeners(item, templateCard),
    handleLikesClick: (templateCard) => { changeLikes.changeLikes(item, templateCard) }
  });
  const newCard = card.createCard();
  return newCard;
}

// РЕНДЕРИНГ КАРТОЧЕК
const listCards = (itemsApi) => {
  const list = new Section({
    data: itemsApi,
    renderer: (item) => {
      list.addItem(renderCard(item));
    }
    }, ".group");

    return list;
}

// Открытие попапа Edit btn
const userInfo = new UserInfo( titleAutor, subtitleAutor ); // Данные для Edit
popupEditBtnOpen.addEventListener("click", () => {
  // данные для попапа перед проверкой кнопки
  const data = userInfo.getUserInfo();
  titleInput.value = data.titleAutor;
  jobInput.value = data.subtitleAutor;
  // Кнопка
  formValidatorEdit._toggleButtonState()
  popupEdit.open()
});
// Открытие попапа Add btn
popupAddBtnOpen.addEventListener("click", () => {
  popupAdd.open()
});
// Открытие попапа Avatar
avatar.addEventListener("click", () => {
  popupAvatar.open()
});

// Submit Edit btn
popupEdit.setEventListeners();
// Submit Add btn
popupAdd.setEventListeners();
// Обработка и закрытие Попапа Картинки
popupImage.setEventListeners();
// Обработка и закрытие Попапа Аватарки
popupAvatar.setEventListeners();

