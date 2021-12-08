import * as React from 'react';
import {useEffect} from 'react';
import styles from './CartList.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {appStateType} from "../../../redux/ReduxStore";
import {getCartData} from "../../../redux/CartReducer";
import CartItem from "./CartItem/CartItem";


const CartList = () => {
    const cartItems = useSelector((state: appStateType) => state.cart.products)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCartData())
    }, [])

    return (
        <div className={styles.cartList}>
            {cartItems?.map((el: any) => (
                <CartItem key={el.product.id} {...el} />
            ))}
        </div>
    );
}


export default CartList;