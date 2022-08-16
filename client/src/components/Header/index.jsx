import "./Header.css";

import { Link } from "react-router-dom";


function Header() {


    return (
        <div className="headerContainer">
            <Link to={"/"}><p>Name page</p></Link>
            <ul>
                <Link to={"/contact"}>Contact</Link>
                <Link to={"/adminpanel"}>Admin Panel</Link>
                <Link to={"/login"}>Login</Link>
                <Link to={"/signup"}>SignUp</Link>
                <Link to={"/cart"}>Shop Cart</Link>
            </ul>
        </div>
    )
}


export default Header;