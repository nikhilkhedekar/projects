const mongoose = require('mongoose');

const SingleOrderItemSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: true,
  },
});

const OrderSchema = mongoose.Schema(
  {
    tax: {
      type: Number,
      required: true,
    },
    shippingFee: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    orderItems: SingleOrderItemSchema,
    cartItems: [SingleOrderItemSchema],
    cartQty: {
      type: Number,
      required: false
    },
    status: {
      type: String,
      enum: ['pending', 'failed', 'paid', 'delivered', 'canceled', 'expired'],
      default: 'pending',
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    cs_id: {
      type: String,
      required: false,
    },
    txr_id: {
      type: String,
      required: false
    },
    shr_id: {
      type: String,
      required: false
    },
    stripe_payment_intent_id: {
      type: String,
      required: false,
    },
    stripe_client_secret: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
