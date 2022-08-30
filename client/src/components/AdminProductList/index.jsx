import "./AdminProductList.css";

import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../redux/actions";
import DataNotFound from "../DataNotFound";

function AdminProductList() {

    const allProducts2 = useSelector(state => state.products);

    const dispatch = useDispatch();

    function handleEditButton (productId) {
        console.log(productId);
        console.log("Edit");
    }

    function handleDeleteButton (productId) {
        dispatch(deleteProduct(productId));
    }
    
    return (
        <div className="container-fluid">
            <div>
                <button className="btn btn-outline-primary">Create product</button>
            </div>

            {allProducts2.message 
                ?   <DataNotFound />  
                :    <div className="tableResponsive">
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
                                    {allProducts2 && allProducts2.map(product => {
                                        return (
                                            <tr key={product.id}>
                                                <th scope="row">{product.id}</th>
                                                <td><img src={product.image} alt="img" className="imgList"></img></td>
                                                <td>{product.brand} {product.model}</td>
                                                <td>{product.stock}</td>
                                                <td>
                                                    <button 
                                                        className="btn btn-outline-secondary"
                                                        onClick={() => handleEditButton(product.id)}
                                                    >Edit</button></td>
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
                    </div>
            }
        </div>
    )
}


export default AdminProductList;