import { createProductState, getAllProductState } from "../initStates/productStates";
import { CREATE_PRODUCT_FAIL, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, GET_ALL_PRODUCTS_FAIL, GET_ALL_PRODUCTS_REQUEST, GET_ALL_PRODUCTS_SUCCESS } from "../types/productTypes";

export const getAllProductsReducer = (state = getAllProductState, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS_REQUEST:
            return { loading: true, products: null };
        case GET_ALL_PRODUCTS_SUCCESS:
            console.log("allProductReducer", action.payload);
            return { loading: false, products: action.payload };
        case GET_ALL_PRODUCTS_FAIL:
            return { loading: false, products: null, error: action.payload };
    }
    return state;
}

export const createProductReducer = (state = createProductState, action) => {
    switch (action.type) {
        case CREATE_PRODUCT_REQUEST:
            return { loading: true, product: null };
        case CREATE_PRODUCT_SUCCESS:
            console.log("createProductReducer", action.payload);
            return { loading: false, product: action.payload };
        case CREATE_PRODUCT_FAIL:
            return { loading: false, product: null, error: action.payload };
    }
    return state;
}