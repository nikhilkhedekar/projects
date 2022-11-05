const mongoose = require('mongoose');

const SingleCartItemSchema = mongoose.Schema({
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

const CartSchema = mongoose.Schema(
  {
    tax: {
      type: Number,
      required: false,
      default: 0
    },
    shippingFee: {
      type: Number,
      required: false,
      default: 0
    },
    subtotal: {
      type: Number,
      required: false,
      default: 0
    },
    total: {
      type: Number,
      required: false,
      default: 0
    },
    cartItems: [SingleCartItemSchema],
    cartQty: {
      type: Number,
      required: false,
      default: 0
    },
    status: {
      type: String,
      enum: ['pending', 'failed', 'paid', 'delivered', 'canceled', 'expired'],
      default: 'pending',
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: false,
    },
    stripe_payment_intent_id: {
      type: String,
      required: false,
      default: ""
    },
    stripe_client_secret: {
      type: String,
      required: false,
      default: ""
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', CartSchema);
