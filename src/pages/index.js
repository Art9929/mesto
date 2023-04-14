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
  cardTemplate,
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

let userId = null;

Promise.all([                 //в Promise.all передаем массив промисов которые нужно выполнить
api.profile(),
api.getInitialCards() ])
  .then(([profile, initialCards])=>{    //попадаем сюда, когда оба промиса будут выполнены, деструктурируем ответ
// Берем ID
  userId = profile._id;
// Загрузка информации о себе
  userInfo.setUserInfo(profile)
// Карточки с сервера при открытии страницы
  list.renderItems(initialCards);
})
.catch((err)=>{  //попадаем сюда если один из промисов завершится ошибкой
  console.log(err);
 })

 // Валидация Форм
const formValidatorAdd = new FormValidator(config, popupAddWindow)
const formValidatorEdit = new FormValidator(config, popupEditWindow)
const formValidatorAvatar = new FormValidator(config, popupAvatarWindow)
formValidatorEdit.enableValidation(); // class formValidator
formValidatorAdd.enableValidation(); // class formValidator
formValidatorAvatar.enableValidation(); // class formValidator

// Информация о пользователе
const userInfo = new UserInfo( titleAutor, subtitleAutor, avatar ); // Данные для Edit
// ПОПАПЫ Картинки, Удаления, Edit, Add, Avatar,
const popupImage = new PopupWithImage(".popup_template_img");
const popupDeleteCard = new PopupDeleteCard(".popup_template_trash")

// Submit Edit btn
const popupEdit = new PopupWithForm(".popup_template_edit", { api: (item) =>  {
    api.editProfile(item)
    .then((res) => {
      // РЕНДЕРИНГ О СЕБЕ
      userInfo.setUserInfo(res);
      popupEdit.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      popupEdit.renderLoading(false)
    })
  }
});

// Submit Add btn
const popupAdd = new PopupWithForm(".popup_template_add", { api: (item) => {
    api.addNewCard(item)
    .then((res) => {
      // РЕНДЕРИНГ КАРТОЧКИ
      list.addItem(renderCard(res))
      popupAdd.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      popupAdd.renderLoading(false)
    })
  }
});

// Обработка и закрытие Попапа Аватарки
const popupAvatar = new PopupWithForm(".popup_template_avatar", { api: (item) => {
    api.changeAvatar(item)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      popupAvatar.renderLoading(false)
    })
  }
});

// card для рендеринга и submit
const renderCard = (item) => {
  const card = new Card({
    item,
    cardTemplate,
    popupImgWindow,
    userId,

    // передаешь через стрелочную функцию,
    // вызываешь как функцию () => this._data(),
    // либо как ссылку this._data
    handleCardClick: () => popupImage.open(item),

    handleDeleteClick: (card) => {
      popupDeleteCard.open();
    // Удаление карточки
      popupDeleteCard.data( () => {
        api.deleteCard(item._id)
        .then((res) => {
          card.removeCard() // удаление с фронта
          console.log(res); // Пост удалён! удаление с сервера
          popupDeleteCard.close();
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        })
      })
    },

    handleLikesClick: (card) => {
      item = card._item
      const action = item.likes.some(function (likes) {
        return likes._id === userId; // сравниваем с моим id
    });
      if (action === false) {
      api.addLike(item._id, item.likes) // Добавляем Лайк
        .then((data) => {
            card.setLikeStatus(data, true)
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    } else {
      api.deleteLike(item._id, item.likes) // Удаляем Лайк
        .then((data) => {
            card.setLikeStatus(data, false)
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
      }
     }
  });
  return card.createCard();
}

// РЕНДЕРИНГ КАРТОЧЕК
const list = new Section({
  renderer: (item) => {
    list.addItem(renderCard(item));
  }
  }, ".group");


// Открытие попапа Edit btn
popupEditBtnOpen.addEventListener("click", () => {
const data = userInfo.getUserInfo();
  // данные для попапа перед проверкой кнопки
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


// SETEVENTLISTENERS
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupAvatar.setEventListeners();
popupImage.setEventListeners();
popupDeleteCard.setEventListeners();


