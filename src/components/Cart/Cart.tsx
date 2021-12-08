import * as React from 'react';
import styles from './Cart.module.scss'
import {useSelector} from "react-redux";
import {appStateType} from "../../redux/ReduxStore";
import classnames from "classnames";
import Loader from "../Utils/Loader/Loader";
import CartList from "./CartList/CartList";
import CartInfo from "./CartInfo/CartInfo";

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


export default Cart;