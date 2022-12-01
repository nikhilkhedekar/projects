import {
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_ALL_PRODUCTS_FAIL,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL
} from "../types/productTypes";
import AxiosInstance from "../axiosinstance";

export const getAllProducts = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_PRODUCTS_REQUEST });
        const { data } = await AxiosInstance.get(`/api/v1/products`)
        console.log("allPruductsAction", data);
        dispatch({
            type: GET_ALL_PRODUCTS_SUCCESS,
            payload: data.products
        });
    } catch (error) {
        dispatch({
            type: GET_ALL_PRODUCTS_FAIL,
            payload: error
        });
    }
}

export const createProduct = (productData) => async (dispatch) => {
    try {
        console.log("productData", productData);
        dispatch({ type: CREATE_PRODUCT_REQUEST });
        const { data } = await AxiosInstance.post(`/api/v1/products`, productData)
        console.log("createProductAction", data);
        dispatch({
            type: CREATE_PRODUCT_SUCCESS,
            payload: data.product
        });
    } catch (error) {
        dispatch({
            type: CREATE_PRODUCT_FAIL,
            payload: error
        });
    }
} 