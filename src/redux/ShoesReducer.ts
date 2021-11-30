import {baseThunkType, inferActionTypes} from "./ReduxStore";
import {shoesBrandType, shoesType, shoesTypeType} from "../types/types";
import {api} from "../api/Api";
import {cartApi} from "../api/CartApi";


let initialState = {
    shoes: [] as Array<shoesType>,
    shoesType: [] as Array<shoesTypeType>,
    shoesBrand: [] as Array<shoesBrandType>,
    filter: {
        sexType: 'male' as (string | null),
        shoesBrand: null as (string | null),
        shoesType: null as (string | null)
    },
    pageFetching: true
};

export type initialStateType = typeof initialState
type ActionTypes = inferActionTypes<typeof actions>
type ThunkType = baseThunkType<ActionTypes>


const shoesReducer = (state = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {
        case 'SET_SHOES':
            return ({...state, shoes: action.shoes})
        case 'SET_SHOES_TYPE':
            return ({...state, shoesType: action.shoesType})
        case 'SET_SHOES_BRAND':
            return ({...state, shoesBrand: action.shoesBrand})
        case 'SET_SHOES_FILTER':
            return ({...state, filter: action.filter})
        case 'CHANGE_PRODUCT':
            return ({
                ...state,
                shoes: state.shoes.map(c => {
                    if (c.id === action.productId) {
                        return {...c, in_cart: action.inCart, qty: action.qty};
                    }
                    return c
                })
            })
        case 'SET_CARD_FETCHING':
            return ({
                ...state,
                shoes: state.shoes.map(c => {
                    if (c.id === action.productId) {
                        return {...c, fetching: action.fetching};
                    }
                    return c
                })
            })
        case 'SET_PAGE_FETCHING':
            return ({...state, pageFetching: action.pageFetching})
        default:
            return state
    }
}
export const actions = {
    setShoesData: (shoes: Array<shoesType>) =>
        ({type: 'SET_SHOES', shoes} as const),
    setShoesTypeData: (shoesType: Array<shoesTypeType>) =>
        ({type: 'SET_SHOES_TYPE', shoesType} as const),
    setShoesBrandData: (shoesBrand: Array<shoesBrandType>) =>
        ({type: 'SET_SHOES_BRAND', shoesBrand} as const),
    changeProductInCart: (productId: number, qty: number, inCart = true) =>
        ({type: 'CHANGE_PRODUCT', productId, qty, inCart} as const),
    setShoesFilter: (sexType: string | null, shoesBrand: string | null, shoesType: string | null) =>
        ({type: 'SET_SHOES_FILTER', filter: {sexType, shoesBrand, shoesType}} as const),
    setCardFetching: (productId: number, fetching: boolean) =>
        ({type: 'SET_CARD_FETCHING', productId, fetching} as const),
    setPageFetching: (pageFetching: boolean) =>
        ({type: 'SET_PAGE_FETCHING', pageFetching} as const),
}

export const getShoes = (): ThunkType => async (dispatch, getState) => {
     dispatch(actions.setPageFetching(true))
    const filterParams = getState().shoes.filter
    let response = await api.getShoes(filterParams)
    if (response.status === 200) {
        dispatch(actions.setShoesData(response.data.results))
         dispatch(actions.setPageFetching(false))
    }
}

export const getShoesType = (): ThunkType => async (dispatch) => {
     dispatch(actions.setPageFetching(true))
    let response = await api.getShoesType()
    if (response.status === 200) {
        dispatch(actions.setShoesTypeData(response.data.results))
    }
}
export const getShoesBrand = (): ThunkType => async (dispatch) => {
     dispatch(actions.setPageFetching(true))
    let response = await api.getShoesBrand()
    if (response.status === 200) {
        dispatch(actions.setShoesBrandData(response.data.results))
    }
}

export const addProductToCart = (productId: number): ThunkType => async (dispatch) => {
    dispatch(actions.setCardFetching(productId, true))
    let response = await cartApi.addProductToCart(productId)
    if (response.status === 200) {
        dispatch(actions.changeProductInCart(response.data.productId, 1))
        dispatch(actions.setCardFetching(productId, false))
    }
}

export const changeProductQty = (productId: number, qty: number): ThunkType => async (dispatch) => {
    dispatch(actions.setCardFetching(productId, true))
    let response = await cartApi.changeQty(productId, qty)
    if (response.status === 200) {
        dispatch(actions.changeProductInCart(response.data.productId, response.data.qty, response.data.inCart))
        dispatch(actions.setCardFetching(productId, false))
    }
}


export default shoesReducer