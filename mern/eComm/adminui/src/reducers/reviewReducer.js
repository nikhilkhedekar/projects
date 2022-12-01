import {
    GET_ALL_REVIEWS_REQUEST, GET_ALL_REVIEWS_SUCCESS, GET_ALL_REVIEWS_FAIL
} from "../types/reviewTypes"
import { getAllReviewState } from "../initStates/reviewStates";

export const getAllReviewReducer = (state = getAllReviewState, action) => {
    switch(action.type){
        case GET_ALL_REVIEWS_REQUEST:
            return { loadin: true, reviews: null };
        case GET_ALL_REVIEWS_SUCCESS:
            console.log("getAllReviewReducer", action.payload);
            return { laoding: false, reviews: action.payload };
        case GET_ALL_REVIEWS_FAIL:
            return { loading: false, reviews: null, error: action.payload }
    }
    return state;
}