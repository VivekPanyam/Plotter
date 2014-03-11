var express = require('express'), app = express();
var path = require('path');
app.use(express.bodyParser())
app.use(express.static(path.join(__dirname, 'public')));

var server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(process.env.PORT || 8000);

var auth = "INSERT_AUTH_KEY_HERE";

app.get('/data/:auth/:data', function (req, res) {
  if (req.params.auth == auth) {
  	io.sockets.emit('data', { data: req.params.data });
  	res.send("ok");
  } else {
  	res.send("auth error");
  }
});

io.sockets.on('connection', function (socket) {

});