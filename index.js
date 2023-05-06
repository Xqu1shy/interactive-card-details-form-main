const form = document.getElementById('form');
const cName = document.getElementById('form-cname');
const cNum = document.getElementById('form-cnum');
const expDate = document.getElementById('form-exp-date');
const cvc = document.getElementById('form-cvc');

const thanksPage = document.getElementById('thanks-page');

// VALIDATE AND SUBMIT

form.addEventListener('submit', (e) => {
    e.preventDefault();
    validateInputs();
    const successful = document.querySelectorAll('.success')
    // to submit the form
    if (successful.length === 4) {
        form.submit();
        // stop refreshing so I can change the DOM
        thanksPage.innerHTML = 
        `<div class="wrapper form-section">
            <div class="thanks-page">
                <img src="./images/icon-complete.svg" alt="">
                <h1>Thank you!</h1>
                <p>We've added your card details</p>
                <button>Continue</button>
            </div>
        </div>`
    }
})


function containsNumbers(name) {
    return /\d/.test(name);
}

function containsLetters(name) {
    return /[a-zA-Z]/.test(name);
}

const setError = (element, message) => {
    const inputContainer = element.parentElement;
    const errorDisplay = inputContainer.childNodes[5];

    errorDisplay.innerText = message;
    inputContainer.classList.add('error');
    inputContainer.classList.remove('success');
}


const setSuccess = (element, message) => {
    const inputContainer = element.parentElement;
    const errorDisplay = inputContainer.childNodes[5];

    errorDisplay.innerText = '';
    inputContainer.classList.add('success');
    inputContainer.classList.remove('error');
}


const validateInputs = () => {
    const cNameValue= cName.value.trim();
    const cNumValue= cNum.value.trim();
    const expDateValue= expDate.value.trim();
    const cvcValue= cvc.value.trim();


    if (cNameValue === ''){
        setError(cName, "Can't be blank");
    } else if (containsNumbers(cNameValue)){
        setError(cName, "Invalid");
    } else {
        setSuccess(cName);
    }

    if (cNumValue === ''){
        setError(cNum, "Can't be blank");
    } else {
        setSuccess(cNum);
    }

    if (expDateValue === ''){
        setError(expDate, "Can't be blank");
    } else if (expDateValue.length !== 5){
        setError(expDate, "Invalid");
    } else {
        setSuccess(expDate);
    }

    if (cvcValue === ''){
        setError(cvc, "Can't be blank");
    } else if (cvcValue.length !== 3){
        setError(cvc, "Invalid");
    } else if (containsLetters(cvcValue)){
        setError(cvc, "Invalid");
    } else {
        setSuccess(cvc);
    }
}

// ==========================


var cleave = new Cleave('#form-cnum', {
    creditCard: true,
});

var cleave = new Cleave('#form-exp-date', {
    date: true,
    datePattern: ['m', 'y']
});


// UPDATE THE DOME ON INPUT


const updateCvcUpdate = document.getElementById('update-cvc');
const cardNumUpdate = document.getElementById('card-num');
const cardNameUpdate = document.getElementById('card-name');
const expDateUpdate = document.getElementById('exp-date');


cvc.addEventListener('input', () => {

    let str = '000'

    let inputedByUser = str.substr(cvc.value.length)+str.substr(3, 0)+cvc.value;

    updateCvcUpdate.innerHTML = inputedByUser

})

cNum.addEventListener('input', () => {

    let str = '0000 0000 0000 0000'
    let inputedByUser = str.substr(0, 0)+cNum.value+str.substr(cNum.value.length);
    cardNumUpdate.innerHTML = inputedByUser


    let start1 = inputedByUser.substr(0, 1)
    if (start1 === '1') {
        let str = '0000 00000 000000'
        let inputedByUser = str.substr(0, 0)+cNum.value+str.substr(cNum.value.length);

        cardNumUpdate.innerHTML = inputedByUser
    }
})

cName.addEventListener('input', () => {

    let str = ''

    let inputedByUser = str.substr(0, 0)+cName.value+str.substr(cName.value.length);

    cardNameUpdate.innerHTML = inputedByUser

})

expDate.addEventListener('input', () => {

    let str = '00/00'

    let inputedByUser = str.substr(0, 0)+expDate.value+str.substr(expDate.value.length);

    expDateUpdate.innerHTML = inputedByUser  

})
