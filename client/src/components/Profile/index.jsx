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

    function handleHistoryClick() {
        navigate(`/profile/purchase-history/`);
    }

    function handleFavoriteClick() {
        console.log("Omg a favoritos");
    }
    
    useEffect(() => {
        dispatch(getCustomerHistory(auth.user.email));
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
                <button type="button" className="btn btn-primary" onClick={handleHistoryClick}>Purchase history</button>
                <button type="button" className="btn btn-primary" onClick={handleFavoriteClick}>Favorites</button>
            </div>

            <div>
                <Outlet />
            </div>
        </div>
    )
}


export default Profile;