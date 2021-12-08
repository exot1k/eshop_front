import * as React from 'react';
import styles from './CartInfo.module.scss'
import {useSelector} from "react-redux";
import {appStateType} from "../../../redux/ReduxStore";


const CartInfo = () => {
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


export default CartInfo;