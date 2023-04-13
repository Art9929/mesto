import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(popup) {
    super(popup);
    this._popupFormTemplate  = this._popup.querySelector(".popup__form");
    this._inputList = Array.from(this._popupFormTemplate.querySelectorAll(".popup__input"));
    this._button = this._popupFormTemplate.querySelector(".popup__button");
  }

  // Сбор значиний в input
  _getInputValues() {
    // собираем данные всех полей формы.
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

// Ожидание загрузки
  _renderLoading (isLoading) {
    if (isLoading) {
      this._button.textContent = "Сохранение...";
    } else {
      this._button.textContent = "Создать";
    }
  }

  // Добавляем 3 обработчика на закрытие
  // Редактируем текст
  setEventListeners( {api} ) {
      this._popupFormTemplate.addEventListener("submit", (evt) => {
        this._renderLoading (true)

        // Сервер
        api(this._getInputValues())
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
          })
        .finally(() => {
          this._renderLoading (false)
          this.close(evt);
        })
    })
    super.setEventListeners()
  }

  close() {
    this._popupFormTemplate.reset()
    super.close();
  }
}
