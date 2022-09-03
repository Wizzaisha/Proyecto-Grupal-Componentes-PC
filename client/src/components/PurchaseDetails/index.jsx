import { useParams } from "react-router-dom";
import "./PurchaseDetails.css";


function PurchaseDetails () {


    const { orderId } = useParams();

    const id = `pi_3LdbNeBbFJpttBp${orderId}`

    console.log(id);

    return (
        <div>
            <p>Details</p>
        </div>
    )
}



export default PurchaseDetails;