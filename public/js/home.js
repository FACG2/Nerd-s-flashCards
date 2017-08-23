var token = document.cookie.split('=')[1];
var decoded = jwt_decode(token); // eslint-disable-line
console.log(decoded);

// wwwwwwwwwwwwwwwwwwww
var logout = document.getElementById('logout');

logout.addEventListener('click', (e) => {
  get('/logout', (response) => { // eslint-disable-line
    if (response === 'red(/)') {
      window.location.href = '/';
    }
  });
});
