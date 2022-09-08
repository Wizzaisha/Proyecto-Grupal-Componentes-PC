import "./Profile.css";

import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from '../context/authContext';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import trash from '../img/icons8-eliminar-papelera-96.png'

function Profile() {

    let productState = useSelector(state => state.productsCopy);

    // const [favorite, setFavorite] = useState([])
    const [viewFavorite, setViewFavorite] = useState(false)
    const [product, setProduct] = useState([])
    const auth = useAuth();
    const navigate = useNavigate();


    function handleClick(value) {
        setViewFavorite(false)
        if (value === "history") {
            navigate(`/profile/purchase-history/`);
        } else if (value === "products") {
            navigate(`/profile/my-products`);
        }
    }

    const handleFavoriteClick = () => {
        setViewFavorite(true)
        if (auth.favorite.length > 0) {
            const filter = auth.favorite.map((i) => {
                const findOneProduct = productState.find(e => e.id === i)
                return findOneProduct
            })
            setProduct(filter)
        }
    }

    useEffect(() => {
        console.log("useEffect de obtener favoritos en profile")
        const getFav = async () => {
            await auth.getFavorite();
        }
        getFav();
    }, [])

    const handleDelete = async (e) => {
        await auth.removeFavorite(e)
        console.log('removio');
    }

    console.log(auth.favorite);
    return (
        <div>
            <h1>Profile</h1>
            <div className="container-fluid profileContainer">
                <div className="profileDiv">
                    <h4 className="start display-8">User ID</h4>
                    <label className="pt-2">{auth.user.uid}</label>
                </div>
                <div className="profileDiv">
                    <h4 className="start display-8">Email</h4>
                    <label className="pt-2">{auth.user.email}</label>
                </div>
                <div className="profileDiv">
                    <h4 className="start display-8">User name</h4>
                    <label className="pt-2">{auth.user.displayName || localStorage.getItem("username")}</label>
                </div>
            </div>

            <div className="btn-group" role="group">
                <button type="button" className="btn btn-primary" onClick={() => handleClick("history")}>Purchase history</button>
                <button type="button" className="btn btn-primary" onClick={() => handleClick("products")}>Products Purchased</button>
                <button type="button" className="btn btn-primary" onClick={() => handleFavoriteClick()}>Favorites</button>
            </div>
            <div className='d-flex flex-column align-items-center pt-4'>
                {
                    viewFavorite && product && product.map((e) => (
                        <div className="card d-flex flex-row justify-content-around align-items-center" style={{ width: '85rem', height: '15rem' }}>
                            <img src={e.image} className="img" alt="img" style={{ height: '13rem' }} />
                            <div>
                                <p>{`${e.category} ${e.brand} ${e.model}`}</p>
                                <p>{`$ ${e.price}`}</p>
                            </div>
                            <button onClick={handleDelete(e.id)} className="btn border border-0 ">
                                <img src={trash} alt="delete from favorites" style={{ height: '4rem' }} />
                            </button>
                        </div>
                    ))}
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}


export default Profile;