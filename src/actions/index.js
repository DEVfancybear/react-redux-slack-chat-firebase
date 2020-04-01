import * as types from "../constants/ActionTypes"

export const setUser = user => {
    return {
        type: types.SET_USER,
        payload: user
    }
}