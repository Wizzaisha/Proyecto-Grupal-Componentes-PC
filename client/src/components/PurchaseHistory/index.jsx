
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./PurchaseHistory.css";
import { useMemo, useState, useEffect } from "react";
import Pagination from "../Pagination";
import { getCustomerHistory } from "../../redux/actions";
import { useAuth } from '../context/authContext';
import LoadingPage from "../LoadingPage";

let pageSize = 8;

function PurchaseHistory () {

    const customerHistory = useSelector(state => state.customerHistory);

    const [currentPage, setCurrentPage] = useState(1);
    const [loadingData, setLoadingData] = useState(false);

    const dispatch = useDispatch();

    const auth = useAuth();

    const currentHistoryUser = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;

        return !customerHistory.message && customerHistory.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, customerHistory]);


    useEffect(() => {
        setLoadingData(true);
        if (auth.user.email) {
            dispatch(getCustomerHistory(auth.user.email))
            .then(() => setLoadingData(false));
        }
    }, [dispatch, auth.user.email]);

    return (

        loadingData 
            ?   <LoadingPage /> 
            : 
                <div className="customerHistoryContainer">
                    
                    {customerHistory.length > 0 && !customerHistory.message &&
                        <div>
                            <h5>Orders History of: {customerHistory[0].receipt_email}</h5>
                            <div className="tableResponsive">
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
                                        {currentHistoryUser && currentHistoryUser.map(order => {
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
                                <div>
                                    <Pagination
                                        currentPage={currentPage}
                                        totalCount={customerHistory.length}
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


export default PurchaseHistory;