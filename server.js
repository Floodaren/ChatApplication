var mysql = require('mysql');
var express = require('express')
var bodyParser = require('body-parser');
var app = express();

var app2 = require('express')();
var http = require('http').Server(app2);
var io = require('socket.io')(http);


app.listen(3030, function () {
  console.log('Express server is online on port 3030!');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  console.log("A user has connected");
  socket.on('loginUser', function(msg)
  {
    console.log(msg);
    connection.query('SELECT Id,Username FROM Users WHERE Username = ' + "'" + msg.username + "' AND Password = '" + msg.password + "'" ,
    function(error, result){
      if (result == 0)
      {
        socket.emit('loggedInOrNot', result);
      }
      else
      {
        console.log(result);
        socket.emit('loggedInOrNot', result); 
      }
    }); 
  });
});

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'chatapplication'
});

connection.connect(function(err) {
  console.log(err);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});