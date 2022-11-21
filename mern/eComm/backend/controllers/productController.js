const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors/index');
const path = require('path');
const stripe = require('stripe')("sk_test_51Lq9DaSCO1V2z2OIoxoHodKnAeK2oOab94zLdHM1bEwHFMgcodhPINbppoM9kmtZdCTsoW235XM5q9sPCg26Qh6R001kip0XZX")

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const stripeProduct = await stripe.products.create({
    name: req.body.name,
  });
  const stripeProductPrice = await stripe.prices.create({
    unit_amount: Number(req.body.price),//autonumeric
    // unit_amount_decimal: Number(00),
    currency: 'inr',
    product: stripeProduct.id,
  });
  const product = await Product.create({
    ...req.body,
    prod_id: stripeProduct.id,
    prod_price_id: stripeProductPrice.id
  });
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const stripeProducts = await stripe.products.list();
  const stripePrices = await stripe.prices.list();
  const products = await Product.find({});

  res.status(StatusCodes.OK).json({
    products,
    count: products.length,
    stripeProductList: stripeProducts,
    stripePricesList: stripePrices
  });
};

const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId }).populate('reviews');

  const stripeProduct = await stripe.products.retrieve(product.prod_id);
  const StripePrice = await stripe.prices.retrieve(product.prod_price_id);

  if (!product) {
    CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product, stripeProduct, StripePrice });
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  const tempProduct = await Product.findOne({ _id: productId })
  const stripeProduct = await stripe.products.update(
    tempProduct.prod_id,
    {
      name: req.body.name
    }
  );
  const stripePrice = await stripe.prices.update(
    tempProduct.prod_price_id,
    {}
  );

  res.status(StatusCodes.OK).json({ product, stripeProduct, stripePrice });
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  await stripe.products.del(product.prod_id); 
  await product.remove();

  res.status(StatusCodes.OK).json({ msg: 'Success! Product removed.' });
};
const uploadImage = async (req, res) => {
  // if (!req.files) {
  //   throw new CustomError.BadRequestError('No File Uploaded');
  // }
  // const productImage = req.files.image;

  // if (!productImage.mimetype.startsWith('image')) {
  //   throw new CustomError.BadRequestError('Please Upload Image');
  // }

  // const maxSize = 1024 * 1024;

  // if (productImage.size > maxSize) {
  //   throw new CustomError.BadRequestError(
  //     'Please upload image smaller than 1MB'
  //   );
  // }

  // const imagePath = path.join(
  //   __dirname,
  //   '../public/uploads/' + `${productImage.name}`
  // );
  // await productImage.mv(imagePath);
  // res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
