import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderDetails } from "../../redux/actions";
import "./AdminOrderDetails.css";


function AdminOrderDetails() {

    const { idPayment } = useParams();
    console.log(idPayment)

    const paymentDetail = useSelector(state => state.orderDetails);
    
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getOrderDetails(idPayment));        
    }, [dispatch, idPayment]);

    return (
        <div>
            {paymentDetail.hasOwnProperty("id") && <div className="card cardOrderDetail">
                <div>
                    <h4>Id</h4>
                    <p>{paymentDetail.id}</p>
                </div>
                <div>
                    <h4>Customer info</h4>
                    <p>{paymentDetail.customer}</p>
                    <p>{paymentDetail.receipt_email}</p>
                </div>
                <div>
                    <h4>Created</h4>
                    <p>{paymentDetail.created}</p>
                </div>
                <div>
                    <h4>Payment Method</h4>
                    <p>{paymentDetail.payment_method}</p>
                </div>
                <div>
                    <h4>Metadata</h4>
                    <div>
                        <h6>Order Status</h6>
                        <p>{paymentDetail.metadata.orderStatus}</p>
                    </div>
                    <div>
                        <h6>Products Ordered</h6>
                        {JSON.parse(paymentDetail.metadata.productsOrdered).map(e => {
                            return (
                                <div key={e.id}>
                                    <p>{e.id}</p>
                                    <p>{e.price}</p>
                                    <p>{e.quantity}</p>
                                </div>
                            )
                        })}
                    </div>
                    
                </div>
                <div>
                    <h4>Id</h4>
                    <p>{paymentDetail.id}</p>
                </div>

                
            </div>}
        </div>
    )
}


export default AdminOrderDetails;