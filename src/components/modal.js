function openPopup(popup){
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', escapeButtonHandler);
}

function closePopup(popup){
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', escapeButtonHandler);

}

function escapeButtonHandler(evt){
  if(evt.key === 'Escape'){
    const currentPopup = document.querySelector('.popup_is-opened');
    if (currentPopup) {
      closePopup(currentPopup);
    }
  }
}

export {openPopup, closePopup}