import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { createProductReducer, getAllProductsReducer } from "../reducers/productReducer";
import { getAllReviewReducer } from "../reducers/reviewReducer";
import { getAllUsersReducer } from "../reducers/userReducer";
import { getAllCartsReducer } from "../reducers/cartReducer";
import { getAllOrderReducer } from "../reducers/orderReducer";
import { createStoreReducer, getAllStoresReducer } from "../reducers/storeReducer";

export const store = createStore(
    combineReducers({
        products: getAllProductsReducer,
        createProduct: createProductReducer,

        reviews: getAllReviewReducer,
        users: getAllUsersReducer,
        carts: getAllCartsReducer,
        orders: getAllOrderReducer,

        stores: getAllStoresReducer,
        createStore: createStoreReducer
    }),
    {},
    composeWithDevTools(applyMiddleware(thunk))
)