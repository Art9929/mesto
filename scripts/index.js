let popupEditBtnOpen = document.querySelector(".profile__edit-button");
let popupAddBtnOpen = document.querySelector(".profile__add-button");
let popupWindow =   document.querySelector(".popup");
let popupBtnClose = document.querySelector(".popup__close");
let titleAutor =  document.querySelector(".profile__title");
let subtitleAutor =  document.querySelector(".profile__subtitle");

// Находим форму в DOM и находим поля формы в DOM
let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input_text_name");
let jobInput = document.querySelector(".popup__input_text_job");

function openEditPopup() {
  popupWindow.classList.add("popup_opened");
  nameInput.value = titleAutor.textContent;
  jobInput.value = subtitleAutor.textContent;
}

function openAddPopup() {
  popupWindow.classList.add("popup_opened");
  console.log(1230);
}

function closePopup() {
  popupWindow.classList.remove("popup_opened");
}

function handleFormSubmit (evt) {
  evt.preventDefault();

  // Получите значение полей jobInput и nameInput из свойства value
  titleAutor.textContent = nameInput.value;
  subtitleAutor.textContent = jobInput.value;
  closePopup()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

// Listener
popupEditBtnOpen.addEventListener("click", openEditPopup);
popupAddBtnOpen.addEventListener("click", openAddPopup);
popupBtnClose.addEventListener("click", closePopup);


// Likes
likeBtn = document.querySelector('.group__vector');
likeBtn.addEventListener("click", () => {
  likeBtn.classList.toggle("group__vector_active");
})
