var login = document.getElementById('login')
var signUp = document.getElementById('signUp')
var message = document.getElementsByName('message')
var strength = document.getElementById('strength')

var newusername = document.getElementsByName('newusername')[0]
var nickname = document.getElementsByName('nickname')
var passWord = document.getElementsByName('password')[0]
var confirmPassword = document.getElementsByName('confrimPassword')[0]
var username = document.getElementsByName('username')

function passwordCheck () {

  var strongRegex = new RegExp('^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$', 'g')
  var mediumRegex = new RegExp('^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$', 'g')
  var enoughRegex = new RegExp('(?=.{6,}).*', 'g')
  if (passWord.value.length === 0) {
    strength.innerHTML = 'Type Password'
  } else if (enoughRegex.test(passWord.value) === false) {
    strength.innerHTML = 'More Characters'
  } else if (strongRegex.test(passWord.value)) {
    strength.innerHTML = '<span style="color:green">Strong!</span>'
  } else if (mediumRegex.test(passWord.value)) {
    strength.innerHTML = '<span style="color:orange">Medium!</span>'
  } else {
    strength.innerHTML = '<span style="color:red">Weak!</span>'
  }
}

function usernameCheck () {
  var usernamevalidate = /^[a-zA-Z ]{1,20}$/
  if (usernamevalidate.test(username.value)) {
    return true
  } else {
    alert('Your Name must contanin capital and Small latters ')

    return false
  }
}

function nicknamesignUpCheck () {
  var namesignUpvalidate = /^[a-zA-Z ]{1,20}$/
  if (namesignUpvalidate.test(nickname.value)) {
    return true
  } else {
    alert('Your Name must contanin capital and Small latters ')

    return false
  }
}

function newusernameCheck () {
  // {1,20} is total Characters for username
  var newusernamevalidate = /^[a-zA-Z ]{1,20}$/
  if (newusernamevalidate.test(newusername.value)) {
    return true
  } else {
    alert('Your Username must contanin capital and Small latters ')
    return false
  }
}

function confirmPasswordCheck () {
  if (passWord.value === confirmPassword.value) {
    console.log(messege.style.color = 'green')
    console.log(messege.innerHTML = 'matching')
  } else {
    console.log(messege.style.color = 'red')
    console.log(messege.innerHTML = 'not matching')
  }
}
console.log(passWord);

passWord.addEventListener('keyup', passwordCheck)
newusername.addEventListener('keyup', usernameCheck)
confirmPassword.addEventListener('keyup', confirmPasswordCheck)
