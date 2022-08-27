import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getCustomerHistory } from "../../redux/actions";
import "./AdminCustomerHistory.css";


function AdminCustomerHistory() {

    const { idCustomer } = useParams();
    const customerHistory = useSelector(state => state.customerHistory);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCustomerHistory(idCustomer));
    }, [dispatch, idCustomer]);

    return (
        <div>
            {customerHistory.length > 0 && 
                <div>
                    <h5>Orders History from: {customerHistory[0].receipt_email}</h5>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Id</th>
                            <th scope="col">User</th>
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
                                                to={`/adminpanel/order-details/${order.id}`}
                                                className="linkTo"
                                            >{order.id}</Link>
                                        </th>
                                        <td>{order.receipt_email}</td>
                                        <td>{order.metadata.orderStatus}</td>
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


export default AdminCustomerHistory;