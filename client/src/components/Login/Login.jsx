import "./Login.css";
import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Header from "../Header";
import { useAuth } from "../context/authContext";
function Login() {
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const auth = useAuth()
    const [checkOut, setCheckOut] = useState("password")
    const handlerCheckOut = (e) => {
        if (checkOut === "password") {
            setCheckOut("text")
        } else {
            setCheckOut("password")
        }
    }
    const [email, setEmail] = useState("")
    const handlerEmail = (e) => {
        setEmail(e.target.value)
        console.log(email)
        setError("")
    }
    const [password, setPassword] = useState("")
    const handlerPassword = (e) => {
        setPassword(e.target.value)
        console.log(password)
        setError("")
    }
    const handlerSubmit = async (e) =>{
        e.preventDefault()
        setError("")
        try {
            await auth.login(email,password)
            navigate("/")
        } catch (error) {
            if(error.code === "auth/wrong-password"){
                setError("Wrong password :(")
            }else if (error.code === "auth/user-not-found"){
                setError("User not found :(")
            }else if (error.code === "auth/too-many-requests"){
                setError("Access to this account has been temporarily")
            }
        }
    }
    const handlerLogout = async (e) =>{
        e.preventDefault()
        await auth.logout()
    }
    return (
        <>
            <Header />
            <div className="containerForm justify-content-around">
                <div className="d-flex flex-column">
                    {   error
                        ?<h1 className="display-6 shadow-lg p-3 mb-5 bg-body rounded">{error}</h1>
                        :<h1 className="display-6 shadow-lg p-3 mb-5 bg-body rounded">Welcome user</h1>
                    }
                    {
                        auth.user !==null &&
                        <Button  className="display-6 shadow-lg p-3 mb-5 rounded "animation="glow" variant="warning" type="Button"
                        onClick={(e)=>{
                            handlerLogout(e)
                        }}
                        >
                            Log out
                        </Button>
                    }
                </div>
                <Form className={auth.user !==null ? "d-none" :"form"}
                    onSubmit={(e) => {
                        handlerSubmit(e)
                    }}
                >
                    <Form.Group className="mb-3 shadow-lg p-3 bg-body rounded" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"
                            onChange={(e) => {
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
                            onChange={(e) => {
                                handlerPassword(e)
                            }}
                            autoComplete="on"
                        />
                        <Form.Text className="text-muted">
                            Only eight alphanumeric characters
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3 shadow-lg p-3 bg-body rounded" controlId="formBasicCheckbox">
                        <Form.Check onClick={(e) => {
                            handlerCheckOut(e)
                        }} type="checkbox" label="Check me out" />
                    </Form.Group>
                    {
                        password.length < 6 || password.length > 16
                            ?
                            <Button variant="warning" type="submit" disabled>
                                Log in
                            </Button>
                            :
                            <Button variant="primary" type="submit">
                                Log in
                            </Button>
                    }
                </Form>
            </div>
        </>
    )
}


export default Login;