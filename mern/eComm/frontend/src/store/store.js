import { applyMiddleware, createStore, combineReducers } from "redux"
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productReducer, productsReducer } from "../reducers/productReducers";
import { deleteReviewReducer, postReviewReducer, reviewReducer, reviewsReducer, updateReviewReducer } from "../reducers/reviewReducers";
import { updatePasswordReducer, updateUserReducer } from "../reducers/userReducers";
import { currentUserOrderReducer, orderReducer, singleOrderReducer, updateOrderReducer } from "../reducers/orderReducers";
import { addToCartReducer, cartCheckoutReducer, cartItemDetailsReducer, currentUserCartReducer, updateCartReducer } from "../reducers/cartReducer";

export const store = createStore(
    combineReducers({
        products: productsReducer,
        product: productReducer,

        postReview: postReviewReducer,
        reviews: reviewsReducer,
        review: reviewReducer,
        updateReview: updateReviewReducer,
        deleteReview: deleteReviewReducer,

        updateUser: updateUserReducer,
        updatePassword: updatePasswordReducer,

        createOrder: orderReducer,
        userOrders: currentUserOrderReducer,
        singleOrder: singleOrderReducer,

        addToCart: addToCartReducer,
        currentUserCart: currentUserCartReducer,
        cartItemDetails: cartItemDetailsReducer,
        cartCheckout: cartCheckoutReducer,
        updateCart: updateCartReducer
    }),
    {},
    composeWithDevTools(applyMiddleware(thunk))
)