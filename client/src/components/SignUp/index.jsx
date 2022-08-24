import "./Register.css";
import React,{useState} from "react";
import {useNavigate} from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Header from "../Header";
import { useAuth } from "../context/authContext";
import { async } from "@firebase/util";

function SignUp() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState()
    const [checkOut, setCheckOut] = useState("password")
    const handlerCheckOut = (e) =>{
        if(checkOut === "password"){
            setCheckOut("text")
        }else{
            setCheckOut("password")
        }
    }
    const [user , setUser] = useState("")
    const handlerUser = (e) =>{
        setUser(e.target.value)
        console.log(user)
    }
    const [email , setEmail] = useState("")
    const handlerEmail = (e) =>{
        setEmail(e.target.value)
        console.log(email)
    }
    const [password, setPassword] = useState("")
    const handlerPassword = (e) =>{
        setPassword(e.target.value)
        console.log(password)
    }
    const handlerSubmit = async (e) =>{
        e.preventDefault()
        try {
            await auth.register(email,password)
            navigate("/")
        } catch (error) {
            setError(error)
        }
    }
    return (
        <>
        <Header/>
        <div className="containerForm justify-content-around">
            {   error
                ?<h1 className="display-6 shadow-lg p-3 mb-5 bg-body rounded">Error : {error}</h1>
                :<h1 className="display-6 shadow-lg p-3 mb-5 bg-body rounded">Welcome, create an account to continue</h1>
            }
            <Form
                onSubmit={(e)=>{
                    handlerSubmit(e)
                }}
            >
            <Form.Group className="mb-3 shadow-lg p-3 bg-body rounded" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username"
                onChange={(e)=>{
                    handlerUser(e)
                }}
                />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3 shadow-lg p-3 bg-body rounded" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email"
                onChange={(e)=>{
                    handlerEmail(e)
                }}
                />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3 shadow-lg p-3 bg-body rounded" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type={checkOut} placeholder="Password"
                    onChange={(e)=>{
                        handlerPassword(e)
                    }}
                    autoComplete="on"
                />
                <Form.Text className="text-muted">
                the password must be greater than eight characters
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3 shadow-lg p-3 bg-body rounded" controlId="formBasicCheckbox">
                <Form.Check onClick={(e)=>{
                    handlerCheckOut(e)
                }} type="checkbox" label="Check me out" />
            </Form.Group>
            {
                password.length < 6 || password.length > 16
                ?
                <Button variant="warning" type="submit" disabled>
                    Register
                </Button>
                :
                <Button variant="primary" type="submit">
                    Register
                </Button>
            }
            </Form>
        </div>
        </>
    )
}

export default SignUp;