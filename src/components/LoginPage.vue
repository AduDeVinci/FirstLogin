<script setup>
import { ref, onMounted } from 'vue';

const usernameInput = ref(null);
const emailInput = ref(null);
const passwordInput = ref(null);
const confirmPasswordInput = ref(null);



const validateUsername = () => {
    const usernameError = document.getElementById("username-error");
    const usernameValue = usernameInput.value.value;

    // Check if the username has no spaces and is at least 6 characters long
    if (/\s/.test(usernameValue) || usernameValue.length < 4) {
        usernameError.textContent = 'Username must be at least 4 characters long and cannot contain spaces.';
    } else {
        usernameError.textContent = '';
    }
};

const validatePassword = () => {
    const passwordError = document.getElementById("password-error");
    const passwordValue = passwordInput.value.value;


    // Check if the password meets the requirements
    if (
        passwordValue.length < 8 ||
        !/[A-Z]/.test(passwordValue) || // At least one uppercase letter
        !/[a-z]/.test(passwordValue) || // At least one lowercase letter
        !/\d/.test(passwordValue) ||    // At least one digit
        !/[^A-Za-z0-9]/.test(passwordValue) // At least one special character
    ) {
        passwordInput.value.parentElement.querySelector('.error-message').innerHTML = 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.';
    } else {
        passwordError.textContent = "";
    }
};

const validateConfirmPassword = () => {
    const confirmPasswordError = document.getElementById("confirm-password-error");
    const confirmPasswordValue = confirmPasswordInput.value.value;
    const passwordValue = passwordInput.value.value;

    // Check if the confirm password matches the password
    if (confirmPasswordValue !== passwordValue) {
        confirmPasswordError.textContent = 'Passwords do not match.';
    } else {
        confirmPasswordError.textContent = '';
    }
};

const validateEmail = () => {
    const emailError = document.getElementById("email-error");
    const trimmedEmail = emailInput.value.value.trim();
    if (!isValidEmail(trimmedEmail)) {
        emailInput.value.parentElement.querySelector('.error-message').innerHTML = 'That ain\'t an email';
    } else {
        emailError.textContent = "";
    }
};

const isValidEmail = (email) => {
    if (!email || typeof email !== 'string') {
        return false; // handle empty or non-string inputs
    }

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailRegex.test(email);
};



onMounted(() => {
    usernameInput.value.addEventListener('blur', validateUsername);
    passwordInput.value.addEventListener('blur', validatePassword);
    emailInput.value.addEventListener('blur', validateEmail);
    confirmPasswordInput.value.addEventListener('blur', validateConfirmPassword);

    document.querySelector('form').addEventListener('submit', (event) => {
        if (!validatePassword()) {
            event.preventDefault(); // Cancel form submission if password validation fails
        }
    });
});

</script>

<template>
    <h1>Login</h1>

    <form action="/login" @submit.prevent="" method="post">
        <fieldset class="login-form">
            <legend>Connexion</legend>
              <div>
                <label for="username">Username:</label>
                <input ref="usernameInput" id="username" type="text" name="username" placeholder="John" required>
                <p id="username-error" class="error-message"></p>
            </div>
            <div>
                <label for="email">Email :</label>
                <input ref="emailInput" id="email" type="email" name="email" placeholder="John@email.com" required>
                <p id="email-error" class="error-message"></p>
            </div>
            <div>
                <label for="password">Password :</label>
                <input ref="passwordInput" id="password" type="password" name="password" placeholder="**********" required>
                <p id="password-error" class="error-message"></p>
            </div>
            <div>
                <label for="confirm-password">Password :</label>
                <input ref="confirmPasswordInput" id="confirm-password" type="password" name="confirm-password" placeholder="**********" required>
                <p id="confirm-password-error" class="error-message"></p>
            </div>
        </fieldset>
        <div>
            <button type="submit">Se connecter</button>
        </div>
    </form>
</template>

<style>
:root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

body {
    margin: 0;
    display: flex;
    place-items: center;
    min-width: 320px;
    min-height: 100vh;
}

h1 {
    font-size: 3.2em;
    line-height: 1.1;
}


button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #646cff;
    cursor: pointer;
    transition: border-color 0.25s;
    margin: 2rem;
}

button:hover {
    border-color: #131764;
}

button:focus,
button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
}


.login-form {
    display: flex;
    flex-direction: row;
    margin: auto;
}

.login-form label {
    margin-bottom: 5px;
    align-self: flex-start;
}

.login-form input {
    margin-bottom: 10px;
    padding: 5px;
    border-radius: 5px;
    border: none;
}

</style>