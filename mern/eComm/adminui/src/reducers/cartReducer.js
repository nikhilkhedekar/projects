import { getAllCartsState } from "../initStates/cartStates";
import { GET_ALL_CART_FAIL, GET_ALL_CART_REQUEST, GET_ALL_CART_SUCCESS } from "../types/cartTypes";

export const getAllCartsReducer = (state = getAllCartsState, action) => {    
    switch(action.type){
        case GET_ALL_CART_REQUEST:
            return { loading: true, carts: null };
        case GET_ALL_CART_SUCCESS:
            console.log("getAllCartsReducer", action.payload);
            return { loading: false, carts: action.payload };
        case GET_ALL_CART_FAIL:
            return { loading: false, carts: null, error: action.payload }
    }
    return state;
}