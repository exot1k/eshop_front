import React from 'react';
import styles from './App.module.scss';
import Header from "./components/Header/Header";
import {Route, Switch} from "react-router-dom";
import Main from "./components/Main/Main";
import Profile from "./components/Profile/Profile";
import Login from "./components/Login/Login";


function Cart() {
    return (<div>
        cart
    </div>);
}


function App() {

    return (

        <div className={styles.container_center_horizontal}>
            <div className={styles.wrapper}>
                <Header/>
                <Switch>
                    <Route exact path={"/"} render={() => <Main/>}/>
                    <Route exact path={"/cart"} render={() => <Cart/>}/>
                    <Route path={"/profile"} render={() => <Profile/>}/>
                    <Route path={"/login"} render={() => <Login/>}/>
                    <Route path={"*"} render={() => <div>404</div>}/>
                </Switch>
            </div>

        </div>
    )
        ;
}


export default App;
