import "./Profile.css";

import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from '../context/authContext';
import { getCustomerHistory } from "../../redux/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";



function Profile(){

    const auth = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleClick(value) {
        if (value === "history") {
            navigate(`/profile/purchase-history/`);
        } else if (value === "products") {
            navigate(`/profile/my-products`);
        }

    }

    
    useEffect(() => {
        if (auth.user.email) dispatch(getCustomerHistory(auth.user.email));
    }, [dispatch, auth.user.email]);

    return (
        <div>

            <h1>Profile</h1>
            <div className="container-fluid profileContainer">
                <div className="profileDiv">
                    <h4 className="start display-8">Email</h4>
                    <label className="pt-2">{auth.user.email}</label>
                </div>
                <div className="profileDiv">
                    <h4 className="start display-8">User name</h4>
                    <label className="pt-2">{auth.user.displayName}</label>
                </div>
            </div>

            <div className="btn-group" role="group">
                <button type="button" className="btn btn-primary" onClick={() => handleClick("history")}>Purchase history</button>
                <button type="button" className="btn btn-primary" onClick={() => handleClick("products")}>Products Purchased</button>

            </div>

            <div>
                <Outlet />
            </div>
        </div>
    )
}


export default Profile;