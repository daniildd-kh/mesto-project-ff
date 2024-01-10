import { deleteCardRequest, sendCardLike, sendCardUnlike } from "./api";

const cardTemplate = document.querySelector("#card-template").content;

function deleteCard(cardData, cardElement) {
  deleteCardRequest(cardData._id)
    .then(() => {
      cardElement.remove();
    })
    .catch((error) => {
      console.log(`Ошибка удаления карточки ${error}`);
    });
}

function likeCard(cardButton, cardData, cardLikesCounter) {
  if (cardButton.classList.contains("card__like-button_is-active")) {
    sendCardUnlike(cardData._id)
      .then((cardDataLikes) => {
        cardLikesCounter.textContent = cardDataLikes.likes.length;
        cardButton.classList.toggle("card__like-button_is-active");
      })
      .catch((error) => {
        console.log(`Ошибка ${error}`);
      });
  } else {
    sendCardLike(cardData._id)
      .then((cardDataLikes) => {
        cardLikesCounter.textContent = cardDataLikes.likes.length;
        cardButton.classList.toggle("card__like-button_is-active");
      })
      .catch((error) => {
        console.log(`Ошибка ${error}`);
      });
  }
}

function checkLikedStatus(cardData, cardLike, profileId) {
  if (
    cardData.likes.some(function (cardLike) {
      return cardLike._id === profileId;
    })
  ) {
    cardLike.classList.toggle("card__like-button_is-active");
  }
}

function checkDeleteRightsStatus(cardData, cardElement, profileId, deleteCard) {
  if (profileId === cardData.owner._id) {
    const cardDelete = cardElement.querySelector(".card__delete-button");
    cardDelete.classList.add("card__delete-button_visible");
    cardDelete.addEventListener("click", () => {
      deleteCard(cardData, cardElement);
    });
  }
}

function makeCard(
  cardData,
  deleteCardCallback,
  likeCardCallback,
  openCardCallback,
  profileId
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardLike = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardImgElement = cardElement.querySelector(".card__image");
  const cardLikesCounter = cardElement.querySelector(".card__like-count");
  const cardDataTitle = cardData.name;
  const cardDataLink = cardData.link;
  const cardDataLikesAmount = cardData.likes.length;

  checkDeleteRightsStatus(cardData, cardElement, profileId, deleteCardCallback);
  checkLikedStatus(cardData, cardLike, profileId);

  cardLike.addEventListener("click", () => {
    likeCardCallback(cardLike, cardData, cardLikesCounter);
  });
  cardImage.addEventListener("click", () => {
    openCardCallback(cardDataTitle, cardDataLink);
  });

  cardTitleElement.textContent = cardDataTitle;
  cardImgElement.src = cardDataLink;
  cardImgElement.alt = cardDataTitle;
  cardLikesCounter.textContent = cardDataLikesAmount;

  return cardElement;
}

export { deleteCard, likeCard, makeCard };
