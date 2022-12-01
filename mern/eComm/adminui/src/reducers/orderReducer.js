import { getAllOrdersState } from "../initStates/orderStates";
import { GET_ALL_ORDERS_FAIL, GET_ALL_ORDERS_REQUEST, GET_ALL_ORDERS_SUCCESS } from "../types/orderTypes";

export const getAllOrderReducer = (state = getAllOrdersState, action) => {
    switch(action.type){
        case GET_ALL_ORDERS_REQUEST:
            return { loading: true, orders: null };
        case GET_ALL_ORDERS_SUCCESS:
            console.log("getAllOrderReducer", action.payload);
            return { loading: false, orders: action.payload };
        case GET_ALL_ORDERS_FAIL:
            return { loading: false, orders: null, error: action.payload }
    }
    return state;
}