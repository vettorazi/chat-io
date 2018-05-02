// modulo a parte para fazer o socket.io funcionar com o express-generator

var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};

socketApi.io = io;


//verificando usuarios novos no servidor
io.on('connection', function(socket){
    console.log('usuario entrou');
    socket.on('disconnect', function(){
    console.log('usuario deslogou');
  });
});

//recebe a mensagem e joga no console.log do servidor.
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('mensagem: ' + msg);
  });
});


//recebe a mensagem e devolve para a aplicacao
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});


socketApi.sendNotification = function() {
    io.sockets.emit('hello', {msg: 'Hello World!'});
}

module.exports = socketApi;
