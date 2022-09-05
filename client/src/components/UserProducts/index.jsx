import "./UserProducts.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useAuth } from '../context/authContext';
import StarRating from "../StarRating";
import { createReview } from "../../redux/actions";

function UserProducts() {

    const productsUser = [];

    const auth = useAuth();

    const customerHistory = useSelector(state => state.customerHistory);

    const [show, setShow] = useState(false);
    const [hover, setHover] = useState(0);
    const [currentProduct, setCurrentProduct] = useState({});
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    

    const dispatch = useDispatch();

    customerHistory.forEach(element => {
        element.productsOrdered.forEach(product => {
            if (productsUser.findIndex(e => e.id === product.id) === -1) productsUser.push(product);
        });
    });


    function handleShow (productId) {
        setShow(true);
        setCurrentProduct(productsUser.find(e => e.id === productId));
    }
    
    function handleTextReview (event) {
        const { value } = event.target;

        setReviewText(value);
    }

    function handleSubmitReview (event) {

        const data = {
            userReview: reviewText,
            emailUser: auth.user.email,
            userRating: rating
        }

        dispatch(createReview(data, currentProduct.id));

        event.preventDefault();

        setReviewText("");
        setRating(0);

    }

    return (
        <div>
            {productsUser.length > 0 && 
                <div className="tableResponsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Image</th>
                                <th scope="col">My Rating</th>
                                <th scope="col">My Review</th>
                                <th scope="col">Create/Edit Review</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productsUser.map(product => {
                                return (
                                    <tr key={product.id}>
                                        <th scope="row">{product.id}</th>
                                        <td>{product.brand} {product.model}</td>
                                        <td>Rating</td>
                                        <td>Review</td>
                                        <td>
                                            <button 
                                                type="button" 
                                                className="btn btn-warning"
                                                data-bs-toggle="modal"
                                                data-bs-target="#staticBackdrop" 
                                                onClick={() => handleShow(product.id)}
                                            >Review Product</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            }
            
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                Review {currentProduct.brand} {currentProduct.model}
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => {setShow(false); setRating(0)}}></button>
                        </div>
                        <div className="modal-body">
                            <div className="ratingContainer">
                                <p>¿How do you rate this product?</p>
                                <StarRating 
                                    rating={rating}
                                    setRating={setRating}
                                    hover={hover}
                                    setHover={setHover}
                                />
                            </div>
                            <div>
                                <p>Leave a product review</p>
                                <div className="mb-3">
                                    <textarea className="form-control" rows="3" onChange={handleTextReview} value={reviewText}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => {setShow(false); setRating(0)}}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmitReview}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
            
                   
            
                    

        </div>
    )

}


export default UserProducts;