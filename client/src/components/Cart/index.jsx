import React, { useState } from "react";
import './Cart.css';
import { Link } from "react-router-dom";
import { useAuth } from '../context/authContext';

function Cart() {

    const auth = useAuth();

    // Creamos un estado local «cart»
    const [state, setState] = useState({
        // Lo inicializamos con el valor del localStorage
        cart: JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [],
    })

    function handleDelete(e) {
        e.preventDefault();
         // Las dos lineas de codigo siguiente actualizan el contador del cart del navbar
         let cartCounter = Number(document.querySelector('#counter').innerText) - 1;
         document.querySelector('#counter').innerText = cartCounter
        // Traemos el «cart» del localStorage y lo parseamos para poder manipularlo
        let cart = JSON.parse(localStorage.getItem('cart'));
        // Filtramos los productos del «cart» por el id que nos pasa el event
        cart = cart.filter(p => p.id !== e.target.value)
        // Sobreescribimos el localStorage con el «cart» modificado (que ya no tiene el producto que eliminamos)
        localStorage.setItem('cart', JSON.stringify(cart))
        // Actualizamos el estado del componente para que vuelva a renderizarse
        setState({
            cart: cart
        })
    }
    
    // Esta variable va a guardar el calculo del monto total
    var total = 0;
    // Guarda la suma de multiplicar el precio * cantidad de cada producto
    state.cart.forEach(product => total += product.price * product.quantities)

    return (
        <div className={"cartContainer"}>
            <h1>Cart</h1>
            {state.cart.length ?
                <div className={"headers"}>
                    <span className={"span"}>Product</span>
                    <span className={"span"}>Price</span>
                    <span className={"span"}>Units</span>
                </div> : null
            }
            <div className={"container-xl"}>
                {
                    // Mapeo el «cart» del estado local para crear cada item
                    state.cart.length ? state.cart.map(el =>

                        <div className={"items"}>
                            <div className={"product"}>
                                <img className={"cartImg"} src={el.image} alt='noimage'></img>
                                <p className={"span"}>{el.brand + ' ' + el.model}</p>
                            </div>

                            <label className={"span"}>{`$ ${el.price}`}</label>

                            <label className={"span"}>{`x${el.quantities}`}</label>
                            {/* Este boton que se renderiza por cada uno de los componentes toma como value el ID del producto */}
                            <button className={"button"} value={el.id} type='button' onClick={(e) => handleDelete(e)}> X </button>
                        </div>) : <h1>You don't add any product...</h1>
                }
                <Link to={auth.user !== null ? '/payment' : "/login"}>
                    {state.cart.length ? <button className={"buyButton"} type='button' > Make a purchase for {'$ ' + total} </button> : null}
                </Link>
            </div>
        </div>
    )
}

export default Cart;

//console.log(document.querySelector('#counter').innerText)