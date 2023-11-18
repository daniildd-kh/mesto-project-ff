const cardList = document.querySelector(".places__list");

function makeCard(cardTitle, cardImg) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDelete = cardElement.querySelector(".card__delete-button");

  function deleteCard() {
    const cardItem = cardDelete.closest(".card");
    cardItem.remove();
  }

  cardDelete.addEventListener("click", deleteCard);

  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardImgElement = cardElement.querySelector(".card__image");

  cardTitleElement.textContent = cardTitle;
  cardImgElement.src = cardImg;
  cardImgElement.alt = cardTitle;

  cardList.append(cardElement);
}
for (const initialCard of initialCards) {
  makeCard(initialCard.name, initialCard.link);
}

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
