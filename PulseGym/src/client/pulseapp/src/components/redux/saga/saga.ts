
import { call, Effect, put, take, takeEvery } from 'redux-saga/effects'
import { ICreateAction, IDeleteAction, IGym, IGymTypes,  } from '../../types/types';
import { ICreateActionh, IDeleteActionh, IHall, IHallTypes } from '../../types/types_hall';
import { GymApi } from '../../../api';


function* sagaCreateGym(action: ICreateAction): Generator<Effect, void> {
    try {
        const gymObject: Partial<IGym> = {
            id: parseInt(action.payload, 10)
        }
        const gym = yield call(GymApi.createGym, gymObject)
        yield put({ type: IGymTypes.CREATE_GYM_SUCCESS, payload: gym })

    } catch (error) {
    }
}

function* sagaCreateHall(action: ICreateActionh): Generator<Effect, void> {
    try {
        const hallObject: Partial<IHall> = {
            id: action.id,
            enter_id:action.enter_id,
            exit_id:action.exit_id,
            weight:action.weight
        }

        const todo = yield call(GymApi.createHall, hallObject)

        yield put({ type: IHallTypes.CREATE_HALL_SUCCESS, payload: todo })
    } catch (error) {
    }
}
function* sagaGetAllGyms(): Generator<any, void, IGym[]> {
    try {
        const gyms: IGym[] = yield call(GymApi.getAllGyms);
        yield put({ type: IGymTypes.GET_GYM_SUCCESS, payload: gyms });
    } catch (error) {
        // Обработка ошибок
    }
}
function* sagaGetAllHalls(): Generator<any, void, IHall[]> {
    try {
        const halls: IHall[] = yield call(GymApi.getAllHalls);
        yield put({ type: IHallTypes.GET_HALL_SUCCESS, payload: halls });
    } catch (error) {

    }
}

function* sagaDeleteGym(action: IDeleteAction): Generator<Effect, void> {
    try {
        yield call(GymApi.deleteGym, action.payload)
        yield put({ type: IGymTypes.DELETE_GYM_SUCCESS, payload: action.payload })

    } catch (error) {

    }
}

function* sagaDeleteHall(action: IDeleteActionh): Generator<Effect, void> {
    try {
        yield call(GymApi.deleteHall, action.payload)
        yield put({ type: IHallTypes.DELETE_HALL_SUCCESS, payload: action.payload })

    } catch (error) {

    }
}


export function* sagaWatcher(): Generator<Effect, void> {
    yield takeEvery(IGymTypes.CREATE_GYM, sagaCreateGym)
    yield takeEvery(IHallTypes.CREATE_HALL, sagaCreateHall)
    yield takeEvery(IGymTypes.GET_GYM, sagaGetAllGyms)
    yield takeEvery(IHallTypes.GET_HALL, sagaGetAllHalls)
    yield takeEvery(IGymTypes.DELETE_GYM, sagaDeleteGym)
    yield takeEvery(IHallTypes.DELETE_HALL, sagaDeleteHall)

}
