import { Link } from "react-router-dom";
import "./AdminNavBar.css";

function AdminNavBar() {


    return (
        <div>
            <p>Product Management</p>
            <ul className="list-group">
                <Link to="/adminpanel/list-product" className="listLink"><li className="list-group-item">Product list</li></Link>
                <Link to="/adminpanel/create-product" className="listLink"><li className="list-group-item">Create Product</li></Link>
            </ul>
            <p>Product statistics</p>
            <ul className="list-group">
                <Link to="/adminpanel/admin-statistics" className="listLink"><li className="list-group-item">Product sales</li></Link>
            </ul>
            <p>Order Management</p>
            <ul className="list-group">
                <Link to="/adminpanel/order-list" className="listLink"><li className="list-group-item">Order List</li></Link>
            </ul>
        </div>
    )
}

export default AdminNavBar;