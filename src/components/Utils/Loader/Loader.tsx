import classnames from "classnames";
import React from "react";
import styles from './Loader.module.scss'

const Loader = (props: any) => {
    const backgroundStyle = props.backgroundStyle || styles.loaderBackground
    return (
        <div className={classnames(backgroundStyle, styles.positionAbsolute)}>
            <div className={styles.loader}>
                <div className={styles.ld3}>
                    <div>
                    </div>
                    <div>
                    </div>
                    <div>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Loader;