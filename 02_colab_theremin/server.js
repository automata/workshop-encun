var app = require('http').createServer(handler),
  WebsocketServer = require('websocket').server,
  fs = require('fs'),
  url = require('url'),
  
  readFile = function(pathname, res) {
    if (pathname === '/')
      pathname = 'index.html';

    fs.readFile('./' + pathname, function(err, data) {
      if (err) {
        console.log(err);
        res.writeHead(500);
        return res.end('Error loading client.html');
      }
      res.writeHead(200);
      res.end(data);
    });
  };

wsServer = new WebsocketServer({
  httpServer: app
});

var connections = [];
var commands = [];

wsServer.on('request', function(request) {
  var connection = request.accept('', request.origin);
  connections.push(connection);
  console.log((new Date()) + ' Connection accepted.');

  // Send existing canvas commands to this new client
  connection.sendUTF(JSON.stringify({
        command: "initCommands",
        commands: commands
  }));

  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      d = JSON.parse(message.utf8Data);
      console.log('Received Message:', d);

      // Broadcast
      connections.forEach(function (destination) {
        destination.sendUTF(message.utf8Data);
      });
    }
  });

  connection.on('close', function(reasonCode, description) {
      console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
      var index = connections.indexOf(connection);
      if (index !== -1) {
        // remove the connection from the pool
        connections.splice(index, 1);
      }
      // TODO: Broadcast disconnect to mute the respective voice
      // connections.forEach(function (destination) {
      //   destination.sendUTF(JSON.stringify({}));
      // });
  });
});

app.listen(5050);

// server handler
function handler(req, res) {
  readFile(url.parse(req.url).pathname, res);
}