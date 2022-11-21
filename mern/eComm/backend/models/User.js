const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const geocoder = require("../geocoderConf");
const axios = require("axios");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide email'],
    // match: [
    //   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    //   'Please provide a valid email',
    // ],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide valid email',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  verificationToken: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  verified: Date,
  passwordToken: {
    type: String,
  },
  passwordTokenExpirationDate: {
    type: Date,
  },
  userMobile: {
    number: {
      type: String,
      required: false
    },
    isVerified: {
      type: Boolean,
      required: false,
    },
    requestId: {
      type: String,
      required: false
    }
  },
  mobileOtp: {
    temp_secret: {
      ascii: { type: String, required: false },
      hex: { type: String, required: false },
      base32: { type: String, required: false },
      otpauth_url: { type: String, required: false },
    }
  },
  stripe_customer_id: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: false
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: false
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
      required: false
    },
    formattedAddress: {
      type: String,
      required: false
    }
  }
}, { timestamps: true });

UserSchema.pre('save', async function () {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified('name'));
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  if (this.address != "") {
    const loc = await geocoder.geocode(this.address);
    this.location = {
      type: 'Point',
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress
    };
  } else if (this.address == "" && this.location.coordinates[1] != (undefined || null)) {
    console.log("coords", this.location.coordinates)
    const loc = await geocoder.reverse({ lat: this.location.coordinates[1], lon: this.location.coordinates[0] });
    this.location = {
      type: "Point",
      formattedAddress: loc[0].formattedAddress
    }
    this.address = this.location.formattedAddress;
  } else {
    let userLocation = await axios.get("https://ipapi.co/json");
    this.location = {
      type: "Point",
      coordinates: [userLocation.data.longitude, userLocation.data.latitude],
      formattedAddress: `${userLocation.data.city}, ${userLocation.data.postal}, ${userLocation.data.region_code}, ${userLocation.data.country_code}`
    }
  }


});

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

UserSchema.methods.addAddress = async function (userAddress) {
  console.log("userAddress", userAddress);
  this.address = userAddress;
  const loc = await geocoder.geocode(userAddress);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  }
}

UserSchema.methods.currentLocation = async function (lon, lat) {
  console.log("lngLat", { lon, lat })
  const loc = await geocoder.reverse({ lat, lon });
  this.location = {
    type: "Point",
    formattedAddress: loc[0].formattedAddress
  }
  this.address = this.location.formattedAddress;
}

module.exports = mongoose.model('User', UserSchema);
