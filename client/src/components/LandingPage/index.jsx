
import "./LandingPage.css";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import {
    getAllProducts,
    getAllCategories,
} from "../../redux/actions";

function LandingPage() {

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getAllCategories());
    }, [dispatch]);

    return (
        <div>
            <p>Landing page</p>
            <Link to={"/store"}><button>Go to Store</button></Link>
        </div>

    )
}


export default LandingPage;