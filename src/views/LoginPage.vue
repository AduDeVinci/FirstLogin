<template>
    <h1>Login</h1>

    <form class="login-form" action="/login" method="post">
        <fieldset>
            <legend>Connexion</legend>

            <BasicInput id="username" label="Username" type="text" placeholder="Joe" v-model="username"
                :errorMessage="errorMessageUsername" :validMessage="validMessageUsername" @blur="UsernameValid($event)"
                @update:modelValue="username = $event" />


            <BasicInput id="email" label="Email" type="email" placeholder="john.doe@email.com" v-model="email"
                :errorMessage="errorMessageEmail" :validMessage="validMessageEmail" @blur="emailValid($event)"
                @update:modelValue="email = $event" />

            <BasicInput id="password" label="Password" type="password" placeholder="********" v-model="password"
                :errorMessage="errorMessagePassword" :validMessage="validMessagePassword" @blur="passwordValid($event)"
                @update:modelValue="password = $event" />

            <BasicInput id="confipassword" label="Confirmation password" type="password" placeholder="********"
                v-model="passwordConf" :errorMessage="errorMessagePasswordConf" :validMessage="validMessagePasswordConf"
                @blur="passwordConfValid($event)" @update:modelValue="passwordConf = $event" />
            <div>
            <button type="submit" :disabled="disabled" @click="callAPI()"><b>Register</b></button>
            </div>
        </fieldset>
    </form>
</template>


<script setup>
import { computed, ref } from 'vue'
import BasicInput from '../components/BasicInput.vue';
// import md5 from 'md5';

// API
function callAPI() {
  return fetch('/api/users/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password
      // password: md5(password) POUR SECURISER LE PASSWORD
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      return data
    })
    .catch(error => console.error(error))
}

// username
const username = ref('')
const errorMessageUsername = ref('')
const validMessageUsername = ref('')

function UsernameValid(event) {
  console.log("1")
  console.log(event)
  if (!isValidUsername(event.target.value)) {
    console.log("2")
    errorMessageUsername.value = 'Username should be at least 3 characters long, no space'
  }
  else {
    errorMessageUsername.value = ''
  }
}

function isValidUsername(username) {
  return /^[a-zA-Z0-9]{3,}$/.test(username);
}

// email
const email = ref('')
const errorMessageEmail = ref('')
const validMessageEmail = ref('')

function emailValid(event) {
  console.log(event.target.value);
  if (!isValidEmail(event.target.value)) {
    errorMessageEmail.value = 'Email is not valid';
    console.log('Email is not valid');
  } else {
    email.value = event.target.value;
    errorMessageEmail.value = '';
    console.log('Email is valid');
  }
}

function isValidEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

// password
const password = ref('')
const errorMessagePassword = ref('')
const validMessagePassword = ref('')

function passwordValid(event) {
  console.log(event.target.value)
  if (!isValidPassword(event.target.value)) {
    errorMessagePassword.value = 'Password does not contain at least 8 characters, a capital letter, a lowercase letter and a number.'
    console.log('Password is not valid')
  }
  else {
    password.value = event.target.value
    errorMessagePassword.value = ''
    console.log('Password is valid')
  }
}

function isValidPassword(password) {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
}

// password confirmation
const passwordConf = ref('')
const errorMessagePasswordConf = ref('')
const validMessagePasswordConf = ref('')

function passwordConfValid(event) {
  console.log(event.target.value)
  if (!isValidPasswordConf(event.target.value)) {
    errorMessagePasswordConf.value = 'Password confirmation does not match the password'
    console.log('Password confirmation does not match the password')
  }
  else {
    passwordConf.value = event.target.value
    errorMessagePasswordConf.value = ''
    console.log('Password confirmation match the password')
  }
}

function isValidPasswordConf(passwordConf) {
  return passwordConf === document.getElementById('password').value
}

// disabled
const disabled = computed(() => {
  return errorMessageUsername.value !== '' || errorMessageEmail.value !== '' || errorMessagePassword.value !== '' || errorMessagePasswordConf.value !== '' || username.value.length === 0 || email.value.length === 0 || password.value.length === 0 || passwordConf.value.length === 0 
})

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
    margin: 10px;
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
    margin-right: 5px;
}

</style>