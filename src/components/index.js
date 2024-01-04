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

const cardList = document.querySelector(".places__list");
const profileContaier = document.querySelector(".content");
const popupProfileEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const popupInputName = document.querySelector(".popup__input_type_name");
const popupInputJob = document.querySelector(".popup__input_type_description");
const popupImage = document.querySelector(".popup_type_image");
const popupImageImg = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");
const popupNewCardName = document.querySelector(".popup__input_type_card-name");
const popupNewCardLink = document.querySelector(".popup__input_type_url");
const popupAvatarLink = document.querySelector(".popup__input_type_avatar-url");
const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
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

// API
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
    profileJob.textContent = profileData.about;
    profileAvatar.style.backgroundImage = `url('${profileData.avatar}')`;
  })
  .catch((error) => {
    console.log(`Ошибка ${error}`);
  });

//

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
    clearValidation(popupProfileEdit, {
      formSelector: ".popup__form",
      inputSelector: ".popup__input",
      submitButtonSelector: ".popup__button",
      inactiveButtonClass: "popup__button_disabled",
      inputErrorClass: "popup__input_type_error",
      errorClass: "popup__error_visible",
    });
  }
  if (evt.target.classList.contains("profile__image")) {
    openPopup(popupEditAvatar);
    popupAvatarLink.value = "";
    popupEditAvatar.addEventListener("submit", handleEditAvatarSubmit);
    clearValidation(popupEditAvatar, {
      formSelector: ".popup__form",
      inputSelector: ".popup__input",
      submitButtonSelector: ".popup__button",
      inactiveButtonClass: "popup__button_disabled",
      inputErrorClass: "popup__input_type_error",
      errorClass: "popup__error_visible",
    });
  }
  if (evt.target.classList.contains("profile__add-button")) {
    popupNewCardName.value = "";
    popupNewCardLink.value = "";
    openPopup(popupNewCard);
    popupNewCard.addEventListener("submit", handleAddNewCardSubmit);
    clearValidation(popupNewCard, {
      formSelector: ".popup__form",
      inputSelector: ".popup__input",
      submitButtonSelector: ".popup__button",
      inactiveButtonClass: "popup__button_disabled",
      inputErrorClass: "popup__input_type_error",
      errorClass: "popup__error_visible",
    });
  }
});

function renderLoading(isLoading, button){
  if (isLoading){
    button.textContent = "Сохранение...";
  }
  else{
    button.textContent = "Сохранить";
  }
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  const popupButton  = popupProfileEdit.querySelector('.popup__button')
  renderLoading(true, popupButton);
  changeProfile("me", {
    name: popupInputName.value,
    about: popupInputJob.value,
  })
  .then((profileData) =>{
    profileName.textContent = profileData.name;
    profileJob.textContent = profileData.about;
  })
  .catch((errorMessage) =>{
    console.log(errorMessage)
  })
  .finally(()=>{
    renderLoading(false, popupButton);
  });
  closePopup(popupProfileEdit);
}

function handleEditAvatarSubmit(evt) {
  evt.preventDefault();
  const popupButton  = popupEditAvatar.querySelector('.popup__button');
  renderLoading(true, popupButton);
  updateProfileAvatar({ avatar: popupAvatarLink.value })
  .then((profileData) => {
    profileAvatar.style.backgroundImage = `url('${profileData.avatar}')`;
  })
  .catch((errorMessage) =>{
    console.log(errorMessage)
  })
  .finally(()=>{
    renderLoading(false, popupButton);
  });
  closePopup(popupEditAvatar);
}

function handleAddNewCardSubmit(evt) {
  evt.preventDefault();
  const popupButton  = popupNewCard.querySelector('.popup__button');
  renderLoading(true, popupButton);
  sendNewCard({
    name: popupNewCardName.value,
    link: popupNewCardLink.value,
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
    evt.target.reset();
  })
  .catch((errorMessage) =>{
    console.log(errorMessage)
  })
  .finally(()=>{
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

// const cardData = {
//   name: 'Норильск',
//   link: 'https://i.ibb.co/DtxWVDy/blade-runner-2049-teaser-1482220850254.jpg'
// }
// https://i.ibb.co/F8P1kdk/sochi.gif
