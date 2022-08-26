
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
            <h1>Page name</h1>
            <p>Welcome to (name), find here in our categories the parts that you need in order to build a powerfull PC.</p>
            <Link to={"/store"}><button>Go to Store</button></Link>
        </div>

    )
}


export default LandingPage;