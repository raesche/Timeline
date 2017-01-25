var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
const path = require('path');

users = [];
connections = [];

//server.listen(process.env.PORT || 3000);
server.listen(process.env.PORT || 80);
console.log("server running..");

app.get('/', function(req, res) {
  res.sendFile(path.normalize(__dirname + '/../web/index.html'));
});

// serve all files from web folder
app.use(express.static('../web'));

// special routes for restful API
app.get('/entries', function(req, res) {
  //res.send('[{"name":"Creation", "time":"-1235532"}, {"name":"Rashid", "time":"12343"}]');
  res.json([{name:"Creation", time:"-1235532"}, {name:"Rashid", time:"12343"}]);
});

io.sockets.on('connection', function(socket) {
  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);
  
  // Disconnect
  socket.on('disconnect', function(data){ 
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s sockets connected', connections.length);
  });
  
  // Send Message
  socket.on('send message', function(data) {
    console.log(data);
    io.sockets.emit('new message', {msg:data});
  });
});