const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/full-auth');

const {
    addToCart, 
    getAllCartItems, 
    getSingleCartItem,
    getCurrentUserCart, 
    updateCart,
    checkoutCart,
    getCartCount
} = require("../controllers/cartController");

router
.route("/")
.get(
    [authenticateUser, authorizePermissions('admin')],
    getAllCartItems
)
.post(
    authenticateUser,
    addToCart
)
.patch(
    authenticateUser,
    updateCart
);

router
.route("/cartCount")
.get(
    authenticateUser,
    getCartCount
)

router
.route("/user")
.get(
    authenticateUser,
    getCurrentUserCart
)
.post(
    authenticateUser,
    checkoutCart
);

router
.route("/:id")
.get(
    authenticateUser,
    getSingleCartItem
);

module.exports = router;
