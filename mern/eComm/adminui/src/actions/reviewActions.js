import { 
    GET_ALL_REVIEWS_REQUEST,
    GET_ALL_REVIEWS_SUCCESS,
    GET_ALL_REVIEWS_FAIL,
} from "../types/reviewTypes";
import AxiosInstance from "../axiosinstance";

export const getAllReviews = () => async (dispatch) => {   
    try {
        dispatch({ type: GET_ALL_REVIEWS_REQUEST });
        const { data } = await AxiosInstance.get(`/api/v1/reviews`)
        console.log("allReviewsAction", data);
        dispatch({
            type: GET_ALL_REVIEWS_SUCCESS,
            payload: data.reviews
        });
    } catch (error) {
        dispatch({
            type: GET_ALL_REVIEWS_FAIL,
            payload: error
        });
    }
}