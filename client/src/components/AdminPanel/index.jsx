import "./AdminPanel.css";
import AdminNavBar from "../AdminNavBar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getOrdersList } from "../../redux/actions";

function AdminPanel() {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getOrdersList());

    }, [dispatch]);

    return (
        <div className="container-fluid adminPanelContainer">
            <div className="row">
                <div className="col-lg-2">
                    <AdminNavBar />
                </div>
                <div className="col-lg-10 adminContentContainer ">
                    <p>Admin panel</p>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}


export default AdminPanel;