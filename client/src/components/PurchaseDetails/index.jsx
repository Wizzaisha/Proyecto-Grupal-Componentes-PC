import { useParams } from "react-router-dom";
import "./PurchaseDetails.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


function PurchaseDetails () {


    const { orderId } = useParams();
    const customerHistory = useSelector(state => state.customerHistory);
    let productState = useSelector(state => state.productsCopy);
    let products = productState.filter(e => e.isDeleted === false);

    const findOrder = customerHistory.find(e => e.id === orderId);


    return (
        <div className="container-fluid">
            <h5>Details order: {orderId}</h5>
            {findOrder && 
                <div className="container-fluid orderDetailsContainer">
                    
                    <div className="row firstRow paymentStatus">
                        <div className="col-12 col-sm-6 borderPayment">
                            <h4>Created</h4>
                            <p>{findOrder.created}</p>
                        </div>
                        <div className="col-12 col-sm-6">
                            <h4>Order Status</h4>
                            <p>{findOrder.orderStatus}</p>
                        </div>
                    </div>

                    <div className="row secondRow">

                        <div className="col-12 col-sm-6 customerInfoContainer">
                            <h4>Amount</h4>
                            <div className="customerInfo">
                                <div>
                                    <p>$ {findOrder.amount}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 paymentMethod">
                            <h4>Payment Method</h4>
                            <p>{findOrder.payment_method_details.type} {findOrder.payment_method_details[findOrder.payment_method_details.type].brand}</p>
                        </div>
                    </div>

                    <div className="row thirdRow">

                        <div className="col-12 col-sm-6 productsOrderedInfo">
                            <h4>Products Ordered</h4>
                            <div className="tableResponsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {findOrder.productsOrdered && findOrder.productsOrdered.map(e => {
                                            return (
                                                <tr key={e.id}>
                                                    <th scope="row">
                                                        {products.findIndex(item => item["id"] === e.id) === -1 ? <p>{e.id}</p> : <Link to={`/store/${e.id}`}><p>{e.id}</p></Link>}
                                                    </th>

                                                    <td>
                                                        <img src={e.image} alt="img" className="productImage"></img>
                                                    </td>

                                                    <td>
                                                        <p>Price: </p>
                                                        <p>{e.price}</p>
                                                    </td>

                                                    <td>
                                                        <p>{e.quantity}</p>
                                                    </td>
                                                
                                                    <td>
                                                        <p>{e.brand} {e.model}</p>
                                                    </td>
                                                </tr>
                                            )})
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <div className="col-12 col-sm-6 shippingInf">
                            
                            <h4>Shipping info</h4>
                            
                            <div className="shippingDetails">

                                <div>
                                    <h6>Name: </h6>
                                    <p>{findOrder.shipping.name}</p>
                                </div>

                                <div>
                                    <h6>Phone: </h6>
                                    <p>{findOrder.shipping.phone}</p>
                                </div>
                                    
                                <div>
                                    <h6>Address: </h6>
                                    <p>{findOrder.shipping.address.line1}</p>
                                </div>

                                <div>
                                    <h6>City</h6>
                                    <p>{findOrder.shipping.address.city}</p>
                                </div>

                                <div>
                                    <h6>State</h6>
                                    <p>{findOrder.shipping.address.state}</p>
                                </div>

                                <div>
                                    <h6>Country</h6>
                                    <p>{findOrder.shipping.address.country}</p>
                                </div>
                                <div>
                                    <h6>Postal Code: </h6>
                                    <p>{findOrder.shipping.address.postal_code}</p>
                                </div>
                            </div>
                        
                        </div>
                    </div>



                
                </div>
            }
        </div>
    )
}



export default PurchaseDetails;