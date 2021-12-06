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
const modalConfirmCloseBtn = document.querySelector('.modal-confirm-closeBtn');

// event close modal confirm
modalConfirmClose.addEventListener('click', closeModalConfirm);
modalConfirmCloseBtn.addEventListener('click', closeModalConfirm);

// fermer la modal de confirmation
function closeModalConfirm() {
  modalConfirm.style.display = 'none';
}

// DOM Input Elements
const firstNameInput = document.getElementById('first');
const lastNameInput = document.getElementById('last');
const emailInput = document.getElementById('email');
const birthdateInput = document.getElementById('birthdate');
const quantityInput = document.getElementById('quantity');
const locationInput = document.querySelectorAll('.checkbox-input[type=radio]');
const checkboxInput = document.getElementById('checkbox1');

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

// invalid alert
//NodeList.prototype.isPrototypeOf(nodes) retour true si les nœuds sont de type NodeList
//isPrototypeOf () permet de vérifier si un objet existe ou non dans la chaîne de prototypes d'un autre objet
//element.parentNode est l'élément parent du nœud courant. Le parent d'un élément est un nœud Element
function isInvalid(element, message) { // 2 paramètres element et message: les input et errorMessages (ce sont les arguments de la fonction appelée)
    let target;
    if (NodeList.prototype.isPrototypeOf(element)) target = element[0].parentNode;
    else target = element.parentNode;
    target.setAttribute("data-error-visible", true);
    target.setAttribute("data-error", message);
}

// valid alert
function isValid() {
  modalbg.style.display = 'none';
  modalConfirm.style.display = 'block';
}

// delete previous alerts
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
function firstValidation() {
  let inputValue = firstNameInput.value;
  if (inputValue !== null && inputValue.length >= 2) return true;
  else return false;
}

// check last name
function lastValidation() {
  let inputValue = lastNameInput.value;
  if (inputValue !== null && inputValue.length >= 2) return true;
  else return false;
}

// check validity mail using regex
function emailValidation() {
  let regex = /^\S+@\S+\.\S+$/; //créer une expression régulière: let regExp = /motif/marqueur;
  return regex.test(emailInput.value); //Teste la correspondance de l'expression régulière.
}

// check if birthdate is valid and older than today
function birthdateValidation() {
  let birthdate = new Date(birthdateInput.value);
  let today = new Date();
  //https://stackoverflow.com/questions/7445328/check-if-a-string-is-a-date-value/25047903#25047903
  if (birthdate.toString() !== 'Invalid Date') {
    // check if date time string is invalid date js
    return !(
      birthdate.getDate() >= today.getDate() &&
      birthdate.getMonth() == today.getMonth() &&
      birthdate.getFullYear() == today.getFullYear()
    );
  }
}

// check if quantity is a valid number
function quantityValidation() {
  let regex = /^[0-9]+$/;
  return regex.test(quantityInput.value);
}

// check if user chose a location
function locationValidation() {
  for (let radio of locationInput) {
    return radio.checked;
  }
}

// check if cgu are checked
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
