var mysql = require('mysql');
var express = require('express')
var bodyParser = require('body-parser');
var app = express();

var app2 = require('express')();
var http = require('http').Server(app2);
var io = require('socket.io')(http);
var onlineUsers = [];
var firstOnlineUser = true;
var userOnlineMatch = false;

app.listen(3030, function () {
  console.log('Express server is online on port 3030!');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


io.on('connection', function(socket){
  //-----------------------------------------------------
  socket.on('disconnect', function(){
    io.sockets.emit('disconnect', {messageToEveryone: "A user has disconnected"})
  });
  //-----------------------------------------------------
  socket.on('loginUser', function(msg)
  {
    
    connection.query('SELECT Id,Username FROM Users WHERE Username = ' + "'" + msg.username + "' AND Password = '" + msg.password + "'" ,
    function(error, result){
      if (result == 0)
      {
        socket.emit('loggedInOrNot', result);
      }
      else
      {
        socket.emit('loggedInOrNot', result); 
      }
    }); 
  });
  //-----------------------------------------------------
  socket.on('sendMessage', function(msg){
    io.sockets.emit('recieveChatMessages', {messageToEveryone: msg.message, messageUsername: msg.username});
  });
  //-----------------------------------------------------
  socket.on('registerUser', function(msg){
    var userNameToLower = msg.username.toLowerCase();
    userDidMatch = false;
    connection.query('SELECT * FROM Users', 
    function(error,result)
    {
      result.forEach(function(element) {
        if (element.Username == userNameToLower)
        {
          userDidMatch = true;
          socket.emit('userRegisterd', {successOrNot: "false"});
        }
      }, this);
      if (userDidMatch == false)
      {     
        connection.query('INSERT INTO Users (Username,Password) VALUES ("' + userNameToLower + '","' + msg.password + '")',
        function(error, result){
          if (result == 0)
          {
            socket.emit('userRegisterd', {successOrNot: "false"});
          }
          else
          {
            socket.emit('userRegisterd', {successOrNot: "true"});
          }
        });
      }
    });
  });
  //-----------------------------------------------------
  socket.on('showUsers',function(data){
    if (firstOnlineUser == true)
    {
      onlineUsers.push(data);
      firstOnlineUser = false;
    }
    else 
    {
      onlineUsers.forEach(element => {
        if (data.userName == element.userName)
        {
          userOnlineMatch = true;
        }
      });

      if (userOnlineMatch == true)
      {
        onlineUsers.forEach(element => {
          if (data.userName == element.userName)
          {
            element.userId = data.userId;
            userOnlineMatch = false;
          }
        });
      }
      else 
      {
        onlineUsers.push(data);
      }
    }
    io.sockets.emit('returnOnlineUsers', {onlineUsers: onlineUsers});
  });
  //Object.keys(io.sockets.sockets)
  //-----------------------------------------------------
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