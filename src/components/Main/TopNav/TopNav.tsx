import * as React from 'react';
import {useEffect, useState} from 'react';
import styles from "./TopNav.module.scss";
import navChildImg from '../../../img/child.svg'
import navMan from '../../../img/man.svg'
import navWomen from '../../../img/women.svg'
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../../redux/ShoesReducer";
import {appStateType} from "../../../redux/ReduxStore";


const TopNav = () => {
    const filter = useSelector((state: appStateType) => state.shoes.filter)
    const navButtons =
        [
            {
                id: 0,
                navName: 'Мужчины',
                navFilter: 'male',
                navImg: navMan
            },
            {
                id: 1,
                navName: 'Женщины',
                navFilter: 'female',
                navImg: navWomen
            },
            {
                id: 2,
                navName: 'Дети',
                navFilter: 'child',
                navImg: navChildImg
            }]
    let [activeId, setActiveId] = useState(0)
    const dispatch = useDispatch();
    useEffect(() => {
        let navId = navButtons.find((el) => {
            if (el.navFilter === filter.sexType) {
                return true
            }
        })?.id
        setActiveId(navId ? navId : 0)
    }, [filter])

    const onClickNavButton = (id: number) => {
        const sexType = navButtons.find(item => item.id == id)?.navFilter
        dispatch(actions.setShoesFilter(sexType ? sexType : null, null, null))
        setActiveId(id)
    }


    const navButtonsItems = navButtons.map((el) =>
        <div className={styles.boxDiv} onClick={() => onClickNavButton(el.id)}>
            <NavButton key={el.id} navImg={el.navImg} navName={el.navName} active={activeId === el.id}/>
        </div>
    );


    return (
        <div>
            <div className={styles.container}>
                <div className={styles.box}>
                    {navButtonsItems}
                </div>
            </div>
        </div>
    );
}

const NavButton = (props: any) => {
    return (
        <div className={props.active ? styles.active : styles.inactive}>
            <img
                className={styles.hanger_1}
                src={props.navImg}
            />
            <p className={styles.captionf}>
                {props.navName}
            </p>
        </div>
    );
}

export default TopNav;