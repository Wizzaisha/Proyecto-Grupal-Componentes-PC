import "./Login.css";
import "../../scss/custom.scss"
import React, { useState} from "react";
import { useNavigate ,Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from "../context/authContext";
function Login() {
    const [error, setError] = useState("")
    const [reset, setReset] = useState("")
    const navigate = useNavigate()
    const auth = useAuth()
    const username = localStorage.getItem("username")
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
        setError("")
        setReset("")
    }
    const [password, setPassword] = useState("")
    const handlerPassword = (e) => {
        setPassword(e.target.value)
        setError("")
        setReset("")
    }
    const handlerSubmit = async (e) =>{
        e.preventDefault()
        setError("")
        try {
            if (email && password){
                await auth.login(email,password)
                navigate("/")
            }else{
                setError("complete the form")
            }
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
    const resetPassword = async () =>{
        try {
            await auth.resetPassword(email)
            setReset("If you entered a valid email, you will receive a message to reset your password")
        } catch (error) {
            if(error.code === "auth/missing-email"){
                setError("Enter your email")
            }else if (error.code === "auth/user-not-found"){
                setError("User not found :(")
            }
        }
    }
    const handlerLogout = async (e) =>{
        e.preventDefault()
        try {
            await auth.logout();
        } catch (error) {
            console.log(error)
        }
    }
    const handlerGoogle = async () => {
        try {
            await auth.loginWithGoogle()
            navigate("/login")
        } catch (error) {
            console.log(error, "error google")
        }
    }
    return (
        <>
            {auth.user !== null
            ?
            <div className="animation container justify-content-center align-items-center">
            {
                <div className="animation container d-flex justify-content-center align-items-center flex-column">
                    <h1 className="display-6 shadow-lg p-3 mb-5 bg1 rounded">Welcome {auth.user.displayName || username}</h1>
                    <div className="d-flex justify-content-around">
                        <Button  className="btn btn-outline-light display-6 shadow-lg p-3 rounded m-1 bg4"animation="glow" type="Button"
                        onClick={(e)=>{
                            handlerLogout(e)
                        }}
                        >
                            Log out
                        </Button>
                        <Link to="/">
                            <Button className="btn btn-outline-light display-6 shadow-lg p-3 rounded m-1 bg4"animation="" type="Button">
                            go shopping
                            </Button>
                        </Link>
                    </div>
                </div>
            }
            </div>
            :
            <div className="animation container d-flex justify-content-center align-items-center flex-column">
                {reset &&
                <Form.Group className="mb-3 shadow-lg p-3 bg3 rounded">
                    <Form.Text>
                        <h6 className="text-light text-sm">{reset}</h6>
                    </Form.Text>
                </Form.Group>}
            <Form className={"form bg-body rounded"}
                onSubmit={(e) => {
                    handlerSubmit(e)
                }}
            >   {error &&
                <Form.Group className="mb-3 shadow-lg p-3 bg4 rounded">
                    <Form.Text>
                        <h6 className="text-light">{error}</h6>
                    </Form.Text>
                </Form.Group>}
                <Form.Group className="mb-3 shadow-lg p-3 bg2 text-dark rounded" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"
                        onChange={(e) => {
                            handlerEmail(e)
                        }}
                    />
                    <Form.Text className="text-dark">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3 shadow-lg p-3 bg2 text-dark rounded" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type={checkOut} placeholder="Password"
                        onChange={(e) => {
                            handlerPassword(e)
                        }}
                        autoComplete="on"
                    />
                    <Form.Text className="text-dark">
                        Only eight alphanumeric characters
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3 shadow-lg p-3 bg2 text-dark rounded" controlId="formBasicCheckbox">
                    <Form.Check className="text-dark" onClick={(e) => {
                        handlerCheckOut(e)
                    }} type="checkbox" label="Check me out" />
                </Form.Group>
                <Form.Group className="mb-3 shadow-lg p-3 bg2 text-light rounded">
                    <div className="d-flex justify-content-around align-items-center">
                    {
                    password.length < 6 || password.length > 16
                    ?
                    <Button className="bg4 border border-0 btn btn btn-dark shadow-lg rounded" type="submit" disabled>
                        Log in
                    </Button>
                    :
                    <Button className="bg4 border border-0 btn btn btn-dark shadow-lg rounded" type="submit">
                        Log in
                    </Button>
                    }
                    <a href="#!"
                    onClick={()=>{
                        resetPassword()
                    }}
                    className="align-baseline text-sm text-dark"
                    >
                        Forgot password ?
                    </a>
                    </div>
                </Form.Group>
                    <Button onClick={()=>{
                        handlerGoogle()
                    }} type="button"
                    className="mt-2 bg4 border border-0 btn btn btn-dark"
                    >
                        Log in with Google
                    </Button>
            </Form>
            </div>
            }
        </>
    )
}


export default Login;