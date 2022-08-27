import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderDetails, updateOrder } from "../../redux/actions";
import "./AdminOrderDetails.css";


function AdminOrderDetails() {

    const { idPayment } = useParams();

    
    const dispatch = useDispatch();

    const [activateEdit, setActivateEdit] = useState(false);
    const [input, setInput] = useState({
        metadata: ""
    });

    const [paymentDetail, setPaymentDetail] = useState({});

    function handleEditButton () {

        setActivateEdit(!activateEdit);

    }

    function handleSubmitChanges () {

        dispatch(updateOrder(paymentDetail.id,input))
        .then(response => setPaymentDetail(response.payload))
        .catch(error => console.log(error));
        
        setActivateEdit(false);
        setInput({
            metadata: ""
        });
        
    }

    function handleInputChanges (event) {
        const { value } = event.target;
        
        if (value !== "default") {
            setInput({
                metadata: {
                    orderStatus: value
                }
            })
        }

    }

    useEffect(() => {
        dispatch(getOrderDetails(idPayment))
        .then(response => setPaymentDetail(response.payload));

    }, [dispatch, idPayment]);

    return (
        <div>
            <h5>Details order: {paymentDetail.id}</h5>
            {paymentDetail.hasOwnProperty("id") && 
                <div className="container-fluid orderDetailsContainer">
                    
                    <div className="row firstRow paymentStatus">
                        <div className="col-12 col-sm-6 borderPayment">
                            <h4>Last Update</h4>
                            <p>{paymentDetail.created}</p>
                        </div>
                        <div className="col-12 col-sm-6">
                            <h4>Order Status</h4>


                            {activateEdit ? 
                                <select className="form-select" onChange={handleInputChanges}>
                                    <option defaultValue={"default"}>Select new status</option>
                                    <option value="PROCESSING">PROCESSING</option>
                                    <option value="CANCELED">CANCELED</option>
                                    <option value="COMPLETED">COMPLETED</option>
                                </select>
                                :
                                <div>
                                    {paymentDetail.metadata.orderStatus !== undefined && 
                                        <p>{paymentDetail.metadata.orderStatus}</p>
                                    }
                                </div>
                            }
                            
                            <button 
                                className={`btn ${!activateEdit ? "btn-secondary" : "btn-danger"} editButton`}
                                onClick={!activateEdit ? handleEditButton : handleSubmitChanges}
                            >{!activateEdit ? "Edit" : "Submit"}</button>
                        </div>
                    </div>

                    <div className="row secondRow">

                        <div className="col-12 col-sm-6 customerInfoContainer">
                            <h4>Customer info</h4>
                            <div className="customerInfo">
                                <div>
                                    <h6>Id</h6>
                                    <p>{paymentDetail.customer}</p>
                                </div>
                                <div>
                                    <h6>Email</h6>
                                    <p>{paymentDetail.receipt_email}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 paymentMethod">
                            <h4>Payment Method</h4>
                            <p>{paymentDetail.payment_method}</p>
                        </div>
                    </div>

                    <div className="row thirdRow">

                        <div className="col-12 col-sm-6 productsOrderedInfo">
                            <h4>Products Ordered</h4>

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col"></th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paymentDetail.metadata.productsOrdered && paymentDetail.metadata.productsOrdered.map(e => {
                                        return (
                                            <tr key={e.id}>
                                                <th scope="row">
                                                    <p>{e.id}</p>
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
                        
                        <div className="col-12 col-sm-6 shippingInf">
                            
                            <h4>Shipping info</h4>
                            
                            <div className="shippingDetails">

                                <div>
                                    <h6>Name: </h6>
                                    <p>{paymentDetail.shipping.name}</p>
                                </div>

                                <div>
                                    <h6>Phone: </h6>
                                    <p>{paymentDetail.shipping.phone}</p>
                                </div>
                                    
                                <div>
                                    <h6>Tracking Number: </h6>
                                    <p>""</p>
                                </div>
                                    
                                <div>
                                    <h6>Address: </h6>
                                    <p>{paymentDetail.shipping.address.line1}</p>
                                </div>

                                <div>
                                    <h6>City</h6>
                                    <p>{paymentDetail.shipping.address.city}</p>
                                </div>

                                <div>
                                    <h6>State</h6>
                                    <p>{paymentDetail.shipping.address.state}</p>
                                </div>

                                <div>
                                    <h6>Country</h6>
                                    <p>{paymentDetail.shipping.address.country}</p>
                                </div>
                                <div>
                                    <h6>Postal Code: </h6>
                                    <p>{paymentDetail.shipping.address.postal_code}</p>
                                </div>
                            </div>
                        
                        </div>
                    </div>



                
                </div>
            }
        </div>
    )
}


export default AdminOrderDetails;