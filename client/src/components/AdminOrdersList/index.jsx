import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./AdminOrdersList.css";
import { useDispatch } from "react-redux";
import { filterByStatus } from "../../redux/actions";
import DataNotFound from "../DataNotFound";
import { useMemo, useState, useEffect } from "react";
import Pagination from "../Pagination/";

import {
    getOrdersList,
} from "../../redux/actions";
import LoadingPage from "../LoadingPage";

let pageSize = 10;

function AdminOrdersList () {

    const allOrders = useSelector(state => state.orderList);
    
    const dispatch = useDispatch();

    const [loadingData, setLoadingData] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);

    const currentOrders = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;

        return !allOrders.message && allOrders.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, allOrders]);


    function handleChangeStatus (event) {
        const { value } = event.target;

        if (value !== "default") {
            dispatch(filterByStatus(value));
        }
    } 

    useEffect(() => {
        setLoadingData(true);
        dispatch(getOrdersList())
        .then(() => setLoadingData(false));
    }, [dispatch]);
    
    return (

        loadingData 
        
            ?   <LoadingPage /> 
            :
                <div className="container-fluid">
                    <h5>All orders</h5>
                    <div>
                        <select onChange={handleChangeStatus}>
                            <option value={"default"}>Filter by status</option>
                            <option value={"ALL"}>ALL</option>
                            <option value={"CREATED"}>CREATED</option>
                            <option value={"PROCESSING"}>PROCESSING</option>
                            <option value={"CANCELED"}>CANCELED</option>
                            <option value={"COMPLETED"}>COMPLETED</option>
                        </select>
                    </div>
                    {allOrders.length === 0 
                        ?   <DataNotFound /> 
                        :    <div className="tableResponsive">
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
                                        {currentOrders && currentOrders.map(order => {
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
                                <div>
                                    <Pagination
                                        currentPage={currentPage}
                                        totalCount={allOrders.length}
                                        pageSize={pageSize}
                                        onPageChange={page => setCurrentPage(page)}
                                    />
                                </div>
                            </div>
                    }
                </div>
    )
}

export default AdminOrdersList;