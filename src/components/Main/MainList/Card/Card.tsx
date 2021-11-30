import * as React from 'react';
import styles from "./Card.module.scss";
import Rating from "../../../Utils/Rating/Rating";
import {useDispatch} from "react-redux";
import {addProductToCart} from "../../../../redux/ShoesReducer";
import Loader from "../../../Utils/Loader/Loader";
import classnames from "classnames";
import CartButtons from "../../../Utils/CartButtons/CartButtons";


const Card = (props: any) => {
    const dispatch = useDispatch();
    const onAddProduct = () => {

        dispatch(addProductToCart(props.id))
    }


    return (
        <div className={classnames(styles.shoesCart, props.fetching ? styles.opacity_0_5 : null)}>
            {props.fetching ?
                <div className={styles.cardLoader}>
                    <Loader/>
                </div>
                : null
            }
            <div>
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
                                <CartButtons id={props.id} qty={props.qty}/>
                                :
                                <div>
                                    <button className={styles.createButton}onClick={onAddProduct}>Add to cart</button>
                                </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;