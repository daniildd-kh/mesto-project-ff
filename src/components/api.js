const config = {
  authorizationId: "bb5266d4-5809-4721-906b-67da4b3c928b",
  cohortId: "wff-cohort-3",
  url: "https://mesto.nomoreparties.co/v1/",
};

function getResponse(request) {
  if (request.ok) {
    return request.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function initialProfileData(userId) {
  return fetch(`${config.url}${config.cohortId}/users/${userId}`, {
    headers: {
      authorization: config.authorizationId,
    },
  }).then((res) => getResponse(res));
}

function changeProfile(userId, newProfileData) {
  return fetch(`${config.url}${config.cohortId}/users/${userId}`, {
    method: "PATCH",
    headers: {
      authorization: config.authorizationId,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProfileData),
  }).then((res) => getResponse(res));
}

function sendNewCard(cardData) {
  return fetch(`${config.url}${config.cohortId}/cards`, {
    method: "POST",
    headers: {
      authorization: config.authorizationId,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cardData),
  }).then((res) => getResponse(res));
}

function deleteCardRequest(cardId) {
  return fetch(`${config.url}${config.cohortId}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: config.authorizationId,
      "Content-Type": "application/json",
    },
  }).then((res) => getResponse(res));
}

function initialCards() {
  return fetch(`${config.url}${config.cohortId}/cards`, {
    headers: {
      authorization: config.authorizationId,
    },
  }).then((res) => getResponse(res));
}

function sendCardLike(cardId) {
  return fetch(`${config.url}${config.cohortId}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: config.authorizationId,
      "Content-Type": "application/json",
    },
  }).then((res) => getResponse(res));
}

function sendCardUnlike(cardId) {
  return fetch(`${config.url}${config.cohortId}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: config.authorizationId,
      "Content-Type": "application/json",
    },
  }).then((res) => getResponse(res));
}

function updateProfileAvatar(avatarDataLink) {
  return fetch(`${config.url}${config.cohortId}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: config.authorizationId,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(avatarDataLink),
  }).then((res) => getResponse(res));
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
