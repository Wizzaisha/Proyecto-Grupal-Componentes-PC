import "./Login.css";
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Header from "../Header";
import { useDispatch } from "react-redux";
import { postLogIn } from "../../redux/actions/index"

function Login() {
    const dispatch = useDispatch()
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
    }
    const [password, setPassword] = useState("")
    const handlerPassword = (e) => {
        setPassword(e.target.value)
        console.log(password)
    }
    const handlerSubmit = (e) => {
        e.preventDefault()
        dispatch(postLogIn(email, password))
    }
    return (
        <>
            <Header />
            <div className="containerForm justify-content-around">
                <h1 className="display-6 shadow-lg p-3 mb-5 bg-body rounded">Welcome user, log in to continue</h1>
                <Form
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
                        password.length > 8
                            ?
                            <Button variant="warning" type="submit" disabled>
                                Submit
                            </Button>
                            :
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                    }
                </Form>
            </div>
        </>
    )
}


export default Login;