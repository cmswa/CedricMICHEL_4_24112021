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
modalConfirmBtn.addEventListener('click', validation);



// event close modal confirm
modalConfirmClose.addEventListener('click', closeModalConfirm);

// fermer la modal de confirmation 
function closeModalConfirm() {
  modalConfirm.style.display = "none";
}


/*function validation() {
  modalbg.style.display = "none";
  modalConfirm.style.display = 'block';
  modalConfirmBtn.addEventListener('click', () => {
    modalConfirm.style.display = 'none';
  });
  modalConfirmClose.addEventListener('click', () => {
    modalConfirm.style.display = 'none';
  });
}*/

// check first name
/*const firstNameInput = document.getElementById('first');
function firstValidation() {
  let inputValue = firstNameInput.value;
  if (inputValue !== null && inputValue >= 2) return true;
  else return false;
}*/

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

function validation(event) {

  //si le champs du prénom est vide
  const firstNameInput = document.getElementById("first");
  if (firstNameInput.validity.valueMissing) {
    event.preventDefault();
    firstNameInput.textContent = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
    firstNameInput.style.fontSize = "12px";
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
  emailInput.textContent = "Veuillez entrer une adresse email valide";
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

}