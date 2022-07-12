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

    //the 'input' event listens for any inputs entered to the target.
    formElement.addEventListener('input', (e) => {
        if (e.target.id === "email") {
           Selector.emailErrorText.textContent = "";
           resetInputClass(e.target);
           debouncedCheckEmail();
           return;
        }
        if (e.target.id === "username") {
            Selector.userNameErrorText.textContent = "";
            resetInputClass(e.target);
            debouncedCheckUserName();
            return;
        }
        if (e.target.id === "password") {
            Selector.passwordErrorText.textContent = "";
            resetInputClass(e.target);
            debouncedCheckPassword();
            return;
        }
        if (e.target.id === "confirm-password") {
            Selector.confirmPasswordErrorText.textContent = "";
            resetInputClass(e.target);
            debouncedCheckConfirmPassword();
            return;
        }
    })
    
    submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            submitButtonEvent();
    })
}

//the submitButtonEvent is debounced to avoid multiple function executions when spamming the submit button
//the function is async as it needs to check for all of the forms and using the resolve value to determine if the input is valid or not
const submitButtonEvent = debounce( async function() {
    let validForm = await checkForm();
    console.log(validForm)
    if (validForm) {
        console.log("valid form")
    }
})

//returns true if ALL of the form inputs are valid
//the submitEvent uses the original (NOT DEBOUNCED) functions to avoid double debouncing
function checkForm() {
    return new Promise((resolve, reject) => {
         {
            const emailIsValid = checkEmail();
            const userNameIsValid = checkUserName();
            const passwordIsValid = checkPassword();
            const confirmPasswordIsValid = checkConfirmPassword();
            console.log("email " + emailIsValid);
            console.log("username " + userNameIsValid);
            console.log("password " + passwordIsValid);
            console.log("confirmPassword " + confirmPasswordIsValid);
            if (emailIsValid && userNameIsValid && passwordIsValid && confirmPasswordIsValid) {
                resolve(true);
            } else {
                resolve(false)
            }
        };
    })
}


//the validation functions are needs to be debounced for checking live validation
//the original function is needed to avoid double debouncing for the submit event, which is debounced itself

const checkEmail = function() {
    const target = document.getElementById('email');
    const input = target.value;
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!input.match(pattern)) {
        Selector.emailErrorText.textContent = "Must be a valid email address";
        target.classList.add('invalid');
        return false;
    } else {
        return true;
    }
}

const debouncedCheckEmail = debounce(() => checkEmail());

const checkUserName = function() {
    const target = document.getElementById('username');
    const input = target.value;
    const min = 3;
    const max = 15;
    const pattern = /^[A-Za-z_-]{3,15}$/
    if (input.length < min || input.length > max) {
        Selector.userNameErrorText.textContent = "Username should have at least 3 characters and cannot be longer than 15 characters."
        target.classList.add('invalid');
        return false;
    }
    else if (!input.match(pattern)) {
        Selector.userNameErrorText.textContent = 'Username should only contain characters A-Z, a-z, and symbols "_" and "-". '
        target.classList.add('invalid');
        return false;
    } else {
        return true;
    }
}

const debouncedCheckUserName = debounce(() => checkUserName());

const checkPassword = function() {
    const target = document.getElementById('password');
    const input = target.value.trim();
    const pattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    if (!input.match(pattern) || input === "") {
        Selector.passwordErrorText.textContent = "Minimum eight characters, at least one uppercase letter and one number.";
        target.classList.add('invalid');
        return false;
    } else {
        return true;
    }
}

const debouncedCheckPassword = debounce(() => checkPassword());

const checkConfirmPassword = function() {
    const target = document.getElementById('confirm-password');
    const input = target.value;
    const pattern = document.getElementById('password').value;

    if (input !== pattern) {
        Selector.confirmPasswordErrorText.textContent = "Passwords don't match!";
        target.classList.add('invalid');
        return false;
    } else {
        return true;
    }
}

const debouncedCheckConfirmPassword = debounce(() => checkConfirmPassword());

//removes the red input outline every input
function resetInputClass(target) {
    if (target.classList.contains('invalid')) {
        target.classList.remove('invalid'); 
    }
}

addFormEventListener();