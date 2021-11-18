import * as React from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {checkAuth, logout} from "../../redux/AutchReduser";
import {appStateType} from "../../redux/ReduxStore";
import {Redirect} from "react-router-dom";


const Profile = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkAuth())
    }, []);

    const logoutCustomer = () => {
        dispatch(logout())
    }

    const isAuth = useSelector((state: appStateType) => state.auth.isAuth)

    if (!isAuth) {
        return <Redirect to={"/login"}/>
    }

    return (
        <div>
            Profile
            <button onClick={logoutCustomer}></button>
        </div>
    );
}
export default Profile
// export default compose<React.ComponentType>(withAuthRedirect)(Profile);