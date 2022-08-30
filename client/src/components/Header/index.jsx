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
import {useAuth} from "../context/authContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

import { Link } from "react-router-dom";

function Header() {
    const [wanted, setWanted] = useState("")
    const admin = localStorage.getItem("admin")
    const handlerSearch = (e) =>{
        e.preventDefault(e)
        setWanted(e.target.value)
        console.log(wanted)
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
                <Link className="nav-link text-light" to="/login">Login</Link>
                <Link className="nav-link text-light" to="/signup">SignUp</Link>
                <Link className="nav-link text-light" to="/cart"><FontAwesomeIcon icon={faCartShopping}/><div id='counter' className="cartNumber">{JSON.parse(localStorage.getItem('cart')).length}</div></Link>
                {localStorage.getItem('admin') === 'true' ? <Link className="nav-link text-light `${}`" to="/adminpanel">Admin Panel</Link> : null}

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