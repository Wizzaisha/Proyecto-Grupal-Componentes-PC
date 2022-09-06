import "./FailedPayment.css";
import { Link } from 'react-router-dom'

function FailedPayment() {


    return (
        <div>
            <h1>Payment Failed, please check your data and try again</h1>
            <Link to='/cart'>
                <button>Back to cart</button>
            </Link>
        </div>
    )
}



export default FailedPayment;