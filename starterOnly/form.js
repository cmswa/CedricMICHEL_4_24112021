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

