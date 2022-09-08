import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, responseQuestion } from "../../redux/actions";


const AdminAnswers = () => {
    const dispatch = useDispatch()
    const productos = useSelector(state => state.productsCopy)
    const [answer, setAnswer] = useState({
        sendAdmin: "",
        emailAdmin: "",
        id: 0
    })
    const [productQuestions, setProductQuestions] = useState([])

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    useEffect(() => {
        setProductQuestions(productos.filter((e) => e.questions.length > 0))
    }, [])

    useEffect(() => {
        setProductQuestions(productos.filter((e) => e.questions.length > 0))
    }, [productos])

    const handleInputChange = (e) => {
        setAnswer({
            sendAdmin: e.target.value,
            emailAdmin: e.target.value
        })
    }

    const handleAnswer = (ev, id) => {
        ev.preventDefault()
        if (answer.sendAdmin.length > 0 && answer.emailAdmin.length > 0) {
            dispatch(responseQuestion(parseInt(id), answer))
            dispatch(getAllProducts())
            console.log(id);
        }
        alert("Question asnwered");
    }

    // const productQuestions = productos.filter((e) => e.questions.length > 0)
    return (
        <div>
            {productQuestions && productQuestions.length > 0 ? (
                <div>
                    {productQuestions.map(e => {
                        if (e.questions.some(que => que.sendAdmin === null)) {
                            return (
                                <div>
                                    <img src={e.image} className="w-25" alt='img' />
                                    <h3>{`${e.brand} ${e.model}`}</h3>
                                    {e.questions?.filter(e => e.sendAdmin === null).map(e => (
                                        <div>
                                            <h4>{e.sendUser}</h4>

                                            <form onSubmit={(ev) => { handleAnswer(ev, e.id) }}>
                                                <input type="text" name="answer" onChange={(e) => handleInputChange(e)}></input>
                                                <button type='submit'>Answer</button>
                                            </form>

                                        </div>
                                    ))}
                                </div>
                            )
                        }

                    })}
                </div>
            ) : (
                <div>
                    <p>There are not questions yet...</p>
                </div>
            )}
        </div>
    )
}

export default AdminAnswers 
