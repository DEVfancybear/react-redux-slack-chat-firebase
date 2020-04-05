import * as types from "../constants/ActionTypes";

const initialState = {
    currentChannel: null,
    isPrivateChannel: false,
    userPosts: null
}
export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_CURRENT_CHANNEL:
            return {
                ...state,
                currentChannel: action.payload
            }
        case types.SET_PRIVATE_CHANNEL:
            return {
                ...state,
                isPrivateChannel: action.payload
            }
        case types.SET_USER_POSTS:
            return {
                ...state,
                userPosts: action.payload
            };
        default:
            return state;
    }
}