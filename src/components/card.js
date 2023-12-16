const cardTemplate = document.querySelector("#card-template").content;

function deleteCard(event) {
  const cardDeleteEvent = event.target;
  const cardItem = cardDeleteEvent.closest(".card");
  cardItem.remove();
}

function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

function makeCard(cardData, deleteCardCallback, likeCardCallback, openCardCallback) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDelete = cardElement.querySelector(".card__delete-button");
  const cardLike = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');

  cardDelete.addEventListener("click", deleteCardCallback);
  cardLike.addEventListener('click', likeCardCallback);
  cardImage.addEventListener("click", openCardCallback);

  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardImgElement = cardElement.querySelector(".card__image");

  cardTitleElement.textContent = cardData.name;
  cardImgElement.src = cardData.link;
  cardImgElement.alt = cardData.name;

  return cardElement;
}

export {deleteCard, likeCard, makeCard}