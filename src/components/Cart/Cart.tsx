import * as React from 'react';
import {useEffect} from 'react';
import styles from './Cart.module.scss'
import Rating from "../Utils/Rating/Rating";
import CartButtons from "../Utils/CartButtons/CartButtons";
import garbage from "../../img/garbage.svg"
import {useDispatch, useSelector} from "react-redux";
import {appStateType} from "../../redux/ReduxStore";
import {changeCartQty, getCartData} from "../../redux/CartReducer";
import classnames from "classnames";
import Loader from "../Utils/Loader/Loader";

const Cart = () => {
    const isFetching = useSelector((state: appStateType) => state.cart.pageFetching)
    return (
        <div className={classnames(isFetching ? styles.busy : null)}>
            {isFetching ?
                <div className={styles.pageLoader}>
                    <Loader/>
                </div>
                : null}
            <CartList/>
            <CartInfo/>
        </div>
    );
}


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

const CartItem = (props: any) => {
    const dispatch = useDispatch();

    const onReduceProduct = () => {
        let qty = props.qty
        dispatch(changeCartQty(props.product.id, --qty))
    }
    const onRaiseProduct = () => {
        let qty = props.qty
        dispatch(changeCartQty(props.product.id, ++qty))
    }
    const onDelProduct = () => {
        dispatch(changeCartQty(props.product.id, 0))
    }

    return (
        <div className={classnames(styles.cartItem, props.fetching ? styles.opacity_0_5 : null)}>
            {props.fetching ?
                <div className={styles.itemLoader}>
                    <Loader/>
                </div>
                : null
            }
            <div className={styles.cartFrame}>
                <img src={props.product.image}/>

                <div className={styles.title}>
                    <h4>{props.product.name}</h4>
                    <Rating/>
                    <p>{props.product.description}</p>
                    <p>Бренд: {props.product.brand}</p>
                    <p>Тип: {props.product.type}</p>
                </div>

                <div className={styles.itemsButtons}>
                    <h2>{props.final_price} Р.</h2>
                    <img src={garbage} onClick={onDelProduct}/>
                    <CartButtons id={props.product.id} qty={props.qty} onReduceProduct={onReduceProduct}
                                 onRaiseProduct={onRaiseProduct}/>
                </div>
            </div>
        </div>
    );
}


const CartInfo = (props: any) => {
    const cartInfo = useSelector((state: appStateType) => state.cart)
    return (
        <div className={styles.cartInfo}>
            <div>
                <h4>Товаров: {cartInfo.total_products}</h4>
            </div>
            <div>
                <h4>Итого: {cartInfo.final_price}</h4>
            </div>
            <div>
                <button>Перейти к оформлению</button>
            </div>
        </div>
    );
}


export default Cart;