var login = document.getElementById('login');
var signUp = document.getElementById('signUp');
var loginForm = document.getElementById('loginForm');
var signUpForm = document.getElementById('signUpForm');
// var TopicsDiv = document.getElementById('Topics');

login.addEventListener('click', () => {
  loginForm.style.display = 'block';
  signUpForm.style.display = 'none';
});

signUp.addEventListener('click', () => {
  signUpForm.style.display = 'block';
  loginForm.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function () {
  get('/viewTopic', (response) => {// eslint-disable-line
        // Topics.innerHTML = generateOptions(response);
    console.log(response);
  });
}, false);
