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