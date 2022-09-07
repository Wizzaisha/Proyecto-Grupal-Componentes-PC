import { Link } from "react-router-dom";
import "./AdminNavBar.css";

function AdminNavBar() {


    return (
        <div>
            <h6 className = "text-primary"   >Product Management</h6 >
            <ul className= "list-group">
                <Link to="/adminpanel/list-product" className="listLink"><li className="list-group-item">Product list</li></Link>
 
            </ul>
            <h6 className = "text-primary" >Product statistics</h6>
            <ul className="list-group">
                <Link to="/adminpanel/admin-statistics" className="listLink"><li className="list-group-item">Product sales</li></Link>
            </ul>
            <h6 className = "text-primary" >Order Management</h6>
            <ul className="list-group">
                <Link to="/adminpanel/order-list" className="listLink"><li className="list-group-item">Order List</li></Link>
            </ul>
        </div>
    )
}

export default AdminNavBar;