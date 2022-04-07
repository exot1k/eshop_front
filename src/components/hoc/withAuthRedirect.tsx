import React, {useEffect} from "react";
import {checkAuth} from "../../redux/AutchReduser";
import {useDispatch, useSelector} from "react-redux";
import {appStateType} from "../../redux/ReduxStore";
import {Redirect} from "react-router-dom";


// let mapStateToProps = (state: appStateType) => ({
//     isAuth: state.auth.isAuth
// } as MapPropsType)
//
// type MapPropsType = {
//     isAuth: boolean
// }
//
// const isAuth = useSelector((state: appStateType) => state.auth.isAuth)
// type DispatchPropsType = {}
//
// export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
//     const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
//         let {isAuth, ...restProps} = props
//         if (!props.isAuth) return <Redirect to={"/login"}/>
//         return <WrappedComponent {...restProps as WCP} />
//     }
//
//     let ConnectedAuthRedirectComponent = connect<MapPropsType, DispatchPropsType, WCP, appStateType>(
//         mapStateToProps, {})
//     (RedirectComponent)
//
//     return ConnectedAuthRedirectComponent;
// }

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    const RedirectComponent: React.FC = (props) => {
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(checkAuth())


        }, []);
        const isAuth = useSelector((state: appStateType) => state.auth.isAuth)
        if (!isAuth) {
            return <Redirect to={"/login"}/>
        }
        return <WrappedComponent {...props as WCP}/>;
    }
    return RedirectComponent
}
