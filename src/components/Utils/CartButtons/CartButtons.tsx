import * as React from 'react';
import styles from "../CartButtons/CartButtons.module.scss";


const CartButtons = (props: any) => {

    return (
        <div className={styles.buttons}>
            {/*<button className={styles.addButtonAdd} onClick={onRaiseProduct}>+</button>*/}
            {/*<h3>{props.qty}</h3>*/}
            {/*<button className={styles.addButtonRemove} onClick={onReduceProduct}>-</button>*/}
            <button className={styles.addButtonRemove} onClick={props.onReduceProduct}>-</button>
            <h3>{props.qty}</h3>
            <button className={styles.addButtonAdd} onClick={props.onRaiseProduct}>+</button>
        </div>
    );
}

export default CartButtons;