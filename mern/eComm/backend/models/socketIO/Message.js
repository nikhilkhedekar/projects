const mongoose = require("mongoose");

const Message = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    room: {
        type: mongoose.Types.ObjectId,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Message", Message);