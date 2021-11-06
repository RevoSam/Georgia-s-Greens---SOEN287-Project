
const form = document.getElementById("signup-form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const confirmEmail = document.getElementById("confirm-email");
const password = document.getElementById("pass");
const passwordConfirm = document.getElementById("confirm-pass");
const postal = document.getElementById("postal");
const address = document.getElementById("address");
const city = document.getElementById("city");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    validateInput();
});

function validateInput() {
    const fullNameValue = fullName.value;
    const emailValue = email.value;
    const confirmEmailValue = confirmEmail.value;
    const passwordValue = password.value;
    const passwordConfirmValue = passwordConfirm.value;
    const postalValue = postal.value;
    const addressValue = address.value;
    const cityValue = city.value;

    // Full name verification
    if (fullNameValue === "") {
        displayError(fullName, "Enter your name");
    }
    else {
        displayNone(fullName);
    }

    // Email verification
    if (emailValue === "") {
        displayError(email, "Enter your email");
    }
    else if (!validateEmail(emailValue)) {
        displayError(email, "Enter a valid email");
    }
    else {
        displayNone(email);
    }

    // Confirm email verification
    if (confirmEmailValue === "") {
        displayError(confirmEmail, "Confirm your email");
    }
    else if (confirmEmailValue !== emailValue) {
        displayError(confirmEmail, "Emails must match")
    }
    else {
        displayNone(confirmEmail);
    }

    // Password verification
    if (passwordValue === "") {
        displayError(password, "Enter a password")
    }
    else if (passwordValue.length < 6) {
        displayError(password, "Minimum 6 characters required")
    }
    else {
        displayNone(password);
    }

    // Confirm password verification
    if (passwordConfirmValue === "") {
        displayError(passwordConfirm, "Confirm your password");
    }
    else if (passwordConfirmValue !== passwordValue) {
        displayError(passwordConfirm, "Passwords must match")
    }
    else {
        displayNone(passwordConfirm);
    }

    // Postal Code verification
    if (postalValue === "") {
        displayError(postal, "Enter your postal code");
    }
    else {
        displayNone(postal);
    }

    // Address verification
    if (addressValue === "") {
        displayError(address, "Enter your address");
    }
    else {
        displayNone(address);
    }

    // City verification
    if (cityValue === "") {
        displayError(city, "Enter your city");
    }
    else {
        displayNone(city);
    }
}

function displayError(input, message) {
    const formField = input.parentElement;
    const formErrorMessage = formField.querySelector(".form-error-message");

    formErrorMessage.innerText = message;
    formField.className = "form-field error";
}

function displayNone(input) {
    const formField = input.parentElement;
    formField.className = "form-field";
}

function validateEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}