import * as React from 'react';
import {useEffect} from 'react';
import styles from './Cart.module.scss'
import Rating from "../Utils/Rating/Rating";
import testImg from "../../img/shoesTest.png"
import CartButtons from "../Utils/CartButtons/CartButtons";
import garbage from "../../img/garbage.svg"
import {useDispatch, useSelector} from "react-redux";
import {appStateType} from "../../redux/ReduxStore";
import {getCartData} from "../../redux/CartReducer";

const Cart = () => {
    return (
        <div>
            <CartList/>
            <CartInfo/>
        </div>
    );
}


const CartList = () => {
    const cartItem = useSelector((state: appStateType) => state.cart.cartData)
    console.log(cartItem)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCartData())
    }, [])
    return (
        <div className={styles.cartList}>
            <CartItem/>
            <CartItem/>
            <CartItem/>
            <CartItem/>
            <CartItem/>
            <CartItem/>
            <CartItem/>
            <CartItem/>
            <CartItem/>
            <CartItem/>
            <CartItem/>
            <CartItem/>
            <CartItem/>
            <CartItem/>
            <CartItem/>
        </div>
    );
}

const CartItem = (props: any) => {
    props.image = testImg
    props.name = 'test name'
    props.description = 'test description'
    props.price = 10000
    props.qty = 1
    props.brand = 'Nike'
    props.type = 'Кроссовки'
    return (
        <div className={styles.cartItem}>
            <div className={styles.cartFrame}>
                <img src={props.image}/>
                <div className={styles.title}>
                    <h4>{props.name}</h4>
                    <p>{props.description}</p>
                    <p>Бренд: {props.brand}</p>
                    <p>Тип: {props.type}</p>
                </div>
                <div className={styles.rating}>
                    <Rating/>
                </div>
                <div className={styles.price}>
                    <h2>{props.price} Р.</h2>
                </div>
                <div className={styles.itemsButtons}>
                    <img src={garbage}/>
                    <CartButtons id={props.id} qty={props.qty}/>
                </div>
            </div>
        </div>
    );
}


const CartInfo = () => {
    return (
        <div className={styles.cartInfo}>
            CartInfo
        </div>
    );
}


export default Cart;