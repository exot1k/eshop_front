import * as React from 'react';
import {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {logout} from "../../redux/AutchReduser";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {getProfileData} from "../../redux/ProfileReduser";
import styles from "./Profile.module.scss";


const Profile = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProfileData())
    }, []);

    const logoutCustomer = () => {
        dispatch(logout())
    }


    return (
        <div>
            <div className={styles.profileBackground}>
                <div className={styles.profileForm}>
                    <div className={styles.inputForm}>
                        <label htmlFor="phone"><b>Номер телефона:</b></label>
                        <input type="text" placeholder="Телефон" name="phone"/>
                        <label htmlFor="email"><b>Email:</b></label>
                        <input type="text" placeholder="Email" name="email"/>
                        <label htmlFor="firstName"><b>Имя:</b></label>
                        <input type="text" placeholder="Имя" name="firstName"/>
                        <label htmlFor="lastName"><b>Фамилия:</b></label>
                        <input type="text" placeholder="Фамилия" name="lastName"/>
                        <label htmlFor="address"><b>Адрес:</b></label>
                        <input type="text" placeholder="Адрес" name="address"/>
                        <button onClick={() => logoutCustomer()}>Выйти</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default withAuthRedirect(Profile)
// export default compose<React.ComponentType>(withAuthRedirect)(Profile);