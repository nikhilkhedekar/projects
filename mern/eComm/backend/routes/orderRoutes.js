const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/full-auth');

const {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  gPayUPIMethod,
} = require('../controllers/orderController');

router
  .route('/')
  .post(
    authenticateUser, 
    createOrder)
  .get(
    [authenticateUser, authorizePermissions('admin')], 
    getAllOrders);

router
.route("/upi")
.post(
  authenticateUser,
  gPayUPIMethod
)

router.route('/showAllMyOrders').get(authenticateUser, getCurrentUserOrders);

router
  .route('/:id')
  .get(authenticateUser, getSingleOrder);  

module.exports = router;
