//select the form fields
const usernameEl = document.querySelector('#username');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const password2El = document.querySelector('#confirm-password');
const form = document.querySelector('#signup');


//Add event listener to form
form.addEventListener('submit', e => {
    
    //prevent the form from submitting
    e.preventDefault();
});

const isRequired = value => value ===  "" ? false : true;

const isBetween = (length, min, max) => length < min || length > max ? false : true;

const isEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
};

const isPasswordSecure = (password) => {
    let re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const showError = (input, message) => {

    const formField = input.parentElement;
    formField.classList.remove('success');
    formField.classList.add('error');

    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    const formField = input.parentElement;
    formField.classList.remove('error');
    formField.classList.add("success");

    const error = formField.querySelector('small');
    error.textContent = "";
};

const checkUsername = () => {
    let valid = false;
    min = 3;
    max = 25;

    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, `Username cannot be blank`);
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Username must be between ${min} and ${max} characters`);
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};

const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, `Email cannot be blank`);
    } else if (!isEmail(email)) {
        showError(emailEl, `Email is not valid`);
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const checkPassword = () => {
    let valid = false;
    min = 8;
    max = 25;

    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, `Password cannot be blank`);
    } else if (!isBetween(password.length, min, max)) {
        showError(passwordEl, `Password must be between ${min} and ${max} characters`);
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, `Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character`);
    } else {
        showSuccess(passwordEl);
        valid = true;
    }
    return valid;
};

const checkConfirmPassword = () => {
    let valid = false;
    const password = passwordEl.value.trim();
    const password2 = password2El.value.trim();

    if (!isRequired(password2)) {
        showError(password2El, `Confirm password cannot be blank`);
    } else if (password !== password2) {
        showError(password2El, `Passwords do not match`);
    } else {
        showSuccess(password2El);
        valid = true;
    }
    return valid;
}

form.addEventListener('submit', e => {
    e.preventDefault();

    let isUsernameValid = checkUsername();
    let isEmailValid = checkEmail();
    let isPasswordValid = checkPassword();
    let isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;
});

const debounce = (func, delay = 2000) => {
    let timeoutId;
    return (...args) => {
        //if there is a previous timeout, clear it
        if (timeoutId) {
            clearTimeout(timeoutId);
        } 
        //set a new timeout
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case "username": 
            checkUsername();
            break;
        case "email":
            checkEmail();
            break;
        case "password":
            checkPassword();
            break;
        case "confirm-password":
            checkConfirmPassword();
            break;
        default:
            break;
    }

}));
