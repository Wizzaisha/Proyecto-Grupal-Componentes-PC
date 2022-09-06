import "./ProductDetails.css"
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom'
import { getProductDetails, } from '../../redux/actions'
import { useAuth } from '../context/authContext'
import starFilled from '../img/icons8-estrella-96 (1).png'
import starEmpty from '../img/icons8-estrella-96.png'

function ProductDetails() {

    const dispatch = useDispatch()
    const { idProduct } = useParams()
    const details = useSelector(state => state.details)
    const [value, setValue] = useState(1)
    const auth = useAuth()
    const [favorite, setFavorite] = useState(false)

    useEffect(() => {
        const getFav = async () => {
            await auth.getFavorite();
        }
        getFav();
        if (auth.favorite.includes(details.id)) {
            setFavorite(true)
        }
        else {
            setFavorite(false)
        }
    }, [])

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }, [])

    useEffect(() => {
        dispatch(getProductDetails(idProduct))
    }, [dispatch, idProduct])


    function handleButton(e) {
        e.preventDefault();
        // Las dos lineas de codigo siguiente actualizan el contador del cart del navbar
        let cartCounter = Number(document.querySelector('#counter').innerText) + 1;
        document.querySelector('#counter').innerText = cartCounter
        // Le agrego/sobreescribo una propiedad cantidad al producto
        details.quantities = value;
        // Traemos el «cart» del localStorage y lo parseamos para poder manipularlo
        let cart = JSON.parse(localStorage.getItem('cart'));
        // Si no existe (primera vez que se agrega un producto) lo definimos como un array y le pusheamos el producto en cuestion
        if (!cart) {
            cart = [];
            cart.push(details);
            alert(`Added ${details.category} ${details.brand} ${details.model} to cart`)
        }
        else {
            // Si ya existe el «cart» (ya se pushearon uno o mas productos) preguntamos si encuentra el producto dentro
            if (!cart.find(p => p.id === details.id)) {
                // En caso de no encontrarlo lo pushea
                cart.push(details)
                alert(`Added ${details.category} ${details.brand} ${details.model} to cart`)
            }
            else
                // En caso de encontrarlo sobreescribe la cantidad
                cart.forEach(product => { if (product.id === details.id) product.quantities = value; });

            /*alert(`This product is already added to cart`)*/
        }
        // Luego «cart» a string y lo subimos al localStorage
        localStorage.setItem('cart', JSON.stringify(cart))

    }

    const handleFavorite = async () => {
        if (auth.user !== null) {
            if (favorite == false) {
                await auth.addFavorite(details.id)
                console.log('agrego');
                setFavorite(true)
            } else if (favorite == true) {
                await auth.removeFavorite(details.id)
                setFavorite(false)
                await auth.getFavorite();
                console.log('removio');
            }
        } else {
            console.log('debes iniciar sesion');
        }
    }

    function stockValidator(e) {
        if (e.target.value === '+' && value < details.stock) { setValue(value + 1) }
        if (e.target.value === '-' && value > 1) { setValue(value - 1) }
    }
    console.log(favorite);
    return (
        <div className="container-sm d-flex flex-column align-items-center">
            <div className="row card d-flex flex-row mt-4 " >
                <div className="col-10 d-flex flex-column" style={{ width: '65%' }}>
                    <button onClick={handleFavorite} className="btn border border-0 " style={{ width: '5rem', height: '5rem' }}>
                        {
                            favorite === true ? <img src={starFilled} alt="img" style={{ width: '4rem', height: '4rem' }} /> : <img src={starEmpty} alt="img" style={{ width: '4rem', height: '4rem' }} />
                        }
                    </button>
                    {details.stock === 0 ? <h3 style={{ color: "red" }}>Out of stock</h3> : null}
                    <div>
                        <img src={details.image} className="img" alt="img" />
                    </div>
                    <div className='d-flex flex-column m-5 align-items-start'>
                        <h3 className='tx4'>Description</h3>
                        <p className='description'>{details.description}</p>
                        <h3 className='tx4'>Specs</h3>
                        <div className="specs">
                            {details.specs && details.specs.map((e) => { return <li>{e}</li> })}
                        </div>
                    </div>
                </div>
                <div className="col-2 d-flex flex-column align-items-start justify-content-between border-start border-dark border-opacity-10 p-4" style={{ width: '35%' }}>
                    <div className="d-flex flex-column align-items-start justify-content-between" style={{ height: '60%' }}>
                        <Link to={'/store'} className="align-self-end">
                            <button className="btn btn-primary bg3 border-0" style={{ width: '2.3rem' }} >X</button>
                        </Link>
                        <h1 className="d-flex flex-column align-items-start tx4">{`${details.category} ${details.brand} ${details.model}`}</h1>
                        <h4>Brand: {details.brand}</h4>
                        <h4>Model: {details.model}</h4>
                        <h4>Price: ${details.price}</h4>
                    </div>
                    <div className="d-flex flex-column" style={{ width: '100%' }}>
                        <p className={`align-self-center ${details.stock < 5 ? 'text-danger fw-bold ' : null}`}>{`Stock available: (${details.stock} available)`} </p>
                        <div className="input-group">
                            <button type="button" className="btn btn-outline-primary" value={'-'} onClick={(e) => stockValidator(e) /*setValue(value - 1)*/}>-</button>
                            <input aria-label="Example text with two button addons" className="text-center form-control" value={value} />
                            <button type="button" className="btn btn-outline-primary" value={'+'} onClick={(e) => stockValidator(e) /*setValue(value + 1)*/}>+</button>
                        </div>
                        <button type="submit" className="btn btn-primary button3 bg3 border-0" onClick={e => handleButton(e)} disabled={details.stock === 0 ? "true" : null}>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ProductDetails;