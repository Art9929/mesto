let popupBtnOpen = document.querySelector(".info__edit-button");
let popupWindow =   document.querySelector(".popup");
let popupBtnClose = document.querySelector(".popup__close");
let titleAutor =  document.querySelector(".info__title");
let subtitleAutor =  document.querySelector(".info__subtitle");
// Находим форму в DOM
// Находим поля формы в DOM
let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input_text_name");
let jobInput = document.querySelector(".popup__input_text_job");

popupBtnOpen.addEventListener("click", openPopup);
popupBtnClose.addEventListener("click", closePopup);

function openPopup() {
  popupWindow.classList.add("popup_opened");
  nameInput.value = titleAutor.textContent;
  jobInput.value = subtitleAutor.textContent;
}

function closePopup() {
  popupWindow.classList.remove("popup_opened");
}

// Yandex
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                          // Так мы можем определить свою логику отправки.
                          // О том, как это делать, расскажем позже.

// Получите значение полей jobInput и nameInput из свойства value
  nameInput.value;
  jobInput.value;
// Вставьте новые значения с помощью textContent
  titleAutor.textContent = nameInput.value;
  subtitleAutor.textContent = jobInput.value;
  closePopup()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
