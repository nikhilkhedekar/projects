const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/full-auth');
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  verifyMobile,
  validateMobile,
  createOtp,
  verifyOtp 
} = require('../controllers/userController');

router
  .route('/')
  .get(
    authenticateUser, authorizePermissions('admin'),
    getAllUsers);

router.route('/showMe').get(
  authenticateUser,
  showCurrentUser);
router.route('/updateUser').patch(
  authenticateUser,
  updateUser);
router.route('/updateUserPassword').patch(
  authenticateUser,
  updateUserPassword);

router.route('/:id').get(
  authenticateUser,
  getSingleUser);

router.route("/mobile/verify")
  .patch(authenticateUser, verifyMobile);
router.route("/mobile/validate")
  .patch(authenticateUser, validateMobile);

router.route("/otp/create")
  .patch(authenticateUser, createOtp);
router.route("/otp/verify")
  .patch(authenticateUser, verifyOtp);

module.exports = router;
