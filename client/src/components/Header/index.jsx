import "./Header.css";
import React,{
    useState,
} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";

function Header() {
    const [wanted, setWanted] = useState("")
    const auth = useAuth();
    const admin = localStorage.getItem("admin")
    const handlerSearch = (e) =>{
        e.preventDefault(e)
        setWanted(e.target.value)
        console.log(wanted)
    }
    const nightMode = () =>{
        if(localStorage.getItem("bg") === "bg-dark text-light"){
            localStorage.setItem("bg","bg-light text-dark")
        }else{
        localStorage.setItem("bg","bg-dark text-light")
        }
    }
    return (
        <Navbar bg="dark" expand="lg" className="shadow-lg p-3">
        <Container fluid>
            <Link to={"/"} className="navbar-brand text-light">HENRY PF</Link>
            <Navbar.Toggle aria-controls="navbarScroll"/>
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
                <Link className="nav-link text-light" to="/cart">Cart</Link>
                {admin==="true" && <Link className="nav-link text-light `${}`" to="/adminpanel">Admin Panel</Link>}
                <Link className="nav-link text-light" to="#!"
                onClick={()=>{
                    nightMode()
                }}
                >NightMode</Link>
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
export default Header;