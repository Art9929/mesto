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
const template = document.querySelector("#card-template").content.querySelector(".group__element"); //template
const groupCards = document.querySelector(".group"); // ul

// Functions
const openPopup = popup => {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEscape(popup));
}

const closePopup = popup => {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeByEscape(popup));
}

function openEditPopup() {
  openPopup(popupEditWindow)
}

function openAddPopup() {
  openPopup(popupAddWindow)
}

function data() {
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
  const newCardData = { name: placeInput.value,  link: urlImgInput.value };
  const card = createCard(newCardData);
  const buttonAddElement = popupFormTemplateAdd.querySelector('.popup__button')
  // отображаем на странице
  groupCards.prepend(card);
  // отключаем кнопку после добавления картинки
  buttonAddElement.classList.add('popup__button_disabled');
  buttonAddElement.setAttribute("disabled", "disabled");

  e.target.reset();
  closePopup(popupAddWindow);
});

// Create Card
function createCard(item) {
  // клонируем содержимое тега template
  const card = template.cloneNode(true);
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
    openPopup(popupImgWindow)
    popupImgOpen.src = item.link;
    popupImgOpen.alt = item.name;
    textImg.textContent = item.name;
  });
  return card;
}

// Template Cards
function renderCards(initialCards) {
  const cards = initialCards.map((initialCard) => {
    return createCard(initialCard);
  });
  // отображаем на странице
  groupCards.append(...cards);
}

// Listener
popupEditBtnOpen.addEventListener("click", openEditPopup);
popupAddBtnOpen.addEventListener("click", openAddPopup);

// Close Btn/Overlay
popups.forEach((popup) => {
  // mousedown - что бы не закрыть случайно по оверлею, при переносе курсора с формы
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
          closePopup(popup)
        }
    })
})

// Close Esc
function closeByEscape(popup) {
  return function(evt) {
  if (evt.key === 'Escape') {
    closePopup(popup)
  }}
}

data(); // данные для попапа перед проверкой кнопки
renderCards(initialCards);
enableValidation(config);
