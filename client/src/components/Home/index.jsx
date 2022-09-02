
import "./Home.css";

import { Outlet } from "react-router-dom";

import Header from "../Header";


function Home () {


    return (
        <div className="homeContainer">
            <Header />
            <div className="contentContainer">
                <Outlet />
            </div>
            
        </div>
    )
}


export default Home;