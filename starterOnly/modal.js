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

// close modal form
function closeModal() {
  modalbg.style.display = 'none';
}

/* #2 Implémenter entrées du formulaire */
// DOM Elements
const form = document.getElementById('form');
const modalConfirm = document.querySelector('.modal-confirm');
const modalConfirmBtn = document.querySelector('.btn-submit');
const modalConfirmClose = document.querySelectorAll('.close');

//valid alert
modalConfirmBtn.forEach((btn) => btn.addEventListener('click', isValid));

function isValid() {
    //modalbg.style.display = "none";
	modalConfirm.style.display = 'block';
    modalConfirmBtn.addEventListener("click", () => {
		modalConfirm.style.display = "none";
	});
	modalConfirmClose.addEventListener("click", () => {
		modalConfirm.style.display = "none";
	});
}   
