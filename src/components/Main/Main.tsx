import * as React from 'react';
import LeftNav from "./LeftNav/LeftNav";
import MainList from "./MainList/MainList";
import TopNav from "./TopNav/TopNav";


const Main = () => {
    return (
        <div>
            <TopNav/>
            <LeftNav/>
            <MainList/>
        </div>
    );
}


export default Main;