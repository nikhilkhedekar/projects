import { getAllUsersState } from "../initStates/userState";
import { GET_ALL_USERS_FAIL, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS } from "../types/userTypes";

export const getAllUsersReducer = (state = getAllUsersState, action) => {
    switch(action.type){
        case GET_ALL_USERS_REQUEST:
            return { loading: true, users: null };
        case GET_ALL_USERS_SUCCESS:
            console.log("getAllUsersReducer", action.payload);
            return { loading: false, users: action.payload };
        case GET_ALL_USERS_FAIL:
            return { loading: false, users: null, error: action.payload }
    }
    return state;
}