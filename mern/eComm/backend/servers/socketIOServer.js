const express = require('express');
const app = express();
// const cors = require('cors')
const cookieParser = require('cookie-parser')
const http = require('http').createServer(app);
const mongoose = require("mongoose")
const { Server } = require('socket.io')
const {
    addUser,
    getUser,
    removeUser
} = require('../utils/socketIO');
const Message = require("../models/socketIO/Message");
const Room = require('../models/socketIO/Room');
const connectDB = require("../db/connect");
// const { instrument } = require("@socket.io/admin-ui");

const port = process.env.SOCKET_IO_PORT || 8000;

app.use(express.json());
app.use(cookieParser());

connectDB(process.env.MONGO_URL);

const socketIOServer = new Server(http, {
    cors: {
        origin: "*",
    }
});

socketIOServer.on('connection', (socket) => {
    console.log(socket.id);

    socket.on("user", (userId) => {
        console.log("user", userId);
        Room.findOne({ user: userId })
            .then(result => {
                socket.emit('output-room', result);
                console.log("current room id", result);
            })
    });

    //create room
    socket.on('create-room', (name, userId) => {
        console.log('Then room name received is ', name)
        Room.create({ name, user: userId })
            .then(result => {
                socketIOServer.emit("room-created", result);
                console.log('room-created', result);
            })
    });

    socket.on('join', ({ name, room_id, user_id }) => {
        console.log("join user args", { name, room_id, user_id })
        const { error, user } = addUser({
            socket_id: socket.id,
            name,
            room_id,
            user_id,
        });
        if (error) {
            console.log('join error', error)
        } else {
            socket.join(room_id);
            console.log('join user', user)
        }
    })

    // //send message
    socket.on('sendMessage', (message, room_id, cb) => {
        console.log("args", { message, room_id });
        const user = getUser(socket.id);
        console.log("sendMessageUser", user);
        const msgToStore = {
            userName: user.name,
            user: user.user_id,
            room: room_id,
            text: message
        }
        console.log('message', msgToStore)
        Message.create(msgToStore)
            .then(result => {
                console.log("msg", result);
                socketIOServer.to(room_id).emit("message", result.text);
                cb();
            })
    });

    socket.on('get-messages-history', room_id => {
        Message.find({ room: room_id }).then(result => {
            socket.emit('output-messages', result)
            console.log("output-messages", result);
        });
    })
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
    })
});

// instrument(io, { auth: false })

http.listen(port, () => {
    console.log(`listening on port ${port}`);
});

module.exports = { socketIOServer }