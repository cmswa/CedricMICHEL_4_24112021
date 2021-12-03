function editNav() {
  var x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

/* #1 Femer la modale */
// DOM Elements
const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const modalClose = document.querySelectorAll('.close');
const formData = document.querySelectorAll('.formData');
//const form = document.getElementById('form');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = 'block';
}

// close modal event
modalClose.forEach((btn) => btn.addEventListener('click', closeModal));
// ou: modalClose.addEventListener('click', closeModal);

// close modal form
function closeModal() {
  modalbg.style.display = 'none';
}

/* #2 Implémenter entrées du formulaire */
// DOM Elements
const form = document.getElementById('form');
const modalConfirm = document.querySelector('.modal-confirm');
const modalConfirmBtn = document.querySelector('.btn-submit');
const modalConfirmClose = document.querySelector('.close-modal-confirm');

// event close modal confirm
modalConfirmClose.addEventListener('click', closeModalConfirm);

// fermer la modal de confirmation
function closeModalConfirm() {
  modalConfirm.style.display = 'none';
}

// error messages
const errorMessages = {
  lastName: 'Veuillez entrer un nom comportant 2 caractères ou plus.',
  firstName: 'Veuillez entrer un prénom comportant 2 caractères ou plus.',
  email: 'Veuillez entrer une adresse email valide.',
  birthdate: 'Veuillez entrer une date de naissance valide.',
  quantity: 'Veuillez entrer un nombre valide.',
  location: 'Veuillez choisir une ville.',
  checkbox: "Veuillez accepter les conditions d'utilisations.",
};

/* Functions */

//invalid alert
function isInvalid(element, message) {
  let target = element.parentNode;
  target.setAttribute('data-error-visible', true);
  target.setAttribute('data-error', message);
}

//valid alert
function isValid() {
  modalbg.style.display = 'none';
  modalConfirm.style.display = 'block';
}

//delete previous alerts
//pour afficher les messages d'erreurs je me sers du css existant .formData[data-error]
function removeAlerts() {
  let invalidFields = document.querySelectorAll(
    '.formData[data-error-visible="true"]'
  );
  for (let field of invalidFields) {
    field.setAttribute('data-error-visible', false);
    field.setAttribute('data-error', '');
  }
}

// check first name
const firstNameInput = document.getElementById('first');
function firstValidation() {
  let inputValue = firstNameInput.value;
  if (inputValue !== null && inputValue.length >= 2) return true;
  else return false;
}

//check last name
const lastNameInput = document.getElementById('last');
function lastValidation() {
  let inputValue = lastNameInput.value;
  if (inputValue !== null && inputValue.length >= 2) return true;
  else return false;
}

//check validity mail using regex
const emailInput = document.getElementById('email');
function emailValidation() {
  let regex = /^\S+@\S+\.\S+$/; //créer une expression régulière: let regExp = /motif/marqueur;
  return regex.test(emailInput.value); //Teste la correspondance de l'expression régulière.
}

//check if birthdate is valid and older than today
const birthdateInput = document.getElementById('birthdate');
function birthdateValidation() {
  let birthdate = new Date(birthdateInput.value);
  let today = new Date();
  //https://stackoverflow.com/questions/7445328/check-if-a-string-is-a-date-value/25047903#25047903
  if (birthdate.toString() !== 'Invalid Date') {
    // check if date time string is invalid date js
    if (
      birthdate.getDate() >= today.getDate() &&
      birthdate.getMonth() == today.getMonth() &&
      birthdate.getFullYear() == today.getFullYear()
    ) {
      return false;
    } else {
      return true;
    }
  }
}

// check if quantity is a valid number
const quantityInput = document.getElementById('quantity');
function quantityValidation() {
  let regex = /^[0-9]+$/;
  return regex.test(quantityInput.value);
}

// check if user chose a location
const locationInput = document.querySelectorAll('.checkbox-input[type=radio]');
function locationValidation() {
  for (let radio of locationInput) {
    if (radio.checked === true) return true;
  }
  return false;
}

//check if cgu are checked
const checkboxInput = document.getElementById('checkbox1');
function checkboxValidation() {
  return checkboxInput.checked; //représente ici la case à cocher qui est coché
}

// global validation
function validate(event) {
  event.preventDefault(); //si l'évènement n'est pas explicitement géré, l'action par défaut ne devrait pas être exécutée comme elle l'est normalement.
  let isValidInput = true;
  //delete previous alerts
  removeAlerts();
  if (!firstValidation()) {
    //si firstValidation est faux
    isValidInput = false;
    isInvalid(firstNameInput, errorMessages.firstName);
  }
  if (!lastValidation()) {
    isValidInput = false;
    isInvalid(lastNameInput, errorMessages.lastName);
  }
  if (!emailValidation()) {
    isValidInput = false;
    isInvalid(emailInput, errorMessages.email);
  }
  if (!birthdateValidation()) {
    isValidInput = false;
    isInvalid(birthdateInput, errorMessages.birthdate);
  }
  if (!quantityValidation()) {
    isValidInput = false;
    isInvalid(quantityInput, errorMessages.quantity);
  }
  if (!locationValidation()) {
    isValidInput = false;
    isInvalid(locationInput, errorMessages.location);
  }
  if (!checkboxValidation()) {
    isValidInput = false;
    isInvalid(checkboxInput, errorMessages.checkbox);
  }
  if (isValidInput) {
    //si toutes les conditions sont vraies
    isValid(); //alors l'alerte de validation apparait
  }
}
