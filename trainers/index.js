/*
var http = require('http');

http.createServer(function (req, res) {

  var _url;

  req.method = req.method.toUpperCase();
  console.log(req.method + ' ' + req.url);
  res.end('The current time is ' + Date.now())

}).listen(5100, '127.0.0.1');

console.log('Server running at http://127.0.0.1:5100/');
*/
/*
var http = require('http');

http.createServer(function (req, res) {

  req.method = req.method.toUpperCase();
  console.log(req.method + ' ' + req.url);
  //res.end('The current time is ' + Date.now());

if (req.method !== 'GET') {
    res.writeHead(501, {
      'Content-Type': 'text/plain'
    });
    return res.end(req.method + ' is not implemented by this server.');
  }


 var _path;

  if (_path = /^\/trainers$/i.exec(req.url)) {
    
    res.writeHead(200);
    return res.end('trainer list');
  } else if (_path = /^\/trainers\/(\d+)$/i.exec(req.url)) {
    res.writeHead(200);
    return res.end('a single trainer');
  } else {
    // try to send the static file
    res.writeHead(200);
    res.end('not a checked file or path');
  }


}).listen(5100, '127.0.0.1');

console.log('Server running at http://127.0.0.1:5100/');

*/

/*

var http = require('http');
var trainerService = require('./trainers.js')

http.createServer(function (req, res) {

  req.method = req.method.toUpperCase();
  console.log(req.method + ' ' + req.url);
  //res.end('The current time is ' + Date.now());

if (req.method !== 'GET') {
    res.writeHead(501, {
      'Content-Type': 'text/plain'
    });
    return res.end(req.method + ' is not implemented by this server.');
  }


 var _path;

  if (_path = /^\/trainers$/i.exec(req.url)) {
    trainerService.getTrainers(function (error, data) {
      
      if (error) {
        return console.log("error")
      }
      
      return console.log(data);
   
    });
  } else if (_path = /^\/trainers\/(\d+)$/i.exec(req.url)) {
    
     trainerService.getTrainer(_path[1], function (error, data) {
      if (error) {
        return console.log("error");
      }

      if (!data) {
        return console.log("not found")
      }

      return console.log(data);
    });
    
    
  } else {
    // try to send the static file
    res.writeHead(200);
    res.end('not a checked file or path');
  }


}).listen(5100, '127.0.0.1');

console.log('Server running at http://127.0.0.1:5100/');

*/

var http = require('http');
var trainerService = require('./trainers.js');
var responder = require('./responder.js');
require('array.prototype.find');


Array.prototype.find = function (predicate) {
  for (var i = 0, value; i < this.length; i++) {
    value = this[i];
    if (predicate.call(this, value))
      return value;
  }
  return undefined;
}



http.createServer(function (req, res) {

  req.method = req.method.toUpperCase();
  console.log(req.method + ' ' + req.url);
  //res.end('The current time is ' + Date.now());

  if (req.method !== 'GET') {
    res.writeHead(501, {
      'Content-Type': 'text/plain'
    });
    return res.end(req.method + ' is not implemented by this server.');
  }


  var _path;

  if (_path = /^\/trainers$/i.exec(req.url)) {
    trainerService.getTrainers(function (error, data) {

      if (error) {
        return responder.send500(error, res);
      }
      return responder.sendJSON(data, res);
    }

      );
  } else if (_path = /^\/trainers\/(\d+)$/i.exec(req.url)) {

    trainerService.getTrainer(_path[1], function (error, data) {
      console.log(_path[1]);
      if (error) {
        return responder.send500(error, res);
      }

      if (!data) {
        return responder.send404(res);
      }

      return responder.sendJSON(data, res);
    });


  } else {
    // try to send the static file
    res.writeHead(200);
    res.end('not a checked file or path');
  }


}).listen(5100, '127.0.0.1');

console.log('Server running at http://127.0.0.1:5100/');
