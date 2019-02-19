var express = require('express');
const moment = require('moment');
const mongo = require('mongodb').MongoClient;
var app = express();
var http = require('http').Server(app);
var path = require("path");
var io = require('socket.io')(http);


var onlineUsers = [];

app.use(express.static(path.join(__dirname, "public")));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/view/chatPage.html');
});
mongo.connect('mongodb://34.200.211.15:28028/gnie', function(err, db){
    if(err){
        throw err;
    }

    console.log('MongoDB connected...');

io.on('connection', function(socket) {
    let chat = db.collection('chats');

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
        chat.insert({to: userID,from:sender.id, message: message,seen:false,timestamp:now.format()});


    })

});

http.listen(4000, function() {
    console.log('listening on *:3000');
});
});