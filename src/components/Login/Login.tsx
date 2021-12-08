import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/AutchReduser";
import {appStateType} from "../../redux/ReduxStore";
import {Redirect} from "react-router-dom";


const Login = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector((state: appStateType) => state.auth.isAuth)

    const sendLogin = () => {
        dispatch(login("89999728268", 'admin'))

    }

    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            <input/>
            <input/>
            <button onClick={() => sendLogin()}>send</button>
        </div>
    );
}

export default Login;