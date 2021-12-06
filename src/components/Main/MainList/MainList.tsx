import * as React from 'react';
import {useEffect} from 'react';
import styles from "./MainList.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {actions, getShoes} from "../../../redux/ShoesReducer";
import {appStateType} from "../../../redux/ReduxStore";
import Card from "./Card/Card";
import * as queryString from "querystring";
import {useHistory} from "react-router-dom";
import useMounted from "../../../customHooks/useMount/useMount";

const MainList = () => {
    const filter = useSelector((state: appStateType) => state.shoes.filter)
    const shoes = useSelector((state: appStateType) => state.shoes.shoes)
    const dispatch = useDispatch();
    const history = useHistory();
    const isMounted = useMounted();

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as { sexType: string, shoesBrand: string, shoesType: string }
        dispatch(actions.setShoesFilter(parsed.sexType ? parsed.sexType : 'male', parsed.shoesBrand, parsed.shoesType))

    }, []);

    useEffect(() => {
        
        if (!isMounted) {
            return
        }

        let searchParams: any = {}
        filter.sexType ? searchParams['sexType'] = filter.sexType : delete searchParams['sexType']
        filter.shoesBrand ? searchParams['shoesBrand'] = filter.shoesBrand : delete searchParams['shoesBrand']
        filter.shoesType ? searchParams['shoesType'] = filter.shoesType : delete searchParams['shoesType']
        history.push({
            pathname: '/',
            search: queryString.stringify(searchParams)
        })
        dispatch(getShoes())
    }, [filter])


    return (
        <div className={styles.mainList}>
            {shoes?.map((el: any) => (
                <Card key={el.id} {...el} />
            ))}
        </div>
    );
}

export default MainList;