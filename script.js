const Selector = (() => {
    const emailErrorText = document.getElementById('email-error');
    const userNameErrorText = document.getElementById('username-error');
    const passwordErrorText = document.getElementById('password-error');
    const confirmPasswordErrorText = document.getElementById('confirm-password-error');

    return {
        emailErrorText,
        userNameErrorText,
        passwordErrorText,
        confirmPasswordErrorText
    }
})();

const debounce = (func, wait = 1000) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

function addFormEventListener() {
    const formElement = document.getElementById('sign-up-form');
    const submitButton = document.getElementById('submit-button');
    formElement.addEventListener('input', (e) => {
        if (e.target.id === "email") {
           Selector.emailErrorText.textContent = "";
           resetInputClass(e.target);
           checkEmail();
           return;
        }
        if (e.target.id === "username") {
            Selector.userNameErrorText.textContent = "";
            resetInputClass(e.target);
            checkUserName();
            return;
        }
        if (e.target.id === "password") {
            Selector.passwordErrorText.textContent = "";
            resetInputClass(e.target);
            checkPassword();
            return;
        }
        if (e.target.id === "confirm-password") {
            Selector.confirmPasswordErrorText.textContent = "";
            resetInputClass(e.target);
            checkConfirmPassword();
            return;
        }
    })
    
    submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            checkForm();
            return;
    })
}

const checkEmail = debounce(function() {
    const target = document.getElementById('email');
    const input = target.value;
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!input.match(pattern)) {
        Selector.emailErrorText.textContent = "Must be a valid email address";
        target.classList.add('invalid');
    }
})

const checkUserName = debounce(function() {
    const target = document.getElementById('username');
    const input = target.value;
    const min = 3;
    const max = 15;
    const pattern = /^[A-Za-z_-]{3,15}$/
    if (input.length < 3 || input.length > 15) {
        Selector.userNameErrorText.textContent = "Username should have at least 3 characters and cannot be longer than 15 characters."
        target.classList.add('invalid');
    }
    else if (!input.match(pattern)) {
        Selector.userNameErrorText.textContent = 'Username should only contain characters A-Z, a-z, and symbols "_" and "-". '
        target.classList.add('invalid');
    }
})

const checkPassword = debounce(function() {
    const target = document.getElementById('password');
    const input = target.value.trim();
    const pattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    if (!input.match(pattern) || input === "") {
        Selector.passwordErrorText.textContent = "Minimum eight characters, at least one uppercase letter and one number.";
        target.classList.add('invalid');
    } 
})

const checkConfirmPassword = debounce(function() {
    const target = document.getElementById('confirm-password');
    const input = target.value;
    const pattern = document.getElementById('password').value;

    if (input !== pattern) {
        Selector.confirmPasswordErrorText.textContent = "Passwords don't match!";
        target.classList.add('invalid');
    }
})

const checkForm = debounce(function() {
    checkEmail();
    checkUserName();
    checkConfirmPassword();
    checkConfirmPassword();
})

function resetInputClass(target) {
    if (target.classList.contains('invalid')) {
        target.classList.remove('invalid'); 
    }
}

addFormEventListener();