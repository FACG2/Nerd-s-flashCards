// const functions = require('../src/handlers.js');
var login = document.getElementById('login');
var signUp = document.getElementById('signUp');
var loginForm = document.getElementById('loginForm');
var signUpForm = document.getElementById('signUpForm');
var username = document.getElementById('username');
var password = document.getElementById('password');
var newName = document.getElementById('nameInputS');
var newPassword = document.getElementById('passwordInputS');
var newUsername = document.getElementById('usernameInputS');
var data = {
  username: '',
  password: ''

};
var newUser = {
  username: '',
  password: '',
  name: ''
};

login.addEventListener('click', (e) => {
  loginForm.style.display = 'block';
  signUpForm.style.display = 'none';
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  loginForm.style.display = 'block';
  signUpForm.style.display = 'none';
  data.username = username.value;
  data.password = password.value;
  post('/login', data, (response) => { // eslint-disable-line
    console.log(response);// eslint-disable-line
    if (response === 'red(/home)') {// eslint-disable-line
      window.location.href = '/home';// eslint-disable-line
    }// eslint-disable-line
  });// eslint-disable-line
});// eslint-disable-line

signUpForm.addEventListener('submit', (e) => {
  e.preventDefault();
  signUpForm.style.display = 'block';
  loginForm.style.display = 'none';
  console.log();
  newUser.username = newUsername.value;
  newUser.password = newPassword.value;
  newUser.name = newName.value;
  post('/register', newUser, (response) => { // eslint-disable-line
    console.log(response);// eslint-disable-line
  });// eslint-disable-line
});

signUp.addEventListener('click', () => {
  signUpForm.style.display = 'block';
  loginForm.style.display = 'none';
});
