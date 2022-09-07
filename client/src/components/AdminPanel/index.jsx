import "./AdminPanel.css";
import AdminNavBar from "../AdminNavBar";

import { Outlet } from "react-router-dom";

function AdminPanel() {


    return (
      
        <div className="container-fluid adminPanelContainer">
            
            <div className="row">
                <div className="col-lg-2">
                    <AdminNavBar />
                </div>
                <div className="col-lg-10 adminContentContainer ">

                    <Outlet />
                </div>
            </div>
        </div>
    )
}


export default AdminPanel;