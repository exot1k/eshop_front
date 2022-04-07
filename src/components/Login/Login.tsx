import * as React from 'react';
import {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/AutchReduser";
import {appStateType} from "../../redux/ReduxStore";
import {Redirect} from "react-router-dom";
import styles from './Login.module.scss'

const Login = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector((state: appStateType) => state.auth.isAuth)
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const onChangePhone = (e: any) => {
        setPhone(e.target.value)
    }
    const onChangePassword = (e: any) => {
        setPassword(e.target.value)
    }
    const sendLogin = () => {
        dispatch(login(phone, password))
    }

    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            <div className={styles.loginBackground}>
                <div className={styles.loginForm}>
                    <div className={styles.inputForm}>
                        <label htmlFor="phone"><b>Номер телефона:</b></label>
                        <input type="text" placeholder="Введите телефон" name="phone" required value={phone}
                               onChange={onChangePhone}/>
                        <label htmlFor="password" className={styles.marginTop10}><b>Пароль:</b></label>
                        <input type="text" placeholder="Введите пароль" name="password" required value={password}
                               onChange={onChangePassword}/>
                        <button onClick={() => sendLogin()}>Ввойти</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;