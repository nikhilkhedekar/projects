const Order = require('../models/Order');
const Product = require('../models/Product');
const stripe = require('stripe')("sk_test_51Lq9DaSCO1V2z2OIoxoHodKnAeK2oOab94zLdHM1bEwHFMgcodhPINbppoM9kmtZdCTsoW235XM5q9sPCg26Qh6R001kip0XZX")

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors/index');
const { checkPermissions } = require('../utils');

const createOrder = async (req, res) => {
  //0.5% CGST + 0.5% SGST on eCommerce
  const { orderItems, tax, shippingFee } = req.body;

  if (!tax || !shippingFee) {
    throw new CustomError.BadRequestError(
      'Please provide tax and shipping fee'
    );
  }

  let subtotal = 0;
  let session = {};

  const dbProduct = await Product.findOne({ _id: orderItems.product });

  if (!dbProduct) {
    throw new CustomError.NotFoundError(
      `No product with id : ${orderItems.product}`
    );
  }
  const { name, price, image, _id, prod_price_id } = dbProduct;
  const singleOrderItem = {
    amount: orderItems.amount,
    name,
    price,
    image,
    product: _id,
  };

  // calculate subtotal
  subtotal += Number(orderItems.amount) * Number(price);

  session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price: prod_price_id,
        quantity: Number(orderItems.amount),//allow only when product price is not metered
      },
    ],
    customer: req.user.stripe_customer_id,
    success_url: "http://localhost:3000/stripe/success",
    cancel_url: "http://localhost:3000/stripe/cancel",
  });

  // calculate total
  const total = Number(tax) + Number(shippingFee) + subtotal;

  const taxPercent = parseInt((tax / subtotal) * 100)

  const taxRate = await stripe.taxRates.create({
    display_name: 'Mumbai West',
    description: 'Andheri West',
    jurisdiction: 'VP',
    percentage: taxPercent,
    inclusive: true,
  });

  const shippingRates = await stripe.shippingRates.create({
    display_name: 'Ground shipping',
    type: 'fixed_amount',
    fixed_amount: { amount: Number(shippingFee), currency: 'inr' },
  });

  const order = await Order.create({
    orderItems: singleOrderItem,
    total,
    subtotal,
    tax: Number(tax),
    shippingFee: Number(shippingFee),
    user: req.user.userId,
    cs_id: session.id,
    txr_id: taxRate.id,
    shr_id: shippingRates.id
  });

  res
    .status(StatusCodes.CREATED)
    .json({ order, session, taxRate, shippingRates });
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  const taxRates = await stripe.taxRates.list();
  const shippingRates = await stripe.shippingRates.list();
  const sessions = await stripe.checkout.sessions.list();
  res.status(StatusCodes.OK).json({ orders, count: orders.length, taxRates, shippingRates, sessions });
};

const getSingleOrder = async (req, res) => {
  let session, sessionLineItems;
  const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new CustomError.NotFoundError(`No order with id : ${orderId}`);
  }
  checkPermissions(req.user, order.user);
  const taxRate = await stripe.taxRates.retrieve(order.txr_id);
  const shippingRate = await stripe.shippingRates.retrieve(order.shr_id);
  if (order.cs_id) {
    session = await stripe.checkout.sessions.retrieve(order.cs_id);
    sessionLineItems = await stripe.checkout.sessions.listLineItems(order.cs_id);
  }

  res.status(StatusCodes.OK).json({ order, taxRate, shippingRate, session, sessionLineItems });
};

const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId });
  const sessions = await stripe.checkout.sessions.list({ customer: req.user.stripe_customer_id });
  res.status(StatusCodes.OK).json({ orders, count: orders.length, sessions });
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
};

//cancel payment
// const session = await stripe.checkout.sessions.expire(
//   'cs_test_a1qAfSic96qGAotXnSspue7ycbOBVGSMSZBFNi5SFfAHNmI05dj1wbF77K'
// );