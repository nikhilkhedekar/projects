const express = require("express");
const { authenticateUser, authorizePermissions } = require("../middleware/full-auth");
const { createStore, getAllStores } = require("../controllers/storeController");

const router = express.Router();

router
.route("/")
.post( 
    [authenticateUser, authorizePermissions('admin')], 
    createStore)
.get(getAllStores);

module.exports = router