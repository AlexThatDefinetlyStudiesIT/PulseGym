import { IGymState, IGymAction, IGymTypes } from "../types/types"
export const initialState = {
    gyms: []
}
export const gymReducer = (state:IGymState =initialState, action:IGymAction) => {
    switch(action.type){
        case IGymTypes.CREATE_GYM_SUCCESS:
            return{gym: [...state.gyms, action.payload]}
        case IGymTypes.GET_GYM_SUCCESS:
            return { ...state, todos: action.payload } 
        case IGymTypes.DELETE_GYM_SUCCESS:
            return { ...state, gyms: state.gyms.filter(gym => gym.id !== parseInt(action.payload,10)) }
        default:
            return state;
    }
}