var token = document.cookie.split('=')[1];
if (!token) {
   window.location.href = '/';
}

  var decoded = jwt_decode(token);  



