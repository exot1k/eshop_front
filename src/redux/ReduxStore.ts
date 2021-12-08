import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import authReducer from "./AutchReduser";
import shoesReducer from "./ShoesReducer";
import cartReducer from "./CartReducer";
import profileReducer from "./ProfileReduser";

type rootReducerType = typeof rootReducer
export type appStateType = ReturnType<rootReducerType>

export type  inferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export type baseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, appStateType, any, A>

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    shoes: shoesReducer,
    profile: profileReducer
})
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

// @ts-ignore
window.store = store;