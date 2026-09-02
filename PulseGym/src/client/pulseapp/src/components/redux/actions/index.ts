import { IGymTypes } from '../../types/types';
import { IHallTypes } from '../../types/types_hall';


export const createGyms = (payload: number) => {
    return {
        type: IGymTypes.CREATE_GYM,
        payload
    }
}


export const createHalls = (zero: string, one: string, two:string, three:string) => {
    return {
        type: IHallTypes.CREATE_HALL,
        id: parseInt(zero, 10),
        enter_id: parseInt(one, 10),
        exit_id: parseInt(two, 10),
        weight: parseInt(three, 10)
    }
}

export const getGyms = () => {
    return {
        type: IGymTypes.GET_GYM,
    }
}
export const getHalls = () => {
    return {
        type: IHallTypes.GET_HALL,
    }
}

export const deleteGyms = (payload: string) => {
    return {
        type: IGymTypes.DELETE_GYM,
        payload
    }
}
export const deleteHalls = (payload: string) => {
    return {
        type: IHallTypes.DELETE_HALL,
        payload
    }
}



