import "./FailedPayment.css";
import { Link } from 'react-router-dom'

function FailedPayment() {


    return (
        <div className="container-fluid">
            <div className="failedContainer">
                <h2>Payment Failed, please check your payment method and try again</h2>
                <Link to='/cart'>
                    <button className="btn btn-danger">Back to cart</button>
                </Link>
            </div>
        </div>
    )
}



export default FailedPayment;