import * as React from 'react';
import {useEffect, useState} from 'react';
import styles from "./LeftNav.module.scss";
import inactive from "../../../img/strelca_inactiv.svg";
import active from "../../../img/strelka_active.svg";
import {useDispatch, useSelector} from "react-redux";
import {actions, getShoesBrand, getShoesType} from "../../../redux/ShoesReducer";
import {appStateType} from "../../../redux/ReduxStore";


const LeftNav = () => {


    return (
        <div className={styles.leftNav}>

            <Categories/>
            <Price/>
        </div>
    );
}


const Categories = () => {

    const dispatch = useDispatch();
    const shoesBrandType = 'shoesBrand'
    const shoesTypeType = 'shoesType'

    useEffect(() => {
        dispatch(getShoesType())
        dispatch(getShoesBrand())
    }, []);

    const shoesBrand = useSelector((state: appStateType) => state.shoes.shoesBrand)
    const shoesType = useSelector((state: appStateType) => state.shoes.shoesType)

    const treeData = [{
        id: 1,
        name: "Все категории",
        children: [
            {
                id: 1,
                name: 'Бренд',
                children: shoesBrand.map(s => {
                    return {...s, categoryType: shoesBrandType}
                })
            },
            {
                id: 2,
                name: 'Тип',
                children: shoesType.map(s => {
                    return {...s, categoryType: shoesTypeType}
                })
            }
        ]
    },]

    return (
        <div className={styles.categories}>
            <Tree treeData={treeData}/>
        </div>
    );
}

const Category = (props: any) => {
    const filter = useSelector((state: appStateType) => state.shoes.filter)
    const dispatch = useDispatch()
    let [icon, setIcon] = useState(inactive)
    const onClickCategory = () => {

        if (!props.hasChild) {
            dispatch(actions.setShoesFilter(filter.sexType,
                props.categoryType === 'shoesBrand' ?
                    props.slug === filter.shoesBrand ? null : props.slug : filter.shoesBrand,
                props.categoryType === 'shoesType' ?
                    props.slug === filter.shoesType ?  null : props.slug : filter.shoesType))
        }
        setIcon(icon === active ? inactive : active)
    }

    return (
        <div className={styles.category} onClick={() => onClickCategory()}>
            <div className={styles.categoryImage}>
                {props.hasChild ? <img src={icon}/> : null}
            </div>
            <a>{props.name}</a>
        </div>
    )
}

function TreeChild(props: any) {
    const [childVisible, setChildVisibility] = useState(false);

    const hasChild = props.children && props.children[0] ? true : false;
    const filter = useSelector((state: appStateType) => state.shoes.filter)

    return (
        <li>
            <div className={styles.treeChild} onClick={(e) => setChildVisibility(!childVisible)}>
                <Category name={props.title} hasChild={hasChild} slug={props.slug} categoryType={props.categoryType}/>
            </div>

            {hasChild && childVisible && (
                <Tree treeData={props.children}/>
            )}
        </li>
    )
}

function Tree(props: any) {
    return (
        <ul>
            {props.treeData.map((el: any) => (
                <TreeChild key={el.id} title={el.name} children={el.children} slug={el.slug}
                           categoryType={el.categoryType}/>
            ))}
        </ul>
    );
}

const Price = () => {
    return (
        <div className={styles.price}>

        </div>
    );
}

export default LeftNav;