
import "./ProductDetails.css"
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom'
import { getProductDetails } from '../../redux/actions'

function ProductDetails() {
    const p = {
        "image": "https://m.media-amazon.com/images/I/51wqVVVtnyS._AC_SL1413_.jpg",
        "brand": "Intel",
        "model": "Core i5-11400F",
        "price": 149,
        "description": "The Rocket Lake i5-11400F paired with a B560 motherboard and 3200 RAM ($365 USD) offers unprecedented value for money to gamers. It completely prices AMD's 5000 series out of the market.",
        "bentchmark": 96,
        "specs": ["CPU Model:Intel Core i5", "CPU Speed:2.6 GHz"],
        "categorys": "CPU",
        "stock": 10
    }
    const dispatch = useDispatch()
    const { id } = useParams()
    const details = useSelector(state => state.details)
    const [value, setValue] = useState(1)

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }, [dispatch])

    useEffect(() => {
        dispatch(getProductDetails(id))
    }, [dispatch])



    function handleAddToCart() {

    }

    return (
        <div className="container">
            <div className="containerRow">
                <img src={p.image} className="img" />
                <div className="containerColumn">
                    <div className="containerRow">
                        <h1>{`${p.categorys[0] + p.categorys.slice(1).toLowerCase()} ${p.brand} ${p.model}`}</h1>
                        <Link to={'/'}>
                            <button className="btn btn-primary">X</button>
                        </Link>
                    </div>
                    <h3>Brand: {p.brand}</h3>
                    <h3>Model: {p.model}</h3>
                    <h3>${p.price}</h3>
                    <p>{`Stock available: (${p.stock} available)`} </p>
                    <div className="input-group">
                        <button type="button" className="btn btn-outline-primary" onClick={() => setValue(value - 1)}>-</button>
                        <input aria-label="Example text with two button addons" className="text-center form-control" value={value} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => setValue(value + 1)}>+</button>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={e => handleAddToCart(e)} >Add to cart</button>
                </div>
            </div>
            <div className="containerColumn2">
                <h3>{p.description}</h3>
                <h3>Specs</h3>
                {p.specs && p.specs.map((e) => { return <li>{e}</li> })}
            </div>
        </div>
    )
}


export default ProductDetails;