import * as React from 'react';
import styles from './CartItem.module.scss'
import {useDispatch} from "react-redux";
import {changeCartQty} from "../../../../redux/CartReducer";
import classnames from "classnames";
import Loader from "../../../Utils/Loader/Loader";
import Rating from "../../../Utils/Rating/Rating";
import garbage from "../../../../img/garbage.svg";
import CartButtons from "../../../Utils/CartButtons/CartButtons";


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

export default CartItem;