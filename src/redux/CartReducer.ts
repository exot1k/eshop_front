import {baseThunkType, inferActionTypes} from "./ReduxStore";
import {cartApi} from "../api/CartApi";
import {cartItemsType} from "../types/types";


let initialState = {
    final_price: '',
    id: 0,
    in_order: false,
    owner: [] as Array<any>,
    products: [] as Array<cartItemsType>,
    total_products: 0,
    pageFetching: false
};

export type initialStateType = typeof initialState
type ActionTypes = inferActionTypes<typeof actions>
type ThunkType = baseThunkType<ActionTypes>


const cartReducer = (state = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {
        case 'SET_CART':
            return (
                {...state, ...action.cartData})
        case 'CHANGE_QTY':
            return (
                {
                    ...state, products: state.products.map(c => {
                        if (c.product.id === action.productId) {
                            return {...c, qty: action.qty};
                        }
                        return c
                    })
                })
        case 'DEL_PRODUCT':
            return (
                {
                    ...state, products: state.products.filter(c => !(c.product.id === action.productId))
                })
        case 'SET_PAGE_FETCHING':
            return ({...state, pageFetching: action.pageFetching})
        case 'SET_ITEM_FETCHING':
            return ({
                ...state,
                products: state.products.map(c => {
                    if (c.product.id === action.productId) {
                        return {...c, fetching: action.fetching};
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
    delProduct: (productId: number) =>
        ({type: 'DEL_PRODUCT', productId} as const),
    setPageFetching: (pageFetching: boolean) =>
        ({type: 'SET_PAGE_FETCHING', pageFetching} as const),
    setItemFetching: (productId: number, fetching: boolean) =>
        ({type: 'SET_ITEM_FETCHING', productId, fetching} as const),
}

export const getCartData = (): ThunkType => async (dispatch) => {
    dispatch(actions.setPageFetching(true))
    let response = await cartApi.getCurrentCart()
    if (response.status === 200) {
        dispatch(actions.setCartData(response.data))
        dispatch(actions.setPageFetching(false))
    }
}

export const changeCartQty = (productId: number, qty: number): ThunkType => async (dispatch) => {
    dispatch(actions.setItemFetching(productId, true))
    let response = await cartApi.changeQty(productId, qty)
    if (response.status === 200) {
        (qty === 0) ? dispatch(actions.delProduct(response.data.productId)) :
            dispatch(actions.changeQty(response.data.productId, response.data.qty))
    }
    dispatch(actions.setItemFetching(productId, false))
}


export default cartReducer