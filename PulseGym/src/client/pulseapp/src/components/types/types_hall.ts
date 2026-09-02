export enum IHallTypes{
    CREATE_HALL_SUCCESS='CREATE_HALL_SUCCESS',
    CREATE_HALL='CREATE_HALL',
    GET_HALL_SUCCESS='GET_HALL_SUCCESS',
    GET_HALL='GET_HALL',
    DELETE_HALL_SUCCESS='DELETE_HALL_SUCCESS',
    DELETE_HALL='DELETE_HALL',
    UPDATE_HALL_SUCCESS='UPDATE_HALL_SUCCESS',
    UPDATE_HALL='UPDATE_HALL'
}
export interface IHall{
    id:number,
    enter_id:number,
    exit_id:number,
    weight:number
}
export interface IHallState{
     halls: IHall[]
}

export interface ICreateActionh{
    type: IHallTypes.CREATE_HALL_SUCCESS | IHallTypes.CREATE_HALL;
    id:number,
    enter_id:number,
    exit_id:number,
    weight:number

}

export interface IDeleteActionh {
    type: IHallTypes.DELETE_HALL_SUCCESS | IHallTypes.DELETE_HALL;
    payload:string
}

export interface IGetActionh {
    type: IHallTypes.GET_HALL_SUCCESS | IHallTypes.GET_HALL;
    payload?: IHallState
}

export interface IHallReducer {
    hallReducer: IHallState
}

export interface IEditHall {
    id:number,
    enter_id:number,
    exit_id:number,
    weight:number
}
export interface IEditActionh {
    type: IHallTypes.UPDATE_HALL_SUCCESS | IHallTypes.UPDATE_HALL;
    payload: IEditHall,
    id: number
}


export type IHallAction = ICreateActionh | IDeleteActionh | IGetActionh | IEditActionh