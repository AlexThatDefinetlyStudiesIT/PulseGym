import { IHallState, IHallAction, IHallTypes } from "../types/types_hall"

export const initialState = {
    halls: []
}
    
export const hallReducer = (state:IHallState =initialState, action:IHallAction) => {
    switch(action.type){
        case IHallTypes.CREATE_HALL_SUCCESS:
            return{a: [...state.halls, action.enter_id,action.exit_id,action.weight]}
        case IHallTypes.GET_HALL_SUCCESS:
            return {...state, gyms: action.payload || []};
        case IHallTypes.DELETE_HALL_SUCCESS:
            return {
                ...state,
                halls: state.halls.filter(hall => hall.id !== parseInt(action.payload,10))
            };

        default:
            return state;
    }
}