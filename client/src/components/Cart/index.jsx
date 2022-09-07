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
        cart = cart.filter(p => p.id != e.target.value)
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
        state.cart.length ? 

        <div className='card container-sm mt-4 pb-3'>

            <h1 className='tx4 my-4'>Cart</h1>
            <table className="table cartTable">
                <thead>
                    <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Units</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    
                    {
                    // Mapeo el «cart» del estado local para crear cada item
                    state.cart.map(el =>
                        <tr className="itemsCart">
                            <th scope="col" className="imgCart">
                                <img className={"cartImg"} src={el.image} alt='noimage'></img>
                                <p>{el.brand + ' ' + el.model}</p>
                            </th>
                            <td >{`$ ${el.price}`}</td>
                            <td >{`x${el.quantities}`}</td>
                            {/* Este boton que se renderiza por cada uno de los componentes toma como value el ID del producto */}
                            <td ><button className={"button bg3 tx1 card"} value={el.id} type='button' onClick={(e) => handleDelete(e)}> X </button></td>
                        </tr>)
                    }
                    
                </tbody>
            </table>
            <Link to={auth.user !== null ? '/payment' : "/login"}>
                    {state.cart.length ? <button className={"btn btn-dark buyButton bg3 tx1 w-50 "} type='button' > Make a purchase for {'$ ' + total} </button> : null}
            </Link>
        </div>
        : <div className="noFoundTitle"><h2>You did not add any product...</h2></div>
    )
}

export default Cart;

//console.log(document.querySelector('#counter').innerText)