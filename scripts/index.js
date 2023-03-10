// Import
import initialCards from "./constants.js"
import config from "./config.js"
import Card from "./card.js";
import FormValidator from "./formValidator.js";

// Class
const formValidator = new FormValidator(config)
const card = new Card( {
    initialCards,
    template: document.querySelector("#card-template") // temolate
  }
)

card.renderCards(); // renderCards
formValidator._enableValidation(); // class formValidator
