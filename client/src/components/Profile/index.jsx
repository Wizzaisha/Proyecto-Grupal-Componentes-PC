import "./Profile.css";

import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from '../context/authContext';
import { getCustomerHistory } from "../../redux/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";



function Profile() {

    let productState = useSelector(state => state.productsCopy);

    const [favorite, setFavorite] = useState([])
    const [product, setProduct] = useState([])
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

    const handleFavoriteClick = async () => {
        setFavorite(await auth.getFavorite())
        const filter = favorite.map((i) => {
            const findOneProduct = productState.find(e => e.id === i)
            return findOneProduct
        })
        setProduct(filter)
    }
    console.log(product)

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
                <button type="button" className="btn btn-primary" onClick={() => handleClick(handleFavoriteClick())}>Favorites</button>

            </div>
            <div>
                {


                    product && product.map((e) => {
                        <div>
                            <h5>{e.model}</h5>
                        </div>
                    })}
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}


export default Profile;