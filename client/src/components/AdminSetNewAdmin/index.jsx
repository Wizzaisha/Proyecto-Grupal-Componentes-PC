import React, {
    useState
} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAuth } from "../context/authContext";


export default function SetAdmin () {
    const auth = useAuth()
    const [id , setId] = useState("")
    const [admin , setAdmin] = useState(false)
    const [error , setError] = useState("")
    const handlerId = (e) => {
        setError("")
        setId(e.target.value)
        console.log(id)
    }
    const handlerAdmin = (e) => {
        setError("")
        if(e.target.value === "true"){
        setAdmin(true)
        }else{
            setAdmin(false)
        }
        console.log(admin)
    }
    const handlerSubmit = async (e) => {
        e.preventDefault()
        setError("")
        try {
            if (id && admin){
                await auth.addAndRemoveAdmin(id , admin)
            }else{
                setError("Complete the form")
            }
        } catch (error) {
            console.log(error, "error al setear admin")
        }
    }
    return (
    <>
        {localStorage.getItem("email") === "superUser@gmail.com" &&
            <div className="d-flex justify-content-center align-items-center flex-column">
                <Form className={"form bg-body rounded"}
                    onSubmit={(e) => {
                        handlerSubmit(e)
                    }}
                >
                    <Form.Group className="mb-3 shadow-lg p-3 bg2 text-dark rounded" controlId="formBasicEmail">
                        {error &&
                        <Form.Group className="mb-3 shadow-lg p-3 bg4 rounded">
                            <Form.Text>
                                <h6 className="text-light">{error}</h6>
                            </Form.Text>
                        </Form.Group>}
                        <Form.Label>User ID</Form.Label>
                        <Form.Control type="text" placeholder="Enter UID"
                            onChange={(e) => {
                                handlerId(e)
                            }}
                        />
                        <Form.Text className="text-dark">
                            Enter the unique user id
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3 shadow-lg p-3 bg2 text-light rounded" controlId="formBasicPassword">
                        <select name="admin" className="border border-0 mb-3 shadow-lg p-2 bg4 text-light rounded"
                            onChange={(e) => {
                                handlerAdmin(e)
                            }}
                        >
                            <option value="">Select role</option>
                            <option value="true">Admin</option>
                            <option value="false">Client</option>
                        </select>
                        <Form.Text className="text-dark">
                            Options to switch to this user
                        </Form.Text>
                        <Form.Group className="mb-3 shadow-lg p-3 bg2 text-light rounded">
                            <Button className="bg4 border border-0 btn btn btn-dark shadow-lg rounded" type="submit">
                            Add changes
                            </Button>
                        </Form.Group>
                    </Form.Group>
                </Form>
            </div>
        }
    </>
    )
}