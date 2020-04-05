import * as types from "../constants/ActionTypes";

const initialState = {
    primaryColor: "#4c3c4c",
    secondaryColor: "#eee"
};
export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_COLORS:
            return {
                primaryColor: action.payload.primaryColor,
                secondaryColor: action.payload.secondaryColor
            };
        default:
            return state;
    }
}
