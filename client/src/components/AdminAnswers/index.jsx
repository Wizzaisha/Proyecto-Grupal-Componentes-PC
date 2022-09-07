import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";

const AdminAnswers = () => {
    const dispatch = useDispatch()
    const productos = useSelector(state => state.productsCopy)

    useEffect(() => {

    }, [])

    return (
        <div>
            <h1>Hola mundo</h1>
            {productos && productos.map(e => {
                const getAnswers = async () => {
                    const respuesta = await axios.get(`http://localhost:3001/api/question/${e.id}`)
                    return respuesta.data
                }
                const question = getAnswers()
                // if (question && question.length > 0) {
                //     return (
                //         <div>
                //             <h2>{e.model}</h2>
                //         </div>
                //     )
                // }
                console.log(question);
            })}
        </div>
    )
}

export default AdminAnswers 
