(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function logout() {
  var user = {
    email: "",
    role: ""
  };
  sessionStorage.setItem("currentUser", false);
  window.location = BASE_URL + "/login.html";
}

function checkCredentials() {
  var isLogged = sessionStorage.getItem('currentUser');

  if (isLogged) {} else {
    logout();
  }
}

checkCredentials();

},{}],2:[function(require,module,exports){
"use strict";

var BASE_URL = "http://localhost:5001";

},{}],3:[function(require,module,exports){
"use strict";

var _constants = require("./constants.js");

var _authfunctions = require("./authfunctions.js");

module.exports = {
  BASE_URL: _constants.BASE_URL,
  checkCredentials: _authfunctions.checkCredentials,
  logout: _authfunctions.logout
};

},{"./authfunctions.js":1,"./constants.js":2}]},{},[3]);
