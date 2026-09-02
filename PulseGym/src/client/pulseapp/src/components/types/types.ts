export enum IGymTypes{
    CREATE_GYM_SUCCESS='CREATE_GYM_SUCCESS',
    CREATE_GYM='CREATE_GYM',
    GET_GYM_SUCCESS='GET_GYM_SUCCESS',
    GET_GYM='GET_GYM',
    DELETE_GYM_SUCCESS='DELETE_GYM_SUCCESS',
    DELETE_GYM='DELETE_GYM',
    UPDATE_GYM_SUCCESS='UPDATE_GYM_SUCCESS',
    UPDATE_GYM='UPDATE_GYM'
}
export interface IGym{
    id:number
}
export interface IGymState{
     gyms: IGym[]
}

export interface IGymReducer {
    gymReducer: IGymState
}


export interface ICreateAction{
    type: IGymTypes.CREATE_GYM_SUCCESS | IGymTypes.CREATE_GYM;
    payload: string
}

export interface IDeleteAction {
    type: IGymTypes.DELETE_GYM_SUCCESS | IGymTypes.DELETE_GYM;
    payload: string
}

export interface IGetAction {
    type: IGymTypes.GET_GYM_SUCCESS | IGymTypes.GET_GYM;
    payload?: IGymState
}



export type IGymAction = ICreateAction | IDeleteAction | IGetAction 