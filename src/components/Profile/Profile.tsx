import * as React from 'react';
import {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {logout} from "../../redux/AutchReduser";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {getProfileData} from "../../redux/ProfileReduser";


const Profile = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        // dispatch(getProfileData())
    }, []);

    const logoutCustomer = () => {
        dispatch(logout())
    }


    return (
        <div>
            Profile
            <button onClick={logoutCustomer}></button>
        </div>
    );
}
export default withAuthRedirect(Profile)
// export default compose<React.ComponentType>(withAuthRedirect)(Profile);