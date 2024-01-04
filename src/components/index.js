import "../pages/index.css";
import { makeCard, likeCard, deleteCard } from "./card";
import { openPopup, closePopup } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  initialProfileData,
  changeProfile,
  sendNewCard,
  initialCards,
  updateProfileAvatar,
} from "./api.js";

const profileContainer = document.querySelector(".content");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const popupProfileEdit = document.querySelector(".popup_type_edit");
const popupInputName = document.querySelector(".popup__input_type_name");
const popupInputDescription = document.querySelector(".popup__input_type_description");

const cardList = document.querySelector(".places__list");
const popupCardImage = document.querySelector(".popup_type_image");
const popupCardImageImg = document.querySelector(".popup__image");
const popupCardImageCaption = document.querySelector(".popup__caption");

const popupNewCard = document.querySelector(".popup_type_new-card");
const popupInputNewCardName = document.querySelector(".popup__input_type_card-name");
const popupInputNewCardLink = document.querySelector(".popup__input_type_url");

const popupAvatarEdit = document.querySelector(".popup_type_edit-avatar");
const popupInputAvatarLink = document.querySelector(".popup__input_type_avatar-url");
const popups = document.querySelectorAll(".popup");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
}

function openCard(event) {
  let cardElement = event.target.closest(".card");
  let cardImage = cardElement.querySelector(".card__image").src;
  let cardTitle = cardElement.querySelector(".card__title").textContent;
  openPopup(popupCardImage);
  popupCardImageImg.src = cardImage;
  popupCardImageCaption.textContent = cardTitle;
}

function addCard(createdCard) {
  cardList.append(createdCard);
}

function addNewCard(createdCard) {
  cardList.prepend(createdCard);
}

Promise.all([initialCards(), initialProfileData("me")])
  .then((initialData) => {
    const initialCardsHendler = initialData[0];
    const profileData = initialData[1];

    initialCardsHendler.forEach((card) => {
      let createdCard = makeCard(
        card,
        deleteCard,
        likeCard,
        openCard,
        profileData._id
      );
      addCard(createdCard);
    });

    profileName.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    profileAvatar.style.backgroundImage = `url('${profileData.avatar}')`;
  })
  .catch((error) => {
    console.log(`Ошибка ${error}`);
  });

popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
  popup.addEventListener("click", function (event) {
    if (event.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
    if (event.target === event.currentTarget) {
      closePopup(popup);
    }
  });
});

profileContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("profile__edit-button")) {
    openPopup(popupProfileEdit);
    popupInputName.value = profileName.textContent;
    popupInputDescription.value = profileDescription.textContent;
    popupProfileEdit.addEventListener("submit", handleFormSubmit);
    clearValidation(popupProfileEdit, validationConfig);
  }
  if (event.target.classList.contains("profile__image")) {
    openPopup(popupAvatarEdit);
    popupInputAvatarLink.value = "";
    popupAvatarEdit.addEventListener("submit", handleEditAvatarSubmit);
    clearValidation(popupAvatarEdit, validationConfig);
  }
  if (event.target.classList.contains("profile__add-button")) {
    popupInputNewCardName.value = "";
    popupInputNewCardLink.value = "";
    openPopup(popupNewCard);
    popupNewCard.addEventListener("submit", handleAddNewCardSubmit);
    clearValidation(popupNewCard, validationConfig);
  }
});

function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  const popupButton = popupProfileEdit.querySelector(".popup__button");
  renderLoading(true, popupButton);
  changeProfile("me", {
    name: popupInputName.value,
    about: popupInputDescription.value,
  })
    .then((profileData) => {
      profileName.textContent = profileData.name;
      profileDescription.textContent = profileData.about;
    })
    .catch((errorMessage) => {
      console.log(errorMessage);
    })
    .finally(() => {
      renderLoading(false, popupButton);
    });
  closePopup(popupProfileEdit);
}

function handleEditAvatarSubmit(event) {
  event.preventDefault();
  const popupButton = popupAvatarEdit.querySelector(".popup__button");
  renderLoading(true, popupButton);
  updateProfileAvatar({ avatar: popupInputAvatarLink.value })
    .then((profileData) => {
      profileAvatar.style.backgroundImage = `url('${profileData.avatar}')`;
    })
    .catch((errorMessage) => {
      console.log(errorMessage);
    })
    .finally(() => {
      renderLoading(false, popupButton);
    });
  closePopup(popupAvatarEdit);
}

function handleAddNewCardSubmit(event) {
  event.preventDefault();
  const popupButton = popupNewCard.querySelector(".popup__button");
  renderLoading(true, popupButton);
  sendNewCard({
    name: popupInputNewCardName.value,
    link: popupInputNewCardLink.value,
  })
    .then((card) => {
      let createdCard = makeCard(
        card,
        deleteCard,
        likeCard,
        openCard,
        card.owner._id
      );
      addNewCard(createdCard);
      event.target.reset();
    })
    .catch((errorMessage) => {
      console.log(errorMessage);
    })
    .finally(() => {
      renderLoading(false, popupButton);
    });
  closePopup(popupNewCard);
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});