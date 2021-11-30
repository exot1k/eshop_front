import classnames from "classnames";
import React from "react";
import styles from './Loader.module.scss'

const Loader = (props: any) => {

    return (
        <div className={styles.dots}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};
export default Loader;