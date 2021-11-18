import {baseThunkType, inferActionTypes} from "./ReduxStore";
import {cartApi} from "../api/CartApi";


let initialState = {
    cartData: [] as Array<any>
};

export type initialStateType = typeof initialState
type ActionTypes = inferActionTypes<typeof actions>
type ThunkType = baseThunkType<ActionTypes>


const cartReducer = (state = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {
        case 'SET_CART':
            return (
                {...state, cartData: action.cartData})
        case 'CHANGE_QTY':
            return (
                {
                    ...state, cartData: state.cartData.map(c => {
                        if (c.id === action.productId) {
                            return {...c, qty: action.qty};
                        }
                        return c
                    })
                })
        default:
            return state
    }
}
export const actions = {
    setCartData: (cartData: any) =>
        ({type: 'SET_CART', cartData} as const),
    changeQty: (productId: number, qty: number) =>
        ({type: 'CHANGE_QTY', productId, qty} as const),
}

export const getCartData = (): ThunkType => async (dispatch) => {
    let response = await cartApi.getCurrentCart()
    if (response.status === 200) {
        dispatch(actions.setCartData(response.data))
    }
}

export const changeProductQty = (productId: number, qty: number): ThunkType => async (dispatch) => {
    let response = await cartApi.changeQty(productId, qty)
    if (response.status === 200) {
        dispatch(actions.changeQty(response.data.productId, response.data.qty))
    }
}


export default cartReducer