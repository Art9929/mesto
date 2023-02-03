const popupEditBtnOpen = document.querySelector(".profile__edit-button");
const popupAddBtnOpen = document.querySelector(".profile__add-button");

const popups = document.querySelectorAll(".popup");
const popupEditWindow = document.querySelector(".popup_edit");
const popupAddWindow = document.querySelector(".popup_add");
const popupImgWindow = document.querySelector(".popup_img");

const popupFormTemplateEdit = document.querySelector(".popup__form_template_edit");
const popupFormTemplateAdd = document.querySelector(".popup__form_template_add");

const titleAutor = document.querySelector(".profile__title");
const subtitleAutor = document.querySelector(".profile__subtitle");
const nameInput = document.querySelector(".popup__input_text_name");
const jobInput = document.querySelector(".popup__input_text_job");
const placeInput = document.querySelector(".popup__input_text_place");
const urlImgInput = document.querySelector(".popup__input_text_url-img");

// Create Template
const template = document.querySelector("#card-template").content.querySelector(".group__element"); //template
const groupCards = document.querySelector(".group"); // ul


// Functions
const openPopup = popup => {
  popup.classList.add("popup_opened");
}

const closePopup = popup => {
  popup.classList.remove("popup_opened");
}

function openEditPopup() {
  nameInput.value = titleAutor.textContent;
  jobInput.value = subtitleAutor.textContent;
  openPopup(popupEditWindow)
}

function openAddPopup() {
  openPopup(popupAddWindow)
}

// Submit Edit btn
popupFormTemplateEdit.addEventListener("submit", evt => {
  evt.preventDefault();
  titleAutor.textContent = nameInput.value;
  subtitleAutor.textContent = jobInput.value;
  closePopup(popupEditWindow);
})

// Create Card
function createCard(item) {
  // клонируем содержимое тега template
  const card = template.cloneNode(true);
  const image = card.querySelector(".group__image");
  // наполняем содержимым
  card.querySelector(".group__title").textContent = item.name;
  image.src = item.link;
  image.alt = item.name;

  // Удаление
  card.querySelector(".group__trash").addEventListener("click", () => {
    card.remove();
  });

  // Лайк
  card.querySelector(".group__vector").addEventListener("click", () => {
    card.querySelector(".group__vector").classList.toggle("group__vector_active");
  });

  // Попап Картинки
  image.addEventListener("click", () => {
    popupImgWindow.classList.add("popup_opened");
    const popupImgOpen = popupImgWindow.querySelector(".popup__image");
    const textImg = popupImgWindow.querySelector(".popup__title");
    popupImgOpen.src = item.link;
    popupImgOpen.alt = item.name;
    textImg.textContent = item.name;
  });

  return card;
}

// Submit Add btn
popupFormTemplateAdd.addEventListener('submit', evt => {
  evt.preventDefault();
  const newCardData = { name: placeInput.value,  link: urlImgInput.value };
  const card = createCard(newCardData);
  // отображаем на странице
  groupCards.prepend(card);

  placeInput.value = "";
  urlImgInput.value = "";
  closePopup(popupAddWindow);
});

// Template Cards
function renderCards(initialCards) {
  const cards = initialCards.map((initialCard) => {
    return createCard(initialCard);
  });
  // отображаем на странице
  groupCards.append(...cards);
}
renderCards(initialCards);

// Listener
popupEditBtnOpen.addEventListener("click", openEditPopup);
popupAddBtnOpen.addEventListener("click", openAddPopup);

// Close Btn
popups.forEach(popup => {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener('click', () => closePopup(popup));
})
