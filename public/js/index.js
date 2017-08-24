// const functions = require('../src/handlers.js');
var login = document.getElementById('login');
var signUp = document.getElementById('signUp');
var loginForm = document.getElementById('loginForm');
var signUpForm = document.getElementById('signUpForm');
var logout = document.getElementById('logout');
var username = document.getElementById('username');
var password = document.getElementById('password');
var newName = document.getElementById('nameInputS');
var newPassword = document.getElementById('passwordInputS');
var newUsername = document.getElementById('usernameInputS');
var divTopics = document.querySelector(".divTopics");

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
  post('/login', data, (response) => { 
    console.log(response);
    if (response === 'red(/home)') {
      window.location.href = '/home';
    }
  });
});

signUpForm.addEventListener('submit', (e) => {
  e.preventDefault();
  signUpForm.style.display = 'block';
  loginForm.style.display = 'none';
  console.log();
  newUser.username = newUsername.value;
  newUser.password = newPassword.value;
  newUser.name = newName.value;
  post('/register', newUser, (response) => { 
    console.log(response);
  });
});

signUp.addEventListener('click', () => {
  signUpForm.style.display = 'block';
  loginForm.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function () {
  get('/viewTopic', (response) => {// eslint-disable-line    
    divTopics.innerHTML = generateTopics(JSON.parse(response));
  });
}, false);


function generateTopics(e){
  let strt=""
  return e.reduce(function(ss, op) {
     return strt += "<div class='flashCard'>" + "<p class='title'>" + op.title + "</p>" + "<span class='owner'>" + "By " +op.name + "</span>" + " " + "</div>"
   }, "");
}



