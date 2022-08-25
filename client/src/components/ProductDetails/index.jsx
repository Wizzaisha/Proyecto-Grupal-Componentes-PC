import "./ProductDetails.css"
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom'
import { getProductDetails, } from '../../redux/actions'

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
    const { idProduct } = useParams()
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
        dispatch(getProductDetails(idProduct))
    }, [dispatch, idProduct])


    function handleButton(e) {
        e.preventDefault();
        // Le agrego/sobreescribo una propiedad cantidad al producto
        details.quantities = value;
        // Traemos el «cart» del localStorage y lo parseamos para poder manipularlo
        let cart = JSON.parse(localStorage.getItem('cart'));
        // Si no existe (primera vez que se agrega un producto) lo definimos como un array y le pusheamos el producto en cuestion
        if(!cart){
            cart = [];
            cart.push(details);
            alert(`Added ${details.category} ${details.brand} ${details.model} to cart`)
        }
        else{
            // Si ya existe el «cart» (ya se pushearon uno o mas productos) preguntamos si encuentra el producto dentro
            if(!cart.find(p => p.id === details.id)){
                // En caso de no encontrarlo lo pushea
                cart.push(details)
                alert(`Added ${details.category} ${details.brand} ${details.model} to cart`)
            }
            else 
            // En caso de encontrarlo sobreescribe la cantidad
            cart.forEach(product => { if (product.id === details.id) product.quantities = value;});
            
            /*alert(`This product is already added to cart`)*/
        }
        // Luego «cart» a string y lo subimos al localStorage
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    function stockValidator(e){
        if (e.target.value === '+' && value < details.stock) {setValue(value + 1)}
        if (e.target.value === '-' && value > 1) {setValue(value - 1)}
    }

    return (
        <div className="container">
            <div className="containerRow">
                <img src={details.image} className="img" alt="img" />
                <div className="containerColumn">
                    <div className="containerRow">
                        <h1>{`${details.category} ${details.brand} ${details.model}`}</h1>
                        <Link to={'/store'}>
                            <button className="btn btn-primary">X</button>
                        </Link>
                    </div>
                    <h3>Brand: {details.brand}</h3>
                    <h3>Model: {details.model}</h3>
                    <h3>${details.price}</h3>
                    <p>{`Stock available: (${details.stock} available)`} </p>
                    <div className="input-group">
                        <button type="button" className="btn btn-outline-primary" value={'-'} onClick={(e) => stockValidator(e) /*setValue(value - 1)*/}>-</button>
                        <input aria-label="Example text with two button addons" className="text-center form-control" value={value} />
                        <button type="button" className="btn btn-outline-primary" value={'+'} onClick={(e) => stockValidator(e) /*setValue(value + 1)*/}>+</button>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={e => handleButton(e)} >Add to cart</button>
                </div>
            </div>
            <div className="containerColumn2">
                <h3>{details.description}</h3>
                <h3>Specs</h3>
                {details.specs && details.specs.map((e) => { return <li>{e}</li> })}
            </div>
        </div>
    )
}


export default ProductDetails;