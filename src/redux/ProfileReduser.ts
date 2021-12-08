import {baseThunkType, inferActionTypes} from "./ReduxStore";
import {api} from "../api/Api";

let initialState = {
    id: 0,
    address: null as (string | null),
    email: null as (number | null),
    first_name: false,
    last_name: false,
    orders: [],
};
export type initialStateType = typeof initialState
type ActionTypes = inferActionTypes<typeof actions>
type ThunkType = baseThunkType<ActionTypes>

const profileReducer = (state = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA' :
            return ({...state, ...action.payload})
        default:
            return state
    }
}

export const actions = {
    setUserData: (payload: any) =>
        ({type: 'SET_USER_DATA', payload} as const),
}

export const getProfileData = (): ThunkType => async (dispatch) => {
    let response = await api.getCustomerProfile()
    if (response.status === 200) {
        dispatch(actions.setUserData(response.data))
    }
}


export default profileReducer;