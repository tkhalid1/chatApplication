var express = require('express');
const moment = require('moment');
const jwt = require("jsonwebtoken");
const AWS = require('aws-sdk');
const mongoose = require('mongoose');
var app = express();
var http = require('http').Server(app);
var path = require("path");
var io = require('socket.io')(http);


var onlineUsers = [];

app.use(express.static(path.join(__dirname, "public")));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/view/chatPage.html');
});
let connection =  null

if (connection === null){
  mongoose.connect('mongodb://ec2-34-200-211-15.compute-1.amazonaws.com:28028/gnie',
  {
    useNewUrlParser: true,
  }
  ).then(con => {
    connection = con
  })
}
const {Chat} = require('./db')(mongoose)
const ObjectId = mongoose.Types.ObjectId

    io.use(function(socket, next){
        if (socket.handshake.query && socket.handshake.query.token){
            console.log("this is the socket",socket.handshake.query);
            let token  = socket.handshake.query.token;
          jwt.verify(token, 'DED7AC2362964B77869F67F5CB357',{ algorithms: ['HS256'] }, function(err, decoded) {
            if(err) return next(new Error('Authentication error'));
            socket.decoded = decoded;
            next();
          });
        } else {
            next(new Error('Authentication error'));
        }    
      })
.on('connection', function(socket) {
    

    //   console.log('a user connected');

    socket.on('user name', function(user, callback) {
        var temp = 0;
        onlineUsers.push({
            profileName: user.userName,
            profileId: socket.id,
            profileImage: user.imageUrl,
            profileAge: user.userAge,
            profileSchool: user.userSchool,
            profileCity: user.userCity,
            counter: temp
        })

        // console.log(userName);
        console.log(onlineUsers);

        io.sockets.emit('connectedUsers', onlineUsers);

    });

    socket.on('disconnect', function() {
        var i = 0;
        while (i < onlineUsers.length) {
            if (onlineUsers[i].profileId == socket.id) {
                break;
            }
            i++;
        }
        console.log(socket.id + 'disconnect');

        onlineUsers.splice(i, 1);
        io.sockets.emit('connectedUsers', onlineUsers);
        //console.log('user disconnected');
    });

    let now = moment();
    socket.on('chatting', function(message, sender, receiver,userID) {

        socket.to(receiver).emit('reciverPeer', message, socket.id, receiver);
        socket.emit('senderPeer', message, socket.id, receiver);
        let chat = new Chat();
        let date = new Date();
        chat.to = ObjectId(userID);
        chat.from = ObjectId(sender.id);
        chat.message = message;
        chat.seen = false,
        chat.timestamp = date;
        chat.save();
        let wishNotificationInfo = {from: sender.id,to: userID, message: message, action: "chat"};
        console.log("the wish info object is" + JSON.stringify(wishNotificationInfo));
        let params = {
            FunctionName: 'serverless-notifications-dev-SendNotification',
            InvocationType: 'RequestResponse',
            LogType: 'Tail',
            Payload: JSON.stringify(wishNotificationInfo)
        };
        new AWS.Lambda().invoke(params).promise();



    })

});

http.listen(4000, function() {
    console.log('listening on *:4000');
});
