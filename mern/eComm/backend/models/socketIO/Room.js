const mongoose = require("mongoose");

const Room = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model("Room", Room);