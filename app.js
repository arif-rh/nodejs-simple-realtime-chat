var http = require('http');
var fs = require('fs');
var io = require('socket.io').listen(server);

var server = http.createServer(function(req, res){
	fs.readFile('./index_socket.html', 'utf-8', function(error, content){
		res.writeHead(200, {"Content-Type": "text/html"});
		res.end(content);
	});
});

io.sockets.on('connection', function(socket, username){
	// when client connect, send message
	socket.emit('message', 'You are connected!');
	
	// other client told that someone new has arrived
	socket.broadcast.emit('message', 'Another client has just connected!');
	
	socket.on('add_username', function(username){
		socket.username = username;
	});
	
	socket.on('message', function(message){
		socket.broadcast.emit('message', message);
	});
});

server.listen(8080);