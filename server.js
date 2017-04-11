var ws = require("nodejs-websocket")
var clients = [];

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (con) {

	var first = true;
	var position = clients.push(con) - 1;

	con.sendText(JSON.stringify({user: "SERVER", msg: "Bienvenue !"}));

	con.on('text', function ( str ) {
		for ( var i = 0; i < clients.length; i++ )
			clients[i].sendText(str);
	});

	con.on('close', function ( code, reason ) {
		for ( var i = 0; i < clients.length; i++ )
			if ( con === clients[i] ) {
				clients.splice(i, 1);
			}
	});

}).listen(8000)
