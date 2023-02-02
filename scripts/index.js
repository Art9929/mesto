const popupEditBtnOpen = document.querySelector(".profile__edit-button");
const popupAddBtnOpen = document.querySelector(".profile__add-button");

const popupWindow = document.querySelectorAll(".popup");
const popupEditWindow = document.querySelector(".popup_edit");
const popupAddWindow = document.querySelector(".popup_add");
const popupImgWindow = document.querySelector(".popup_img");

const popupBtnClose = document.querySelectorAll(".popup__close");

const titleAutor = document.querySelector(".profile__title");
const subtitleAutor = document.querySelector(".profile__subtitle");

// Находим форму в DOM и находим поля формы в DOM
// const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_text_name");
const jobInput = document.querySelector(".popup__input_text_job");
const placeInput = document.querySelector(".popup__input_text_place");
const urlImgInput = document.querySelector(".popup__input_text_url-img");
const saveBtn = document.querySelectorAll(".popup__button");

function openEditPopup() {
  popupEditWindow.classList.add("popup_opened");
  nameInput.value = titleAutor.textContent;
  jobInput.value = subtitleAutor.textContent;
  return openPopup()
}

function openAddPopup() {
  popupAddWindow.classList.add("popup_opened");
  return openPopup()
}

function openPopup() {
  for (let i = 0; i < popupWindow.length; i++) {
    popupBtnClose[i].addEventListener("click", closePopup);
    saveBtn[0].addEventListener("click", handleFormSubmit);
  }
}

function closePopup() {
  for (let i = 0; i < popupWindow.length; i++) {
    popupWindow[i].classList.remove("popup_opened")
    popupWindow[i].classList.add("popup__transition")
  }
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  // Значение полей jobInput и nameInput из свойства value
  titleAutor.textContent = nameInput.value;
  subtitleAutor.textContent = jobInput.value;
  closePopup();
}

// Cards
const initialCards = [
  {
    name: "Карачаевск",
    link: "./images/karachevsk.jpg",
  },
  {
    name: "Гора Эльбрус",
    link: "./images/elbrus.jpg",
  },
  {
    name: "Домбай",
    link: "./images/dombai.jpg",
  },
  {
    name: "Челябинская область",
    link: "./images/chelyabinsk_oblast.jpg",
  },
  {
    name: "Камчатка",
    link: "./images/kamchatka.jpg",
  },
  {
    name: "Карачаево-Черкесия",
    link: "./images/karachevsk.jpg",
  },
];

// Create Template
const template = document
  .querySelector("#card-template")
  .content.querySelector(".group__element"); //template
const groupCards = document.querySelector(".group"); // ul

// Create Card
function createCard(item) {
  // клонируем содержимое тега template
  const card = template.cloneNode(true);
  // наполняем содержимым
  card.querySelector(".group__title").textContent = item.name;
  card.querySelector(".group__image").src = item.link;
  card.querySelector(".group__image").alt = item.name;

  // Удаление
  card.querySelector(".group__trash").addEventListener("click", () => {
    card.remove();
  });

  // Лайк
  card.querySelector(".group__vector").addEventListener("click", () => {
    card.querySelector(".group__vector").classList.toggle("group__vector_active");
  });

  // Попап Картинки
  card.querySelector(".group__image").addEventListener("click", () => {
    popupImgWindow.classList.add("popup_opened");
    const popupImgOpen = popupImgWindow.querySelector(".group__image");
    const textImg = popupImgWindow.querySelector(".group__title");
    popupImgOpen.src = item.link;
    popupImgOpen.alt = item.name;
    popupImgOpen.classList.add("group__image_active");
    textImg.textContent = item.name;
    textImg.classList.add("group__title_active");
    popupBtnClose[2].addEventListener("click", closePopup);
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

renderCards(initialCards);

// Add Card
saveBtn[1].addEventListener('click', (evt) => {
  evt.preventDefault();
  const arr = { name: placeInput.value,  link: urlImgInput.value };
  const card = createCard(arr);
  // отображаем на странице
  groupCards.prepend(card);

  placeInput.value = "";
  urlImgInput.value = "";
  closePopup();
});

// Listener
popupEditBtnOpen.addEventListener("click", openEditPopup);
popupAddBtnOpen.addEventListener("click", openAddPopup);
