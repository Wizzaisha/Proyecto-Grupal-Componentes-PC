import "./Header.css";
import React,{
    useState
} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
    const [wanted, setWanted] = useState("")
    const [admin, setAdmin] = useState(false)
    const handlerSearch = (e) =>{
        e.preventDefault(e)
        setWanted(e.target.value)
        console.log(wanted)
    }
    return (
        <Navbar bg="dark" expand="lg">
        <Container fluid>
            <Navbar.Brand href="/" className="text-light">HENRY PF</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll"/>
            <Navbar.Collapse id="navbarScroll">
            <Nav
                className="me-auto my-2 my-lg-0"
                style={{
                    maxHeight: '100px',
                }}
                navbarScroll
            >
                <Nav.Link className="text-light" href="/home">Home</Nav.Link>
                <Nav.Link className="text-light" href="/contact">Contact</Nav.Link>
                <Nav.Link className="text-light" href="/login">Login</Nav.Link>
                <Nav.Link className="text-light" href="/singup">SingUp</Nav.Link>
                <Nav.Link className="text-light" href="/cart">Cart</Nav.Link>
                {admin?<Nav.Link className="text-light" href="/adminpanel">Admin Panel</Nav.Link> : <div></div>}
            </Nav>
            <Form className="d-flex"
                onChange={(e)=>{
                    handlerSearch(e)
                }}>
                <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
            </Form>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}
/*         <div className="headerContainer">
            <Link to={"/"}><p>Name page</p></Link>
            <ul>
                <Link to={"/store"}>Store</Link>
                <Link to={"/contact"}>Contact</Link>
                <Link to={"/adminpanel"}>Admin Panel</Link>
                <Link to={"/login"}>Login</Link>
                <Link to={"/signup"}>SignUp</Link>
                <Link to={"/cart"}>Shop Cart</Link>
            </ul>
        </div> */
export default Header;