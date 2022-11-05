const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors/index');
const {
    createTokenUser,
    attachCookiesToResponse,
    checkPermissions,
} = require('../utils/index');
const stripe = require('stripe')("sk_test_51Lq9DaSCO1V2z2OIoxoHodKnAeK2oOab94zLdHM1bEwHFMgcodhPINbppoM9kmtZdCTsoW235XM5q9sPCg26Qh6R001kip0XZX")

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
    const { email, name } = req.body;
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

    await user.save();

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

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword,
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
