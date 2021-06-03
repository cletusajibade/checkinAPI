const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
var mysql = require('mysql');
require('dotenv').config(); 
 
const path = require('path');
 
  
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');
var pool1      =    mysql.createPool({
  connectionLimit : 1000,
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME,
  debug    :  false
});   
 
var login=require("./routes/routes")
 
const app = express();
const server = http.createServer(app);
const io = socketio(server, 
  {
    cors: {
      origin: '*',
    }
  });

app.use(cors());
app.use(router); 
 
//app.use(express.bodyParser({limit: '50mb'}));
app.use(function(req, res, next) {
    /*res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();*/
    res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.use(express.static(path.join(__dirname, "client")))

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    var a = addUser({ id: socket.id, name, room });
    console.log("a", a);
    const { error, user } = a;

    if(error) return callback(error);

    socket.join(user.room);

    //socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    //socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    if(user){
    io.to(user.room).emit('message', { user: user.name, text: message });
  

    pool1.getConnection(function(err,connection){
          if (err) {
            console.log(err);
            //connection.release();
            throw err;
          } 

          var users = {
          "sender": user.name,
          "message": message,
          "room": user.room

        }
        if((user.room !== undefined) || (user.room !== 'undefined')){
          connection.query('INSERT INTO chat_messages SET ?', users, function (error, results, fields) {
              console.log("msg saved");
          });
        }

    });
    console.log("message",user);
} 
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    console.log("removed user",user);

    if(user) {
      //io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});  
router.get('/host',login.getHost);  
router.post('/host',login.host);

router.post('/editlist',login.editListing);
router.post('/deleteList',login.deleteListing);

router.post('/signup',login.register);
router.post('/login',login.login);
app.use('/api', router);
router.post('/forgot',login.sendMail); 
router.get('/host/:id',login.hostId);
router.post('/getListofBookings',login.getListofBookings);

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));