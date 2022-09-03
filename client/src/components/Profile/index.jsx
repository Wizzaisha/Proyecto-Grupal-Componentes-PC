import "./Profile.css";

import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from '../context/authContext';
import { getCustomerHistory } from "../../redux/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";



function Profile() {

    let productState = useSelector(state => state.products);
    let allProducts = productState.filter(e => e.isDeleted === false)

    const [favorite, setFavorite] = useState([])
    const auth = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleHistoryClick() {
        navigate(`/profile/purchase-history/`);
    }

    const handleFavoriteClick = async () => {
        console.log("Omg a favoritos");
        setFavorite(await auth.getFavorite())
        console.log(favorite);
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
                {/* {favorite && favorite.map((e) => {
                    let filter = allProducts.filter(f => f.id === e)
                    return filter.map((p) => {
                        return <div>{p}</div>
                    })
                })} */}
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}


export default Profile;