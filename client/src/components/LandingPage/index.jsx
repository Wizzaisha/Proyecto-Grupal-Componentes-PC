
import "./LandingPage.css";


import { Link } from "react-router-dom";






function LandingPage() {



    return (
        <div className="p-5 mb-4 bg-light rounded-3 landPageContainer">
            <div className="container-fluid py-5 landingInfo">
                <h1 className="display-5 fw-bold">HENRY HARDWARE</h1>
                <p className="col-m8 fs-4">Welcome to Henry Hardware, find here in our categories the parts that you need in order to build a powerfull PC.</p>
                <Link to={"/store"}><button className="btn btn-dark bg3 btn-lg">Go to Store</button></Link>
            </div>
        </div>

    )
}


export default LandingPage;