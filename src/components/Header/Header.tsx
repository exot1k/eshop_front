import * as React from 'react';
import logo from "../../img/logo.png";

import profile from "../../img/profile.svg";
import cart from "../../img/cart.svg";
import styles from './Header.module.scss'
import {NavLink} from "react-router-dom";


const Header = () => {
    return (
        <div>
            <header className={styles.header}>
                <div className={styles.headerFrame}>
                    <div className={styles.leftLogo}>
                        <NavLink to={'/'}>
                            <img src={logo}/>
                            <h1>Shop</h1>
                        </NavLink>
                    </div>
                    {/*<div className={styles.centerSelect}>*/}
                    {/*    <select className={styles.selectCategory}>*/}
                    {/*        <option value={"q"}>All</option>*/}
                    {/*        <option value={"title"}>Title</option>*/}
                    {/*        <option value={"author"}>Author</option>*/}
                    {/*    </select>*/}
                    {/*    <input*/}
                    {/*        className={styles.searchField}/>*/}
                    {/*</div>*/}
                    <div className={styles.rightHeader}>
                        <div className={styles.iconHeader}>
                            <NavLink to={'/profile'}>
                                <img src={profile}/>
                            </NavLink>
                            <NavLink to={'/cart'}>
                                <img src={cart}/>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
        ;
}

export default Header;