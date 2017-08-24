

var topicTitle = document.querySelector(".topicTitle");
var logout = document.getElementById('logout');
var addTopic = document.getElementById('addTopic');
var privciy = document.getElementById('privciy');




var newTopic = {
  title: '',
  status: false
};


var user = document.getElementById('usernamehome');
user.textContent=decoded.username


logout.addEventListener('click', (e) => {
  get('/logout', (response) => { 
    if (response === 'red(/)') {
      window.location.href = '/';
    }

  });
});


// addTopic.addEventListener('click',()=>{
//   e.preventDefault();
//   newTopic.title = topicTitle.value;
//   newTopic.status = privciy.value
//   post('/addTopic', newTopic, (response) => { 
//     console.log(response);
//   });
// });




// document.addEventListener('DOMContentLoaded', function () {
//    //{userId: 11, username: "qq", iat: 1503512883}
//   get('/getUserTopics'+`?=id=${decoded.userId}&username=${decoded.username}`, (response) => {// eslint-disable-line    
//     divTopics.innerHTML = generateTopics(JSON.parse(response));
//   });
// }, false);


// function generateTopics(e){
//   let strt=""
//   return e.reduce(function(ss, op) {
//      return strt += "<div class='flashCard'>" + "<p class='title'>" + op.title + "</p>" + "<span class='owner'>" + "By " +op.name + "</span>" + " " + "</div>"
//    }, "");
// }


// function generateTopics(e){
//   let strt=""
//   return e.reduce(function(ss, op) {
//      return strt += "<div class='flashCard'>" + "<p class='title'>" + op.title + "</p>" + "<span class='owner'>" + "By " +op.name + "</span>" + " " + "</div>"
//    }, "");
// }






