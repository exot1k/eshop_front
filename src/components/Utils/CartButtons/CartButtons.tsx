import * as React from 'react';
import styles from "../CartButtons/CartButtons.module.scss";
import {changeProductQty} from "../../../redux/ShoesReducer";
import {useDispatch} from "react-redux";


const CartButtons = (props: any) => {
    const dispatch = useDispatch();
    const onReduceProduct = () => {
        let qty = props.qty
        dispatch(changeProductQty(props.id, --qty))
    }
    const onRaiseProduct = () => {
        let qty = props.qty
        dispatch(changeProductQty(props.id, ++qty))
    }
    return (
        <div className={styles.buttons}>
            {/*<button className={styles.addButtonAdd} onClick={onRaiseProduct}>+</button>*/}
            {/*<h3>{props.qty}</h3>*/}
            {/*<button className={styles.addButtonRemove} onClick={onReduceProduct}>-</button>*/}
            <button className={styles.addButtonAdd} onClick={onRaiseProduct}>+</button>
            <h3>{props.qty}</h3>
            <button className={styles.addButtonRemove} onClick={onReduceProduct}>-</button>
        </div>
    );
}

export default CartButtons;