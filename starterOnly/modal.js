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

//valid alert
//modalConfirmBtn.forEach((btn) => btn.addEventListener('click', validation));

//soumettre le formulaire
//modalConfirmBtn.addEventListener('click', validation);


// event close modal confirm
modalConfirmClose.addEventListener('click', closeModalConfirm);

// fermer la modal de confirmation 
function closeModalConfirm() {
  modalConfirm.style.display = "none";
}

//validation

// error messages

const errorMessages = {
	lastName: "Veuillez entrer un nom comportant 2 caractères ou plus.",
	firstName: "Veuillez entrer un prénom comportant 2 caractères ou plus.",
	email: "Veuillez entrer une adresse email valide.",
	birthdate: "Veuillez entrer une date de naissance valide.",
	quantity: "Veuillez entrer un nombre valide.",
	location: "Veuillez choisir une ville.",
	checkbox: "Veuillez accepter les conditions d'utilisations.",
};

/* Functions */

//invalid alert
function isInvalid(element, message) {
	let target;
	if (NodeList.prototype.isPrototypeOf(element)) target = element[0].parentNode;
	else target = element.parentNode;
	target.setAttribute("data-error-visible", true);
	target.setAttribute("data-error", message);
}

//valid alert
function isValid() {
	modalbg.style.display = "none";
	modalConfirm.style.display = "block";
}

//delete previous alerts
function removeAlerts() {
	let invalidFields = document.querySelectorAll(
		'.formData[data-error-visible="true"]'
	);
	for (let field of invalidFields) {
		field.setAttribute("data-error-visible", false);
		field.setAttribute("data-error", "");
	}
}

// check first name
const firstNameInput = document.getElementById("first");
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

//check validity mail using "constraint validation in html"
//simplifier le code en évitant une regex js grâce aux attributs de validation html
const emailInput = document.getElementById("email");
function emailValidation() {
  //if ((emailInput.validity.valid) == true) return true;
  //else return false;
  //emailInput.validity.valid;
	if (emailInput.validity.valid) return true;
	else return false;
}

//check if birthdate is valid and older than today
const birthdateInput = document.getElementById("birthdate");
function birthdateValidation() {
	let birthdate = new Date(birthdateInput.value);
	let today = new Date();
	if (birthdate.toString() !== "Invalid Date") {
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

// check if quantity is a valid number using "constraint validation in html"
const quantityInput = document.getElementById('quantity');
function quantityValidation() {
	//if ((quantityInput.validity.valid) == true) return true;
  //else return false;
	return quantityInput.validity.valid;
}

// check if user chose a location
const locationInput = document.querySelectorAll(".checkbox-input[type=radio]");
function locationValidation() {
	for (let radio of locationInput) {
		if (radio.checked === true) return true;
	}
	return false;
}

//check if cgu are checked
const checkboxInput = document.getElementById("checkbox1");
function checkboxValidation() {
	return checkboxInput.checked;
}

// global validation
function validate(event) {
	event.preventDefault(); //si l'évènement n'est pas explicitement géré, l'action par défaut ne devrait pas être exécutée comme elle l'est normalement.
	let isValidInput = true;
  //delete previous alerts
	removeAlerts();
  if (!firstValidation()) { //si firstValidation est faux
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
  

  if (isValidInput) {
		isValid();
	}
}



/*function validation(event) {

  //si le champs du prénom est vide
  const firstNameInput = document.getElementById("first");
  if (firstNameInput.validity.valueMissing) {
    event.preventDefault();
    firstNameInput.innerHTML = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
    firstNameInput.style.border = "2px solid red";
    firstNameInput.style.color = "red";
  }


//si le champ prenom est trop court
if (firstNameInput.validity.tooShort) {
  event.preventDefault();
  firstNameInput.textContent = "Veuillez entrer un prénom.";
  firstNameInput.style.border = "2px solid red";
  firstNameInput.style.color = "red";
  
};
//si le champ nom est vide
const lastNameInput = document.getElementById("last");

if (lastNameInput.validity.valueMissing) {
  event.preventDefault();
  lastNameInput.textContent = "Veuillez entrer un nom de famille.";
  lastNameInput.style.border = "2px solid red";
  lastNameInput.style.color = "red";
  
};
//si le champ nom est trop court
if (lastNameInput.validity.tooShort) {
  event.preventDefault();
  lastNameInput.textContent = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
  lastNameInput.style.border = "2px solid red";
  lastNameInput.style.color = "red";
};

//si le champ email n'est pas valide
const emailInput = document.getElementById("email");
if ((emailInput.validity.valid) == false) {
  event.preventDefault();
  emailInput.after.textContent = "Veuillez entrer une adresse email valide";
  emailInput.style.border = "2px solid red";
  emailInput.style.color = "red";
};
//si la date est vide
const dateInput = document.getElementById("birthdate");
if (dateInput.validity.valueMissing) {
  event.preventDefault();
  dateInput.textContent = "Veuillez entrer une date de naissance.";
  dateInput.style.border = "2px solid red";
  dateInput.style.color = "red";
};

}*/