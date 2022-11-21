const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors/index');
const {
    createTokenUser,
    attachCookiesToResponse,
    checkPermissions,
} = require('../utils/index');
const stripe = require('stripe')("sk_test_51Lq9DaSCO1V2z2OIoxoHodKnAeK2oOab94zLdHM1bEwHFMgcodhPINbppoM9kmtZdCTsoW235XM5q9sPCg26Qh6R001kip0XZX")
const speakeasy = require("speakeasy");
const sendMessage = require("../utils/vonageSendMessage");
const vonage = require("../utils/vonageConfig");

const getAllUsers = async (req, res) => {
    const users = await User.find({ role: 'user' }).select('-password');//select hides password
    const customers = await stripe.customers.list();//will give all customers admin data also
    res.status(StatusCodes.OK).json({ users, customers });
};

const getSingleUser = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id }).select('-password');
    console.log("user", user);
    if (!user) {
        throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
    }
    checkPermissions(req.user, user._id);
    const customer = await stripe.customers.retrieve(user.stripe_customer_id);
    res.status(StatusCodes.OK).json({ user, customer });
};

const showCurrentUser = async (req, res) => {
    console.log("showCurrentUser", req.user)
    const customer = await stripe.customers.retrieve(req.user.stripe_customer_id);
    res.status(StatusCodes.OK).json({ user: req.user, customer });
};

// update user with user.save()
const updateUser = async (req, res) => {
    const { email, name, address, long, lat } = req.body;
    console.log("updateUser", req.body);
    if (!email || !name) {
        throw new CustomError.BadRequestError('Please provide all values');
    }
    const user = await User.findOne({ _id: req.user.userId });

    const customer = await stripe.customers.update(
        user.stripe_customer_id,
        {
            name,
            email,
        }
    );

    user.email = email;
    user.name = name;
    if (address != "") {
        await user.addAddress(address);
    } else if (address == "" && long && lat) {
        await user.currentLocation(long, lat);
    } else {
        let userLocation = await axios.get("https://ipapi.co/json");
        long = userLocation.data.longitude;
        lat = userLocation.data.latitude;
        await user.currentLocation(long, lat);
    }

    await user.save();
    console.log("updatedUser", user);
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.OK).json({
        user: tokenUser, customer
    });
};

const updateUserPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        throw new CustomError.BadRequestError('Please provide both values');
    }
    const user = await User.findOne({ _id: req.user.userId });
    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }
    user.password = newPassword;

    await user.save();
    res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' });
};

const verifyMobile = async (req, res) => {
    const user = await User.find({ _id: req.user.userId });
    user[0].userMobile.number = req.body.number;

    await vonage.verify.request({
        number: req.body.number,
        brand: 'NMK Store'
    }, (error, result) => {
        if (result.status != 0 && result.status != 10) {
            sendMessage({ to: req.body.number, text: result.error_text });
            res.status(StatusCodes.BAD_REQUEST).json({ error: result.error_text });
        } else {
            user[0].userMobile.requestId = result.request_id;
            user[0].save();
            res.status(StatusCodes.OK).json({ message: "Verfication Code sent successfully" });
        }
    });

}

const validateMobile = async (req, res) => {
    const user = await User.find({ _id: req.user.userId });
    await vonage.verify.check({
        request_id: user[0].userMobile.requestId,
        code: req.body.code
    }, (error, result) => {
        if (result.status != 0) {
            sendMessage({ to: user[0].userMobile.number, text: result.error_text });
            res.status(StatusCodes.BAD_REQUEST).json({ error: result.error_text });
        } else {
            user[0].userMobile.isVerified = true;
            user[0].save();
            res.status(StatusCodes.OK).json({ message: "User Mobile number verified successfully" });
        }
    });
    
}

const createOtp = async (req, res) => {
    const user = await User.find({ _id: req.user.userId });
    const { ascii, hex, base32, otpauth_url } = await speakeasy.generateSecret();
    user[0].mobileOtp.temp_secret = { ascii, hex, base32, otpauth_url };
    const token = await speakeasy.totp({
        secret: base32,
        encoding: 'base32',
    });
    sendMessage({
        to: user[0].userMobile.number,
        text: `OTP: ${token}, valid for 3 min`
    });
    console.log("OTP", { ascii, hex, base32, otpauth_url, token });
    await user[0].save();
    res.status(StatusCodes.OK).json({ message: "OTP sent successfullly", token });
}

const verifyOtp = async (req, res) => {
    const user = await User.find({ _id: req.user.userId });
    const { base32: secret } = user[0].mobileOtp.temp_secret;
    console.log({ secret, token: req.body.otp });
    const isVerified = await speakeasy.totp.verify({
        secret,
        encoding: 'base32',
        token: req.body.otp,
        window: 6
    });
    console.log("virified", isVerified);
    user[0].mobileOtp.temp_secret = "";
    await user[0].save();
    res.status(StatusCodes.OK).json({ message: "OTP verified successfully" });
}

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword,
    verifyMobile,
    validateMobile,
    createOtp,
    verifyOtp
};

// update user with findOneAndUpdate
// const updateUser = async (req, res) => {
//   const { email, name } = req.body;
//   if (!email || !name) {
//     throw new CustomError.BadRequestError('Please provide all values');
//   }
//   const user = await User.findOneAndUpdate(
//     { _id: req.user.userId },
//     { email, name },
//     { new: true, runValidators: true }
//   );
//   const tokenUser = createTokenUser(user);
//   attachCookiesToResponse({ res, user: tokenUser });
//   res.status(StatusCodes.OK).json({ user: tokenUser });
// };
