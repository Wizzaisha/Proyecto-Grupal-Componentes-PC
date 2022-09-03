import "./Profile.css";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from '../context/authContext';

function Profile () {

    const auth = useAuth();



    return (
        <div>

            <p>Profile</p>
            <ul className="list-group">
                <Link className="list-group-item" to={`/profile/purchase-history/${auth.user.email}`}>Purchase history</Link>
            </ul>
            <div>
                <Outlet />
            </div>    
            
        </div>
    )
}


export default Profile;