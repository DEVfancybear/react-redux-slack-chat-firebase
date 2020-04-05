import * as types from "../constants/ActionTypes"
/* User Actions */
export const setUser = user => {
    return {
        type: types.SET_USER,
        payload: user
    }
}
export const clearUser = () => {
    return {
        type: types.CLEAR_USER
    }
}
/* Channel Actions */
export const setCurrentChannel = channel => {
    return {
        type: types.SET_CURRENT_CHANNEL,
        payload: channel
    }
}
export const setPrivateChannel = isPrivateChannel => {
    return {
        type: types.SET_PRIVATE_CHANNEL,
        payload: isPrivateChannel
    }
}
export const setUserPosts = userPosts => {
    return {
        type: types.SET_USER_POSTS,
        payload: userPosts

    };
};

/* Colors Actions */
export const setColors = (primaryColor, secondaryColor) => {
    return {
        type: types.SET_COLORS,
        payload: {
            primaryColor,
            secondaryColor
        }
    };
};