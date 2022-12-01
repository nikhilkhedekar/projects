import AxiosInstance from "../axiosinstance";
import {
    GET_ALL_USERS_REQUEST,
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_FAIL
} from "../types/userTypes";

export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_USERS_REQUEST });        
        const { data } = await AxiosInstance.get("/api/v1/users");
        console.log("getAllUsers", data);
        dispatch({
            type: GET_ALL_USERS_SUCCESS,
            payload: data.users
        });
    }catch (error) {
        dispatch({
            type: GET_ALL_USERS_FAIL,
            payload: error
        })
    }
}