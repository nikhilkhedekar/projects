import { createStoreState, getAllStoresState } from "../initStates/storeStates";
import {
    GET_ALL_STORES_FAIL, GET_ALL_STORES_REQUEST, GET_ALL_STORES_SUCCESS,
    CREATE_STORE_FAIL, CREATE_STORE_REQUEST, CREATE_STORE_SUCCESS
} from "../types/storeTypes";

export const getAllStoresReducer = (state = getAllStoresState, action) => {
    switch (action.type) {
        case GET_ALL_STORES_REQUEST:
            return { loading: true, stores: null };
        case GET_ALL_STORES_SUCCESS:
            console.log("getAllStoresReducer", action.payload);
            return { loading: false, stores: action.payload };
        case GET_ALL_STORES_FAIL:
            return { loading: false, stores: null, error: action.payload }
    }
    return state;
}

export const createStoreReducer = (state = createStoreState, action) => {
    switch (action.type) {
        case CREATE_STORE_REQUEST:
            return { loading: true, store: null };
        case CREATE_STORE_SUCCESS:
            console.log("createStoreReducer", action.payload);
            return { loading: false, store: action.payload };
        case CREATE_STORE_FAIL:
            return { loading: false, store: null, error: action.payload }
    }
    return state;
}