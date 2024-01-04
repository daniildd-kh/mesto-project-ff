const config = {
  authorizationId: "bb5266d4-5809-4721-906b-67da4b3c928b",
  cohortId: "wff-cohort-3",
};

function getResponse(request) {
  if (request.ok) {
    return request.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function initialProfileData(userId) {
  return fetch(
    `https://mesto.nomoreparties.co/v1/${config.cohortId}/users/${userId}`,
    {
      headers: {
        authorization: config.authorizationId,
      },
    }
  ).then((res) => getResponse(res));
}

function changeProfile(userId, newProfileData) {
  return fetch(
    `https://mesto.nomoreparties.co/v1/${config.cohortId}/users/${userId}`,
    {
      method: "PATCH",
      headers: {
        authorization: config.authorizationId,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProfileData),
    }
  ).then((res) => getResponse(res));
}

function sendNewCard(cardData) {
  return fetch(`https://mesto.nomoreparties.co/v1/${config.cohortId}/cards`, {
    method: "POST",
    headers: {
      authorization: config.authorizationId,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cardData),
  }).then((res) => getResponse(res));
}

function deleteCardRequest(cardId) {
  return fetch(
    `https://mesto.nomoreparties.co/v1/${config.cohortId}/cards/${cardId}`,
    {
      method: "DELETE",
      headers: {
        authorization: config.authorizationId,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => getResponse(res));
}

function initialCards() {
  return fetch(`https://mesto.nomoreparties.co/v1/${config.cohortId}/cards`, {
    headers: {
      authorization: config.authorizationId,
    },
  }).then((res) => getResponse(res));
}

function sendCardLike(cardId) {
  return fetch(
    `https://mesto.nomoreparties.co/v1/${config.cohortId}/cards/likes/${cardId}`,
    {
      method: "PUT",
      headers: {
        authorization: config.authorizationId,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => getResponse(res));
}

function sendCardUnlike(cardId) {
  return fetch(
    `https://mesto.nomoreparties.co/v1/${config.cohortId}/cards/likes/${cardId}`,
    {
      method: "DELETE",
      headers: {
        authorization: config.authorizationId,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => getResponse(res));
}

function updateProfileAvatar(avatarDataLink) {
  return fetch(
    `https://mesto.nomoreparties.co/v1/${config.cohortId}/users/me/avatar`,
    {
      method: "PATCH",
      headers: {
        authorization: config.authorizationId,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(avatarDataLink),
    }
  ).then((res) => getResponse(res));
}
export {
  initialProfileData,
  changeProfile,
  sendNewCard,
  initialCards,
  deleteCardRequest,
  sendCardLike,
  sendCardUnlike,
  updateProfileAvatar,
};
