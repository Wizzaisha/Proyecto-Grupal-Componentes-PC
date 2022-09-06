
import "./LandingPage.css";


import { Link } from "react-router-dom";






function LandingPage() {



    return (
        <div>
            <h1>HENRY HARDWARE</h1>
            <p>Welcome to Henry Hardware, find here in our categories the parts that you need in order to build a powerfull PC.</p>
            <Link to={"/store"}><button>Go to Store</button></Link>
        </div>

    )
}


export default LandingPage;