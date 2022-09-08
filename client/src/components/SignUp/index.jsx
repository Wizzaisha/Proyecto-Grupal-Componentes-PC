import "./Register.css";
import React,{useState} from "react";
import {useNavigate, Link} from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from "../context/authContext";

function SignUp() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("")
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
        setError("")
        setUser(e.target.value)
    }
    const [email , setEmail] = useState("")
    const handlerEmail = (e) =>{
        setError("")
        setEmail(e.target.value)
    }
    const [password, setPassword] = useState("")
    const handlerPassword = (e) =>{
        setPassword(e.target.value)
    }
    const handlerSubmit = async (e) =>{
        e.preventDefault()
        setError("")
        try {
            if(user && email && password){
                await auth.register(user,email,password)
                navigate("/")
            }else{
                setError("complete the form to create the account")
            }
        } catch (error) {
            if(error.code === "auth/email-already-in-use"){
                setError("email already in use")
            }else if (error === "auth/internal-error"){
                setError("Invalid email")
            }else{
                console.log(error)
            }
        }
    }
    return (
        <>
        <div className="animation container d-flex justify-content-center align-items-center">
            <Form
                onSubmit={(e)=>{
                    handlerSubmit(e)
                }}
            >
            {error &&
                <Form.Group className="mb-3 shadow-lg p-3 bg4 rounded">
                    <Form.Text>
                        <h6 className="text-light">{error}</h6>
                    </Form.Text>
                </Form.Group>}
            <Form.Group className="mb-3 shadow-lg p-3 bg2 rounded" controlId="formBasicEmail">
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
            <Form.Group className="mb-3 shadow-lg p-3 bg2 rounded" controlId="formBasicEmail2">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username"
                onChange={(e)=>{
                    handlerUser(e)
                }}
                />
                <Form.Text className="text-muted">
                Enter a username for your account
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3 shadow-lg p-3 bg2 rounded" controlId="formBasicPassword">
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
            <Form.Group className="mb-3 shadow-lg p-3 bg2 rounded" controlId="formBasicCheckbox">
                <Form.Check onClick={(e)=>{
                    handlerCheckOut(e)
                }} type="checkbox" label="Check me out" />
            </Form.Group>
            <Form.Group className="mb-3 shadow-lg p-3 bg2 rounded">
            <div className="d-flex flex-column">
                    <div className="d-flex justify-content-around">
                    <Button type="button" className="bg4 border border-0 btn btn btn-dark">
                    <Link to={"/login"} className="bg4 border border-0 btn btn btn-dark"
                        style={{
                            textDecoration: 'none'
                        }}
                    >Log in</Link>
                    </Button>
                    <Button type="button" className="bg4 border border-0 btn btn btn-dark">
                        <Link className="bg4 border border-0 btn btn btn-dark" to={"/login"}
                        style={{
                            textDecoration: 'none'
                        }}>
                        Google
                        </Link>
                    </Button>
                    </div>
                <Form.Text className="text-muted">
                    do you already have an account? login here!
                </Form.Text>
                </div>
            </Form.Group>
            {
                password.length < 6 || password.length > 16
                ?
                <Button className="bg4 border border-0 btn btn btn-dark" type="submit" disabled>
                    Register
                </Button>
                :
                <Button className="bg4 border border-0 btn btn btn-dark" type="submit">
                    Register
                </Button>
            }
            </Form>
        </div>
        </>
    )
}

export default SignUp;