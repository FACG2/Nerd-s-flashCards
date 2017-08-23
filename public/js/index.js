var login = document.getElementById('login');
var signUp = document.getElementById('signUp');
var loginForm = document.getElementById('loginForm');
var signUpForm = document.getElementById('signUpForm');

login.addEventListener('click', () => {
  loginForm.style.display = 'block';
  signUpForm.style.display = 'none';
});

signUp.addEventListener('click', () => {
  signUpForm.style.display = 'block';
  loginForm.style.display = 'none';
});
