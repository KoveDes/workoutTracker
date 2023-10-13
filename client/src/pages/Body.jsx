import React, {useState} from 'react';
import {Link, Outlet} from "react-router-dom";
import '../Body.css'
import BodyInfo from "../components/BodyInfo.jsx";
import WeightInfo from "../components/WeightInfo.jsx";
import '../weightInfo.css'

function Body(props) {
    const [refresh, setRefresh] = useState();

    return (
        <>
            <div className='about-page'>
                <h1>Body</h1>
                <div className="grid-container">
                    <div className="first-div">
                        <BodyInfo refresh={refresh}/>
                    </div>
                    <div className="second-div weight">
                        <WeightInfo/>
                    </div>
                    <div className="third-div">
                        <Outlet context={setRefresh}/>
                    </div>
                </div>


            </div>
        </>
    );
}

export default Body;