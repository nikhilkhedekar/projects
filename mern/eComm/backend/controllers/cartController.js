const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require("../models/User");
const stripe = require('stripe')("sk_test_51Lq9DaSCO1V2z2OIoxoHodKnAeK2oOab94zLdHM1bEwHFMgcodhPINbppoM9kmtZdCTsoW235XM5q9sPCg26Qh6R001kip0XZX")

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors/index');
const { checkPermissions } = require('../utils');
const Order = require('../models/Order');
const { getPaymentReceipt } = require('../utils/paymentReceipt');

const addToCart = async (req, res) => {

    const { cartItems, tax, shippingFee } = req.body;

    if (!cartItems || cartItems.length < 1) {
        throw new CustomError.BadRequestError('No cart items provided');
    }
    if (!tax || !shippingFee) {
        throw new CustomError.BadRequestError(
            'Please provide tax and shipping fee'
        );
    }

    let subtotal = 0;
    let total = 0;

    const dbProduct = await Product.findOne({ _id: cartItems.product });//cartItems[0].product
    if (!dbProduct) {
        throw new CustomError.NotFoundError(
            `No product with id : ${cartItems.product}`
        );
    }
    const { name, price, image, _id, prod_price_id } = dbProduct;
    const singleCartItem = {
        amount: cartItems.amount,//cartItems[0].amount
        name,
        price,
        image,
        product: _id,
    };

    subtotal += Number(cartItems.amount) * Number(price);
    total = Number(tax) + Number(shippingFee) + subtotal;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'inr',
        customer: req.user.stripe_customer_id,
    });

    const cart = await Cart.create({
        cartItems: singleCartItem,
        total,
        subtotal,
        tax: Number(tax),
        shippingFee: Number(shippingFee),
        user: req.user.userId,
        cartQty: Number(cartItems.amount),
        stripe_payment_intent_id: paymentIntent.id,
        stripe_client_secret: paymentIntent.client_secret
    });

    res
        .status(StatusCodes.CREATED)
        .json({ cart, paymentIntent });
}

const getAllCartItems = async (req, res) => {
    const allCartItems = await Cart.find({});
    const paymentIntents = await stripe.paymentIntents.list();
    res.status(StatusCodes.OK).json({ Cart: allCartItems, paymentIntents });
}

const getSingleCartItem = async (req, res) => {
    const { id: productId } = req.params;
    const cart = await Cart.findOne({ user: req.user.userId });    
    checkPermissions(req.user, cart.user);
    const { cartItems } = cart;    
    const product = cartItems.find(data => data.product == productId);
    if (!product) {
        throw new CustomError.NotFoundError(`No cart item with id : ${productId}`);
    }
    res.status(StatusCodes.OK).json({ product });
}

const getCartCount = async (req, res) => {
    let cartCount = 0, cart = null;
    cart = await Cart.find({ user: req.user.userId });
    if (cart.length != 0) {
        console.log("cart", cart);
        cartCount = cart[0].cartQty;
        res.status(StatusCodes.OK).json({ cartCount });
    } else {
        console.log("cart", cart);
        res.status(StatusCodes.OK).json({ cartCount: 0 });
    }
}

const getCurrentUserCart = async (req, res) => {
    let paymentIntent = "", cart = [], count = 0;
    cart = await Cart.find({ user: req.user.userId });
    paymentIntent = await stripe.paymentIntents.retrieve(cart[0].stripe_payment_intent_id);
    count = cart[0].cartItems.length;
    res.status(StatusCodes.OK).json({ cart, paymentIntent, count });
}

const updateCart = async (req, res) => {
    const { cartItems, tax, shippingFee } = req.body;
    const existingCartItems = await Cart.find({ user: req.user.userId });
    if (!existingCartItems) {
        throw new CustomError.NotFoundError(`No cart item with id : ${existingCartItems[0]._id}`);
    };
    checkPermissions(req.user, existingCartItems[0].user);
    // console.log("cartItems", cartItems[0].product);

    let updateCartItems = [];
    let updateItem = {};
    let updateCartQty, updateTax, updateShippingFee, updateSubtotal, updateTotal;
    const { cartQty, tax: totalTax, shippingFee: totalShippingFee,
        subtotal: finalSubtotal, total: finalTotal,
        cartItems: addedCartItems, stripe_payment_intent_id } = existingCartItems[0];
    const dbProductIndex = addedCartItems.findIndex(data => data.product == cartItems.product);
    // console.log("index", dbProductIndex);
    const dbProduct = addedCartItems[dbProductIndex];
    // console.log("product", dbProduct);

    if (dbProduct) {
        const { name, image, product, _id, amount, price } = dbProduct;
        updateItem = { name, image, product, _id, price, amount }// + Number(cartItems[0].amount)
        // console.log("updateItemdb", updateItem)
        updateCartItems = [...addedCartItems];
        updateCartItems[dbProductIndex] = updateItem;
        // console.log("updateCartItemsdb", updateCartItems)
    } else {
        const addItem = await Product.findOne({ _id: cartItems.product });
        const { name, price, image, _id } = addItem;
        updateItem = {
            amount: Number(cartItems.amount),
            name,
            price,
            image,
            product: _id,
        };
        updateCartItems = addedCartItems.push(updateItem);
        // console.log("updateItem", updateItem);
        // console.log("updateCartItems", updateCartItems)
    }
    updateCartQty = cartQty + Number(cartItems.amount);
    updateSubtotal = finalSubtotal + (updateItem.amount * updateItem.price);
    updateTax = totalTax + Number(tax);
    updateShippingFee = totalShippingFee + Number(shippingFee);
    updateTotal = updateSubtotal + updateTax + updateShippingFee;
    // console.log("updateTotal", {
    //     updateCartQty, updateTax, updateShippingFee, updateSubtotal, updateTotal
    // })

    const paymentIntent = await stripe.paymentIntents.update(stripe_payment_intent_id, {
        amount: updateTotal,
        currency: 'inr',
        customer: req.user.stripe_customer_id,
    });
    // console.log("updated", paymentIntent);

    existingCartItems[0].cartQty = updateCartQty;
    existingCartItems[0].tax = updateTax;
    existingCartItems[0].shippingFee = updateShippingFee;
    existingCartItems[0].subtotal = updateSubtotal;
    existingCartItems[0].total = updateTotal;
    // existingCartItems[0].cartItems = updateCartItems

    await existingCartItems[0].save();

    res
        .status(StatusCodes.CREATED)
        .json({ existingCartItems, paymentIntent });
}

const checkoutCart = async (req, res) => {
    const cart = await Cart.find({ user: req.user.userId });
    const user = await User.find({ _id: req.user.userId });

    const { cartQty, tax, shippingFee, subtotal, total,
        cartItems, status, stripe_payment_intent_id,
        stripe_client_secret } = cart[0];

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
        fixed_amount: { amount: shippingFee, currency: 'inr' },
    });

    const order = await Order.create({
        cartItems,
        cartQty,
        total,
        subtotal,
        tax,
        shippingFee,
        user: req.user.userId,
        txr_id: taxRate.id,
        shr_id: shippingRates.id,
        stripe_payment_intent_id,
        stripe_client_secret
    });

    const { pdf } = getPaymentReceipt(order);

    await cart[0].remove();

    res.status(StatusCodes.CREATED).json({ order });

}

const checkoutCartByUpi = async ( req, res ) => {
    const cart = await Cart.find({ user: req.user.userId });
    const user = await User.find({ _id: req.user.userId });

    const { tokenizationData } = req.body;

    const { cartQty, tax, shippingFee, subtotal, total,
        cartItems, status, stripe_payment_intent_id,
        stripe_client_secret } = cart[0];            

    const order = await Order.create({
        cartItems,
        cartQty,
        total,
        subtotal,
        tax,
        shippingFee,
        user: req.user.userId,
        tokenizationData,
    });

    const { pdf } = getPaymentReceipt(order);

    await cart[0].remove();

    res.status(StatusCodes.CREATED).json({ order });

}

module.exports = {
    getAllCartItems,
    getCurrentUserCart,
    getSingleCartItem,
    addToCart,
    updateCart,
    checkoutCart,
    getCartCount,
    checkoutCartByUpi
}

// await Cart.updateOne({ user: req.user.userId }, {
//     $expr: {
//         $cond: {
//             if: {
//                 "cartItems.product": cartItems.product
//             },
//             then: {
//                 $add: [ "$amount", (dbProduct.amount + Number(cartItems.amount)) ]
//             },
//             else: {
//                 $push: {
//                     cartItems: {
//                         amount: Number(cartItems.amount),
//                         name,
//                         price,
//                         image,
//                         product: _id,
//                     }
//                 }
//             }
//         }
//     }
// })