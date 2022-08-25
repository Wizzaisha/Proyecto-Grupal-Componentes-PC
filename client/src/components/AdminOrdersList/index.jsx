import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./AdminOrdersList.css";


function AdminOrdersList () {

    const allOrders = useSelector(state => state.orderList);
    
    
    return (
        <div>
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
                    {allOrders && allOrders.map(order => {
                        return (
                            <tr key={order.id}>
                                <th scope="row">
                                    <Link 
                                        to={`/adminpanel/order-details/${order.id}`}
                                        className="linkTo"
                                    >{order.id}</Link>
                                </th>
                                <td>
                                    <Link 
                                        to={`/adminpanel/customer-history/${order.customer}`}
                                        className="linkTo"
                                    >{order.receipt_email}</Link>
                                </td>
                                <td>{order.metadata.orderStatus}</td>
                                <td>{order.created}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default AdminOrdersList;