
var request = function (method, url, data, callback) {// eslint-disable-line
  var xhr = new window.XMLHttpRequest();// eslint-disable-line

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = xhr.responseText;
      callback(response);
    }
  };
  xhr.open(method, url, true);
  if (method === 'GET') {
    xhr.send();
  } else {
    xhr.send(data);
  }
};

var get = function (url, cb) {// eslint-disable-line
  request('GET', url, null, cb);
};

var post = function (url, data, cb) {// eslint-disable-line
  var sdata = JSON.stringify(data);
  request('POST', url, sdata, cb);
};
