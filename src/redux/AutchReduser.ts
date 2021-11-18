import {authApi} from '../api/AuthApi'
import {baseThunkType, inferActionTypes} from "./ReduxStore";

let initialState = {
    phone: null as (string | null),
    id: null as (number | null),
    isActive: false,
    isAuth: false
};
export type initialStateType = typeof initialState
type ActionTypes = inferActionTypes<typeof actions>
type ThunkType = baseThunkType<ActionTypes>

const authReducer = (state = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA' :
            return ({...state, ...action.payload})
        case 'SET_USER_AUTH':
            return ({...state, ...action.payload})
        default:
            return state
    }
}

export const actions = {
    setUserData: (phone: string | null, id: number | null, isActive: boolean, isAuth: boolean) =>
        ({type: 'SET_USER_DATA', payload: {isAuth, phone, id, isActive}} as const),
    setUserAuth: (isAuth: boolean) =>
        ({type: 'SET_USER_AUTH', payload: {isAuth}} as const),

}

export const login = (phone: string, password: string): ThunkType => async (dispatch) => {
    let response = await authApi.login(phone, password)
    if (response.status === 200) {
        let {phone, id, is_active} = response.data
        dispatch(actions.setUserData(phone, id, is_active, true))
    }
}

export const logout = (): ThunkType => async (dispatch) => {
    let status = await authApi.logout()
    if (status === 200) {
        dispatch(actions.setUserData(null, null, false, false))
    }
}

export const register = (phone: string, password: string): ThunkType => async (dispatch) => {
    let response = await authApi.register(phone, password)
    if (response.status === 200) {
        let {phone, id, is_active} = response.data
        dispatch(actions.setUserData(phone, id, is_active, true))
    }
}

export const checkAuth = (): ThunkType => async (dispatch) => {
    let data = await authApi.checkAuth()
    dispatch(actions.setUserAuth(data.is_authenticated))
}

export default authReducer;