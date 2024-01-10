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

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupProfileEdit = document.querySelector(".popup_type_edit");
const popupProfileEditSubmitButtom =
  popupProfileEdit.querySelector(".popup__button");
const popupProfileEditForm = popupProfileEdit.querySelector(".popup__form");
const popupInputName = document.querySelector(".popup__input_type_name");
const popupInputDescription = document.querySelector(
  ".popup__input_type_description"
);

const cardList = document.querySelector(".places__list");
const popupCardImage = document.querySelector(".popup_type_image");
const popupCardImageImg = document.querySelector(".popup__image");
const popupCardImageCaption = document.querySelector(".popup__caption");

const addNewCardButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupNewCardSubmitButton = popupNewCard.querySelector(".popup__button");
const popupNewCardForm = popupNewCard.querySelector(".popup__form");
const popupInputNewCardName = document.querySelector(
  ".popup__input_type_card-name"
);
const popupInputNewCardLink = document.querySelector(".popup__input_type_url");

const popupAvatarEdit = document.querySelector(".popup_type_edit-avatar");
const popupAvatarEditSubmitButton =
  popupAvatarEdit.querySelector(".popup__button");
const popupAvatarEditForm = popupAvatarEdit.querySelector(".popup__form");
const popupInputAvatarLink = document.querySelector(
  ".popup__input_type_avatar-url"
);
const popups = document.querySelectorAll(".popup");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function openCard(cardTitle, cardLink) {
  popupCardImageImg.src = cardLink;
  popupCardImageImg.alt = cardTitle;
  popupCardImageCaption.textContent = cardTitle;
  openPopup(popupCardImage);
}

function addCard(createdCard) {
  cardList.append(createdCard);
}

function addNewCard(createdCard) {
  cardList.prepend(createdCard);
}

Promise.all([initialCards(), initialProfileData("me")])
  .then(([initialCardsHendler, profileData]) => {
    initialCardsHendler.forEach((card) => {
      const createdCard = makeCard(
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

profileEditButton.addEventListener("click", handleProfileEditButton);
profileAvatar.addEventListener("click", handleProfileAvatar);
addNewCardButton.addEventListener("click", handleAddNewCardButton);
popupProfileEditForm.addEventListener("submit", handleProfileEditContentSubmit);
popupAvatarEditForm.addEventListener("submit", handleAvatarEditSubmit);
popupNewCardForm.addEventListener("submit", handleAddNewCardSubmit);

function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

function handleProfileEditButton() {
  openPopup(popupProfileEdit);
  popupInputName.value = profileName.textContent;
  popupInputDescription.value = profileDescription.textContent;
  clearValidation(popupProfileEditForm, validationConfig);
}
function handleProfileAvatar() {
  openPopup(popupAvatarEdit);
  popupAvatarEditForm.reset();
  clearValidation(popupAvatarEditForm, validationConfig);
}

function handleAddNewCardButton() {
  popupNewCardForm.reset();
  openPopup(popupNewCard);
  clearValidation(popupNewCardForm, validationConfig);
}

function handleProfileEditContentSubmit(event) {
  event.preventDefault();
  renderLoading(true, popupProfileEditSubmitButtom);
  changeProfile("me", {
    name: popupInputName.value,
    about: popupInputDescription.value,
  })
    .then((profileData) => {
      profileName.textContent = profileData.name;
      profileDescription.textContent = profileData.about;
      closePopup(popupProfileEdit);
    })
    .catch((errorMessage) => {
      console.log(errorMessage);
    })
    .finally(() => {
      renderLoading(false, popupProfileEditSubmitButtom);
    });
}

function handleAvatarEditSubmit(event) {
  event.preventDefault();
  renderLoading(true, popupAvatarEditSubmitButton);
  updateProfileAvatar({ avatar: popupInputAvatarLink.value })
    .then((profileData) => {
      profileAvatar.style.backgroundImage = `url('${profileData.avatar}')`;
      closePopup(popupAvatarEdit);
    })
    .catch((errorMessage) => {
      console.log(errorMessage);
    })
    .finally(() => {
      renderLoading(false, popupAvatarEditSubmitButton);
    });
}

function handleAddNewCardSubmit(event) {
  event.preventDefault();
  renderLoading(true, popupNewCardSubmitButton);
  sendNewCard({
    name: popupInputNewCardName.value,
    link: popupInputNewCardLink.value,
  })
    .then((card) => {
      const createdCard = makeCard(
        card,
        deleteCard,
        likeCard,
        openCard,
        card.owner._id
      );
      addNewCard(createdCard);
      event.target.reset();
      closePopup(popupNewCard);
    })
    .catch((errorMessage) => {
      console.log(errorMessage);
    })
    .finally(() => {
      renderLoading(false, popupNewCardSubmitButton);
    });
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
