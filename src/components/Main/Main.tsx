import * as React from 'react';
import LeftNav from "./LeftNav/LeftNav";
import MainList from "./MainList/MainList";
import TopNav from "./TopNav/TopNav";
import Loader from "../Utils/Loader/Loader";
import {useSelector} from "react-redux";
import {appStateType} from "../../redux/ReduxStore";
import styles from "./Main.module.scss";
import classnames from "classnames";


const Main = () => {
    const isFetching = useSelector((state: appStateType) => state.shoes.pageFetching)
    return (
        <div className={classnames(isFetching ? styles.busy : null)}>
            {isFetching ?
                <div className={styles.pageLoader}>
                    <Loader/>
                </div>
                : null}
            <TopNav/>
            <LeftNav/>
            <MainList/>
        </div>
    );
}

export default Main;