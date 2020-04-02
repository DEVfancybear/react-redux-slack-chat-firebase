import * as types from "../constants/ActionTypes";

const initialState = {
    currentUser: null,
    isLoading: true
}
export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_USER:
            return {
                ...state, currentUser: action.payload,
                isLoading: false
            }
        case types.CLEAR_USER:
            return {
                ...initialState,
                isLoading: false
            }
        default:
            return state;
    }
}