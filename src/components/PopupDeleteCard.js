import Popup from './Popup';

export default class PopupDeleteCard extends Popup {
  constructor(popup, {api} ) {
    super(popup);
    this._api = api;
    this._popupFormTemplate = this._popup.querySelector(".popup__form");
  }

  setEventListeners(item, templateCard) {
    super.open();
    this._popupFormTemplate.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._api(item._id)
      .then((res) => {
          console.log(res); // Пост удалён! удаление с сервера
          templateCard.remove() // удаление с фронта
          super.close(); // закрытие попапа
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });

  })
    super.setEventListeners()
  }
}
