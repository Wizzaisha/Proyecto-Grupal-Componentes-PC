
import "./LandingPage.css";


import { Link } from "react-router-dom";






function LandingPage() {



    return (
        <div>
            <h1>Page name</h1>
            <p>Welcome to (name), find here in our categories the parts that you need in order to build a powerfull PC.</p>
            <Link to={"/store"}><button>Go to Store</button></Link>
        </div>

    )
}


export default LandingPage;