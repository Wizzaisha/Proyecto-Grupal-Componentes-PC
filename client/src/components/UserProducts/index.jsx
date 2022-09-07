import "./UserProducts.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { useAuth } from '../context/authContext';
import StarRating from "../StarRating";
import { createReview, getAllProducts, getUserProdutcs, updateReview } from "../../redux/actions";
import LoadingPage from "../LoadingPage";
import Pagination from "../Pagination";


let pageSize = 7;

function UserProducts() {


    const auth = useAuth();
    const username = localStorage.getItem("username");

    const productsUser = useSelector(state => state.userProducts); 

    const [show, setShow] = useState(false);

    const [edit, setEdit] = useState(false);
    const [create, setCreate] = useState(false);

    const [hover, setHover] = useState(0);
    const [currentProductId, setCurrentProductId] = useState("");
    const [currentReviewId, setCurrentReviewId] = useState("");

    const [loadingData, setLoadingData] = useState(false);
 
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    
    const dispatch = useDispatch();


    const [currentPage, setCurrentPage] = useState(1);


    const currentProductsUser = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;

        return !productsUser.message && productsUser.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, productsUser]);


    function handleShow (productId, reviewId) {
        setShow(true);
        setCurrentProductId(productId);
        setCurrentReviewId(reviewId);
    }
    
    function handleTextReview (event) {
        const { value } = event.target;

        setReviewText(value);
    }

    function handleSubmitReview () {

        const data = {
            userReview: reviewText,
            emailUser: auth.user.email,
            userRating: rating,
            userName: auth.user.displayName || username,
            reviewId: currentReviewId
        }
        
        dispatch(createReview(data, currentProductId))
        .then(() => dispatch(getAllProducts()));


        dispatch(getUserProdutcs(auth.user.email));

        setReviewText("");
        setRating(0);
        setCreate(false);
        setHover(0);
    }

    function handleEditReview () {
        
        const data = {
            newReview: reviewText,
            emailUser: auth.user.email,
            newRating: rating,
            productId: currentProductId
        }

        dispatch(updateReview(data, currentReviewId))
        .then(() => dispatch(getAllProducts()));

        dispatch(getUserProdutcs(auth.user.email));

        setRating(0);
        setReviewText("");
        setEdit(false);
        setHover(0);
    }

    useEffect(() => {
        console.log("useEffect de userproducts")
        setLoadingData(true);

        dispatch(getUserProdutcs(auth.user.email))
        .then(() => setLoadingData(false));
    }, [dispatch, auth.user.email]);


    return (
        <div>
            {
                loadingData 
                ? 
                    <LoadingPage />
                :
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
                                            {currentProductsUser.map(product => {
                                                return (
                                                    <tr key={product.id}>
                                                        <th scope="row">{product.id}</th>
                                                        <td>{product.brand} {product.model}</td>
                                                        {product.userRating === 0 ? <td>No rating</td> : <td>{product.userRating}</td>}
                                                        {product.userReview.length === 0 ? <td>No review</td> : <td>{product.userReview}</td>}
                                                        <td>
                                                            { product.userRating === 0 && product.userReview.length === 0 
                                                                ? 
                                                                    <button 
                                                                        type="button" 
                                                                        className="btn btn-warning"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#staticBackdrop" 
                                                                        onClick={() => {
                                                                            handleShow(product.id, product.reviewId); 
                                                                            setCreate(true);
                                                                            setHover(0);
                                                                        }}
                                                                    >Review Product</button>
                                                                :
                                                                    <button 
                                                                        type="button" 
                                                                        className="btn btn-info"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#staticBackdrop" 
                                                                        onClick={() => {
                                                                            handleShow(product.id, product.idReview); 
                                                                            setEdit(true);
                                                                            setHover(product.userRating);
                                                                            setRating(product.userRating);
                                                                            setReviewText(product.userReview);
                                                                        }}
                                                                    >Edit Review</button>
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                    <div>
                                        <Pagination
                                            currentPage={currentPage}
                                            totalCount={productsUser.length}
                                            pageSize={pageSize}
                                            onPageChange={page => setCurrentPage(page)}
                                        />
                                    </div>
                                </div>
                        }
                        
                        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">
                                            Review Product
                                        </h5>
                                        <button 
                                            type="button" 
                                            className="btn-close" 
                                            data-bs-dismiss="modal" 
                                            aria-label="Close" 
                                            onClick={() => {                                    
                                                if (create){
                                                    setShow(false); 
                                                    setRating(0);
                                                    setHover(0);
                                                    setCreate(false);
                                                } else if (edit) {
                                                    setShow(false); 
                                                    setRating(0);
                                                    setHover(0);
                                                    setEdit(false);
                                                }
                                            }}
                                        ></button>
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
                                                <textarea 
                                                    className="form-control" 
                                                    rows="3" 
                                                    onChange={handleTextReview} 
                                                    value={reviewText}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button 
                                            type="button" 
                                            className="btn btn-secondary" 
                                            data-bs-dismiss="modal" 
                                            onClick={() => {
                                                if (create){
                                                    setShow(false); 
                                                    setRating(0);
                                                    setHover(0);
                                                    setCreate(false);
                                                } else if (edit) {
                                                    setShow(false); 
                                                    setRating(0);
                                                    setHover(0);
                                                    setEdit(false);
                                                }
                                            }}
                                        >Close</button>
                                        
                                        <button 
                                            type="button" 
                                            className="btn btn-primary" 
                                            data-bs-dismiss="modal"
                                            disabled={reviewText.length === 0 || rating === 0 ? true : null} 
                                            onClick={() => {
                                                if (create) {
                                                    setShow(false); 
                                                    handleSubmitReview();
                                                } else if (edit) {
                                                    setShow(false); 
                                                    handleEditReview();
                                                }
                                            }}
                                        >Send</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )

}


export default UserProducts;