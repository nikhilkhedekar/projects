const Store = require("../models/Store");
const { StatusCodes } = require('http-status-codes');

const createStore = async (req, res) => {
    req.body.user = req.user.userId;
    const store = await Store.create(req.body);
    res.status(StatusCodes.CREATED).json({ store });
}

const getAllStores = async (req, res) => {
    const stores = await Store.find({});
    res.status(StatusCodes.OK).json({ stores, count: stores.length });
}

module.exports = {
    createStore,
    getAllStores
}