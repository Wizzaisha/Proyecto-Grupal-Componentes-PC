import "./AdminPanel.css";
import AdminNavBar from "../AdminNavBar";
import Header from "../Header";

import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { getOrdersList, getStatisticsData } from "../../redux/actions";
import { useDispatch } from "react-redux";

function AdminPanel() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrdersList());
        dispatch(getStatisticsData());
    }, [dispatch]);

    return (
      
        <div className="container-fluid adminPanelContainer">
            
            <Header />
            
            <div className="row">
                <div className="col-lg-2">
                    <AdminNavBar />
                </div>
                <div className="col-lg-10 adminContentContainer ">
                    <h2>Admin panel</h2>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}


export default AdminPanel;