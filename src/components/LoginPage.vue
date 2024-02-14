<template>
    <h1>Login</h1>

    <form action="/login" method="post">
        <fieldset class="login-form">
            <legend>Connexion</legend>
            <div>
              <label for="username">Username:</label>
              <input v-model="username" id="username" type="text" name="username" placeholder="John" @blur="validateUsername" required>
              <p id="username-error" class="error-message" v-if="usernameError">{{ usernameError }}</p>
            </div>
            <div>
              <label for="email">Email :</label>
              <input v-model="email" id="email" type="email" name="email" placeholder="John@email.com" @blur="validateEmail" required>
              <p id="email-error" class="error-message" v-if="emailError">{{ emailError }}</p>
            </div>
            <div>
              <label for="password">Password :</label>
              <input v-model="password" id="password" type="password" name="password" placeholder="**********" @blur="validatePassword" required>
              <p id="password-error" class="error-message" v-if="passwordError">{{ passwordError }}</p>
            </div>
            <div>
              <label for="confirm-password">Confirm Password :</label>
              <input v-model="confirmPassword" id="confirm-password" type="password" name="confirm-password" placeholder="**********" @blur="validateConfirmPassword" required>
              <p id="confirm-password-error" class="error-message" v-if="confirmPasswordError">{{ confirmPasswordError }}</p>
            </div>
            <p v-if="formSubmitted" class="success-message">All Good!</p>
        </fieldset>
        <div>
        <button :disabled="isDisabled" type="submit">Register</button>
        </div>
    </form>
</template>


<script setup>
import { ref, onMounted, nextTick, computed } from 'vue';

const usernameInput = ref(null);
const emailInput = ref(null);
const passwordInput = ref(null);
const confirmPasswordInput = ref(null);

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const usernameError = ref('');
const emailError = ref('');
const passwordError = ref('');
const confirmPasswordError = ref('');

const formSubmitted = ref(false);

const validateUsername = () => {
    nextTick(() => {
        const usernameValue = username.value.trim();

        if (/\s/.test(usernameValue) || usernameValue.length < 4) {
            usernameError.value = 'Username must be at least 4 characters long and cannot contain spaces.';
        } else {
            usernameError.value = '';
        }
    });
};

const validateEmail = () => {
    nextTick(() => {
        const trimmedEmail = email.value.trim();
        if (!isValidEmail(trimmedEmail)) {
            emailError.value = 'Invalid email format.';
        } else {
            emailError.value = '';
        }
    });
};

const validatePassword = () => {
    nextTick(() => {
        const passwordValue = password.value;

        if (
            passwordValue.length < 8 ||
            !/[A-Z]/.test(passwordValue) ||
            !/[a-z]/.test(passwordValue) ||
            !/\d/.test(passwordValue) ||
            !/[^A-Za-z0-9]/.test(passwordValue)
        ) {
            passwordError.value = 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.';
        } else {
            passwordError.value = '';
        }
    });
};

const validateConfirmPassword = () => {
  nextTick(() => {
    const confirmPasswordValue = confirmPassword.value;
    const passwordValue = password.value;
  
    if (confirmPasswordValue !== passwordValue) {
      confirmPasswordError.value = 'Passwords do not match.';
    } else {
      confirmPasswordError.value = '';
      formSubmitted.value = true;
    }
  });
};

const isValidEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
};

const isDisabled = computed(() => {
    return (
        usernameError.value !== '' ||
        emailError.value !== '' ||
        passwordError.value !== '' ||
        confirmPasswordError.value !== '' ||
        !username.value ||
        !email.value ||
        !password.value ||
        !confirmPassword.value
    );
});

onMounted(() => {
    usernameInput.value.addEventListener('blur', validateUsername);
    emailInput.value.addEventListener('blur', validateEmail);
    passwordInput.value.addEventListener('blur', validatePassword);
    confirmPasswordInput.value.addEventListener('blur', validateConfirmPassword);

    document.querySelector('form').addEventListener('submit', (event) => {
        validateUsername();
        validateEmail();
        validatePassword();
        validateConfirmPassword();

        if (usernameError.value || emailError.value || passwordError.value || confirmPasswordError.value) {
            event.preventDefault();
        }
        else formSubmitted.value = true;
    });
});
</script>


<style>
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
    background-color:cadetblue;
    cursor: pointer;
    transition: border-color 0.25s;
    margin: 2rem;
}

button:hover {
    background-color:darkcyan;
}

button:focus,
button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
}


.login-form {
    display: flex;
    flex-direction: column;
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

.error-message {
    color:crimson;
}
.success-message {
    color:darkseagreen;
}
</style>