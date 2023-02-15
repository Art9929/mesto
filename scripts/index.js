// Functions
const openPopup = popup => {
  popup.classList.add("popup_opened");
}

const closePopup = popup => {
  popup.classList.remove("popup_opened");
}

function openEditPopup() {
  openPopup(popupEditWindow)
}

function openAddPopup() {
  openPopup(popupAddWindow)
}

// Submit Edit btn
function submitEditPopup() {
  titleAutor.textContent = nameInput.value;
  subtitleAutor.textContent = jobInput.value;
}

// Submit Add btn
function submitAddPopup () {
  const newCardData = { name: placeInput.value,  link: urlImgInput.value };
  const card = createCard(newCardData);
  // отображаем на странице
  groupCards.prepend(card);

  placeInput.value = "";
  urlImgInput.value = "";
}

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

// Close Btn
popups.forEach(popup => {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener('click', () => closePopup(popup));
})

// Close popup
popups.forEach(popup => {
  popup.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closePopup(popup);
  });
  // Close esc
  document.addEventListener('keydown', function(event){
    if (event.key === 'Escape') closePopup(popup);
  });
})

renderCards(initialCards);
enableValid(enableValidation);
