const mongoose = require("mongoose");
const geocoder = require("../geocoderConf");

const Store = mongoose.Schema({
    storeCode: {
        type: String,
        required: [true, "Store code required"]
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    address: {
        type: String,
        required: [false]
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String
    }
}, { timestamps: true });

Store.pre('save', async function () {
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress
    };
});

module.exports = mongoose.model("Store", Store);