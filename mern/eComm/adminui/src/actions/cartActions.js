import { GET_ALL_CART_FAIL, GET_ALL_CART_REQUEST, GET_ALL_CART_SUCCESS } from "../types/cartTypes";
import AxiosInstance from "../axiosinstance";

export const getAllCarts = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_CART_REQUEST });        
        const { data } = await AxiosInstance.get("/api/v1/cart");
        console.log("getAllCarts", data);
        dispatch({
            type: GET_ALL_CART_SUCCESS,
            payload: data.Cart
        });
    }catch (error) {
        dispatch({
            type: GET_ALL_CART_FAIL,
            payload: error
        })
    }
}