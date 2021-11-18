import * as React from 'react';
import styles from "./Card.module.scss";
import Rating from "../../../Utils/Rating/Rating";
import {useDispatch} from "react-redux";
import {addProductToCart, changeProductQty} from "../../../../redux/ShoesReducer";
import Loader from "../../../Utils/Loader/Loader";


const Card = (props: any) => {
    const dispatch = useDispatch();
    const onAddProduct = () => {

        dispatch(addProductToCart(props.id))
    }
    const onReduceProduct = () => {
        let qty = props.qty
        dispatch(changeProductQty(props.id, --qty))
    }
    const onRaiseProduct = () => {
        let qty = props.qty
        dispatch(changeProductQty(props.id, ++qty))
    }

    return (
        <div className={styles.shoesCart}>

            <img src={props.image}/>
            <div className={styles.cartContent}>
                <div className={styles.detail}>
                    <div className={styles.title}>
                        <h4>{props.name}</h4>
                        <p>{props.description}</p>
                    </div>
                    <div className={styles.rating}>
                        <Rating/>
                    </div>
                </div>
                <div className={styles.order}>
                    <h2>{props.price} Р.</h2>
                    {
                        props.qty > 0 && props.in_cart ?
                            <div>
                                <h3>{props.qty}</h3>
                                <button className={styles.addButtonAdd} onClick={onRaiseProduct}>+</button>
                                <button className={styles.addButtonRemove} onClick={onReduceProduct}>-</button>
                            </div>
                            :
                            <button onClick={onAddProduct}>Add to cart</button>
                    }

                </div>
            </div>
        </div>
    );
}

export default Card;