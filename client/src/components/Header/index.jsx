
import "./Header.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch } from 'react-redux'
import {useAuth} from "../context/authContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { searchProducts } from '../../redux/actions'

function Header() {
    const dispatch = useDispatch()
    const auth = useAuth();
    const handlerSearch = (e) => {
        e.preventDefault(e)
        dispatch(searchProducts(e.target.value))
    }
    return (
        <Navbar bg="dark" expand="lg" className="shadow-lg p-3">
            <Container fluid>
                <Link to={"/"} className="navbar-brand text-light">HENRY PF</Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{
                            maxHeight: '100px',
                        }}
                        navbarScroll
                    >
                        <Link className="nav-link text-light" to="/store">Store</Link>
                        <Link className="nav-link text-light" to="/contact">Contact</Link>
                        {auth.user !==null
                        ?<Link className="nav-link text-primary" to="/login">LogOut</Link>
                        :<Link className="nav-link text-light" to="/login">Login</Link>}
                        {auth.user===null &&
                        <Link className="nav-link text-light" to="/signup">SignUp</Link>}
                        {localStorage.getItem("cart") && <Link className="nav-link text-light" to="/cart"><FontAwesomeIcon icon={faCartShopping}/><div id='counter' className="cartNumber">{JSON.parse(localStorage.getItem('cart')).length}</div></Link>}
                        {localStorage.getItem('admin') === 'true' ? <Link className="nav-link text-light `${}`" to="/adminpanel">Admin Panel</Link> : null}
                    </Nav>
                    <Form className="d-flex"
                        onChange={(e) => {
                            handlerSearch(e)
                        }}>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default Header;