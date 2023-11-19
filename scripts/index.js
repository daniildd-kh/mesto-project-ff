const cardList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function deleteCard(event) {
  const cardDeleteEvent = event.target;
  const cardItem = cardDeleteEvent.closest(".card");
  cardItem.remove();
}

function makeCard(cardData, deleteCardCallback) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDelete = cardElement.querySelector(".card__delete-button");

  cardDelete.addEventListener("click", deleteCardCallback);

  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardImgElement = cardElement.querySelector(".card__image");

  cardTitleElement.textContent = cardData.name;
  cardImgElement.src = cardData.link;
  cardImgElement.alt = cardData.name;

  return cardElement;
}

function addCard(createdCard) {
  cardList.append(createdCard);
}

initialCards.forEach((initialCard) => {
  let createdCard = makeCard(initialCard, deleteCard);
  addCard(createdCard);
});

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
