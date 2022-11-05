const Product = require("../models/Product");
const Review = require("../models/Review");

const resolvers = {
    Query: {
        getAllProducts: async () => {
            const products = await Product.find({}).exec();
            return products;
        },
        getSingleProduct: async (parent, args) => {
            const id = args.id;
            const product = await Product.find({ _id: id }).exec();
            return product[0];
        },
        getAllReviews: async () => {
            const reviews = await Review.find({}).exec();
            return reviews;
        },
        getSingleReview: async (parent, args) => {
            const id = args.id;
            const review = await Review.find({ _id: id }).exec();
            return review[0];
        }
    },
    Product: {
        reviews: async (parent, args) => {
            const reviewList = await Review.find({ product: parent._id }).exec();
            return reviewList;
        }
    },
    Review: {
        product: async (parent, args) => {
            const productDetails = await Product.find({ _id: parent.product }).exec();
            return productDetails;
        }
    }
};

module.exports = {
    resolvers
}