
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import "./PurchaseHistory.css";
import { getCustomerHistory } from "../../redux/actions";

function PurchaseHistory () {

    const { email } = useParams();

    const dispatch = useDispatch();
    const customerHistory = useSelector(state => state.customerHistory);

    useEffect(() => {
        dispatch(getCustomerHistory(email));
    }, [dispatch, email]);

    return (
        <div>
            <p>History</p>
            {customerHistory.length > 0 && 
                <div>
                    <h5>Orders History of: {customerHistory[0].receipt_email}</h5>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Receipt ID</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Status</th>
                            <th scope="col">Created</th> 
                            </tr>
                        </thead>
                        <tbody>
                            {customerHistory && customerHistory.map(order => {
                                return (
                                    <tr key={order.id}>
                                        <th scope="row">
                                            <Link 
                                                to={`/profile/purchase-history/order-details/${order.id}`}
                                                className="linkTo"
                                            >{order.id.slice(18, order.id.length)}</Link>
                                        </th>
                                        <td>$ {order.amount}</td>
                                        <td>{order.orderStatus}</td>
                                        <td>{order.created}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}


export default PurchaseHistory;