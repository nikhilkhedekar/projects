import AxiosInstance from "../axiosinstance";
import {
    GET_ALL_STORES_FAIL, GET_ALL_STORES_REQUEST, GET_ALL_STORES_SUCCESS,
    CREATE_STORE_FAIL, CREATE_STORE_REQUEST, CREATE_STORE_SUCCESS
} from "../types/storeTypes";

export const getAllStores = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_STORES_REQUEST });
        const { data } = await AxiosInstance.get("/api/v1/stores");
        console.log("getAllUsers", data);
        dispatch({
            type: GET_ALL_STORES_SUCCESS,
            payload: data.stores
        });
    } catch (error) {
        dispatch({
            type: GET_ALL_STORES_FAIL,
            payload: error
        })
    }
}

export const createStore = (storeData) => async (dispatch) => {
    try {
        console.log("storeData", storeData);
        dispatch({ type: CREATE_STORE_REQUEST });
        const { data } = await AxiosInstance.post("/api/v1/stores", storeData);
        console.log("createStoreAction", data);
        dispatch({
            type: CREATE_STORE_SUCCESS,
            payload: data.store
        });
    } catch (error) {
        dispatch({
            type: CREATE_STORE_FAIL,
            payload: error
        })
    }
}