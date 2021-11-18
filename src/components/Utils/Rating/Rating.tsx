import React, {useState} from "react";
import styles from './Rating.module.scss'

const StarRating = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    return (
        <div>
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className={index <= (hover || rating) ? styles.enabled : styles.disabled}
                        onClick={() => setRating(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                    >
                        <span className={styles.starSpan}>&#9733;</span>
                    </button>

                );
            })}
            <span className={styles.ratingCount}>{hover}</span>
        </div>
    );
};
export default StarRating;