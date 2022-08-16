
import "./Home.css";

import { Outlet } from "react-router-dom";

import Header from "../Header";
import Footer from "../Footer";


function Home () {


    return (
        <div className="homeContainer">
            <Header />
            <div className="contentContainer">
                <Outlet />
            </div>
            <Footer />
            
        </div>
    )
}


export default Home;