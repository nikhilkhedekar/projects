import AxiosInstance from "../axiosinstance";
import { GET_ALL_ORDERS_FAIL, GET_ALL_ORDERS_REQUEST, GET_ALL_ORDERS_SUCCESS } from "../types/orderTypes";

export const getAllOrders = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_ORDERS_REQUEST });        
        const { data } = await AxiosInstance.get("/api/v1/orders");
        console.log("getAllOrders", data);
        dispatch({
            type: GET_ALL_ORDERS_SUCCESS,
            payload: data.orders
        });
    }catch (error) {
        dispatch({
            type: GET_ALL_ORDERS_FAIL,
            payload: error
        })
    }
}