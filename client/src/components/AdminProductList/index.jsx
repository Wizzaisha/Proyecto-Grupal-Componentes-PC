import "./AdminProductList.css";
import {  Link, useNavigate   } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { adminFilterCategory, clearAdminFilter, deleteProduct, setAdminCategory, getProductDetails } from "../../redux/actions";
import DataNotFound from "../DataNotFound";
import { useState, useMemo } from "react";
import Pagination from "../Pagination";


let pageSize = 10;

function AdminProductList() {

    const allProducts2 = useSelector(state => state.productsAdmin);
    const categories = useSelector(state => state.allCategories)
    const admCurrCategory = useSelector(state => state.admCurrCategory);
    var navigate = useNavigate ();


    const dispatch = useDispatch();

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);

    const currentProductsAdmin = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;

        return !allProducts2.message && allProducts2.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, allProducts2]);

    const [productDeleted, setProductDeleted] = useState({});
    
    function  handleEditButton (idProduct)
    {
        dispatch(getProductDetails(idProduct))
        .then(() => navigate(`update-product/${idProduct}`))
    }
    function handleCategorySelect (event) {
        const { value } = event.target;

        dispatch(setAdminCategory(value));
        dispatch(adminFilterCategory(""));

    }

    function handleClearAdminFilter () {
        dispatch(clearAdminFilter());
    }


    function handleDeleteButton (productId) {
        dispatch(deleteProduct(productId))
        .then(response => setProductDeleted(response));
    }
    
    return (
        <div className="container-fluid">

            <h3>Product List</h3>

            <div className="buttonsProductList">
            <Link to="/adminpanel/create-product">
                <button className="btn btn-outline-primary">Create product</button>
             </Link>
                <button
                        className="btn btn-outline-warning"
                        onClick={handleClearAdminFilter}
                    >Clear filter
                </button>

            </div>

            {allProducts2.message 
                ?   <DataNotFound />  
                : <div>
                    <div>
                        <div className="btn-group adminFilterContainer">
                            {categories && categories.map((category, index) => {
                                return (
                                    <div key={index}>
                                        <label 
                                            className={`adminFilterButton btn btn-outline-secondary ${admCurrCategory === category ? "checked" : "nochecked"} `}
                                        >
                                            <input
                                                type={"radio"} 
                                                className="btn-check"
                                                autoComplete="off"
                                                value={category}
                                                onChange={handleCategorySelect}
                                                checked={admCurrCategory === category ? true : false}
                                            /> 
                                            {category}
                                        </label>

                                    </div>

                                )
                            })}
                        </div>    
                    </div>

                    <div className="tableResponsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Stock</th>
                                    <th scope="col">Edit</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {currentProductsAdmin && currentProductsAdmin.map(product => {
                                        return (
                                            <tr key={product.id}>
                                                <th scope="row">{product.id}</th>
                                                <td><img src={product.image} alt="img" className="imgList"></img></td>
                                                <td>{product.brand} {product.model}</td>
                                                <td>
                                                    <p style={{color: product.stock < 5 ? "red" : ""}}>{product.stock}</p>
                                                    {product.stock < 5 ? <p style={{color: "red"}}>Low stock</p> : null}
                                                </td>

                                                <td> <div>
                                                 <button className="btn btn-outline-secondary"
                                                 onClick={() => handleEditButton(product.id)}>Edit</button>
                                                </div> </td>

                                                <td>
                                                    <button 
                                                        className={`btn ${!product.isDeleted ? "btn-outline-danger" : "btn-outline-info"}`}
                                                        onClick={() => handleDeleteButton(product.id)}
                                                    >{!product.isDeleted ? "Delete" : "Restore"}</button></td>
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </table>
                        <div>
                            <Pagination 
                                currentPage={currentPage}
                                totalCount={allProducts2.length}
                                pageSize={pageSize}
                                onPageChange={page => setCurrentPage(page)}
                            />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}


export default AdminProductList;