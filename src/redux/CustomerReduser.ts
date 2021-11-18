import {baseThunkType, inferActionTypes} from "./ReduxStore";
import {customerProfileType} from "../types/types";
import {api} from "../api/Api";

let initialState = {
    customerProfile: null as customerProfileType | null
};

export type initialStateType = typeof initialState
type ActionTypes = inferActionTypes<typeof actions>
type ThunkType = baseThunkType<ActionTypes>

const customerReducer = (state = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {
        case 'SET_CUSTOMER_DATA':
            return ({...state, customerProfile: action.customerProfile})
        default:
            return state
    }
}

export const actions = {
    setCustomerData: (customerProfile: customerProfileType) =>
        ({type: 'SET_CUSTOMER_DATA', customerProfile} as const)
}

export const getCustomerProfileData = (): ThunkType => async (dispatch) => {
    let response = await api.getCustomerProfile()
    if (response.status === 200) {
        dispatch(actions.setCustomerData(response.data))
    }
}

export const changeCustomerProfileData = (customerProfile: customerProfileType): ThunkType => async (dispatch) => {
    let response = await api.changeCustomerProfile(customerProfile)
    if (response.status === 200) {
        dispatch(actions.setCustomerData(response.data))
    }
}

export default customerReducer