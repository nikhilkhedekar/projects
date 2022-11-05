const typeDefs = `
    type Product {
        _id: ID!
        name: String!
        price: String!
        description: String!
        image: String
        category: Category!
        company: Company!
        colors: String!
        featured: Boolean
        freeShipping: Boolean
        inventory: Int!
        averageRating: Int
        numOfReviews: Int
        user: ID!
        prod_id: ID!
        prod_price_id: ID!
        reviews: [Review]
    }       
    enum Category {
        office
        kitchen
        bedroom
    }
    enum Company {
        ikea
        liddy
        marcos
    }

    type Review {
        _id: ID!
        rating: Int!
        title: String!
        comment: String!
        user: ID!
        product: [Product]
    }
    
    type Query {
        getAllProducts: [Product!]!
        getSingleProduct(id: ID!): Product! 
        getAllReviews: [Review!]!
        getSingleReview(id: ID!): Review!
    }`

module.exports = {
    typeDefs
}

// {
//     getAllProducts {
    // _id
//       name
//       price
//       description
//       image
//       category
//       company
//       featured
//       freeShipping
//       inventory
//       averageRating
//       numOfReviews
//       user
//       prod_id
//       prod_price_id
//     }
//   }

// //variables
// {
//     "productId": "633fc0ce707a9a9e2b040922"
// }
// query getProduct($productId: ID!){
//     getSingleProduct(id: $productId) {
//         name
//         price
//         description
//         image
//         category
//         company
//         featured
//         freeShipping
//         inventory
//         averageRating
//         numOfReviews
//         user
//         prod_id
//         prod_price_id
//         reviews {
//           _id
//           rating
//           title
//           comment
//           user
//           product
//         }
//     }
// }

// {
//     getAllReviews {
        // _id
//       rating
//       title
//       comment
//       user
//       product
//     }
//   }

// {
//     "reviewId": "633fc215f784282fa6515551"
// }
// query getReview($reviewId: ID!){
//     getSingleReview(id: $reviewId) {
//         rating
//         title
//         comment
//         user
//         product
//     }
// }