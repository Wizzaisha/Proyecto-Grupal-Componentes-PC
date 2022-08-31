import { useSelector } from "react-redux";
import "./AdminStatistics.css";


function AdminStatistics () {
    
    const orders = useSelector(state => state.orderList);

    return (
        <div>
            <p>Statistics</p>
        </div>
    )
}


export default AdminStatistics;