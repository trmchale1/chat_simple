var http = require('http');

var fs = require('fs');

var cache = {};

var path =  ('./client.html');

function send404(response) {
	response.writeHead(404, {'Content-Type': 'text/plain'})
	response.write('Error 404.');
	response.end();
}

var app = http.createServer(function(request, response) {
	fs.readFile(path, 'utf-8', function (err, data) {
		if(err){
		send404(response);		
			} else {
        response.writeHead(200, {'Content-Type': 'text/html'});
        cache[path] = data;
        response.end(data);
				}
    });
}).listen(1337);

var io = require('socket.io').listen(app);

io.sockets.on('connection', function(socket) {
    socket.on('message_to_server', function(data) {
        io.sockets.emit("message_to_client",{ message: data["message"] });
    });
});
