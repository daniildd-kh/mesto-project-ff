import { initialCards } from "./cards";
import "../pages/index.css";
import { makeCard, likeCard, deleteCard } from "./card";
import { openPopup, closePopup } from "./modal.js";

const cardList = document.querySelector(".places__list");
const profileContaier = document.querySelector(".content");
const popupProfileEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const popupInputName = document.querySelector(".popup__input_type_name");
const popupInputJob = document.querySelector(".popup__input_type_description");
const popupImage = document.querySelector(".popup_type_image");
const popupImageImg = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");
const popupNewCardName = document.querySelector(".popup__input_type_card-name");
const popupNewCardLink = document.querySelector(".popup__input_type_url");
const popups = document.querySelectorAll(".popup");

function openCard(event) {
  let cardElement = event.target.closest(".card");
  let cardImage = cardElement.querySelector(".card__image").src;
  let cardTitle = cardElement.querySelector(".card__title").textContent;
  openPopup(popupImage);
  popupImageImg.src = cardImage;
  popupImageCaption.textContent = cardTitle;
}

function addCard(createdCard) {
  cardList.append(createdCard);
}

function addNewCard(createdCard) {
  cardList.prepend(createdCard);
}

initialCards.forEach((initialCard) => {
  let createdCard = makeCard(initialCard, deleteCard, likeCard, openCard);
  addCard(createdCard);
});

popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
  popup.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
});

profileContaier.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("profile__edit-button")) {
    openPopup(popupProfileEdit);
    popupInputName.value = profileName.textContent;
    popupInputJob.value = profileJob.textContent;
    popupProfileEdit.addEventListener("submit", handleFormSubmit);
  }
  if (evt.target.classList.contains("profile__add-button")) {
    openPopup(popupNewCard);
    popupNewCard.addEventListener("submit", handleAddNewCardSubmit);
  }
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileJob.textContent = popupInputJob.value;
  closePopup(popupProfileEdit);
}
function handleAddNewCardSubmit(evt) {
  evt.preventDefault();
  let NewCard = { name: popupNewCardName.value, link: popupNewCardLink.value }
  let createdCard = makeCard(
    NewCard,
    deleteCard,
    likeCard,
    openCard
  );
  addNewCard(createdCard);
  evt.target.reset();
  closePopup(popupNewCard);
}
