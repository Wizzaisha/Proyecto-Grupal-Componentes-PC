import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions";
//import { Link } from "react-router-dom";
import './Cart.css';


function Cart() {

    //const cart = useSelector(state => state.cart)

    const dispatch = useDispatch()

    const cart = JSON.parse(localStorage.getItem('cart'));

    /*useEffect( () => {
        
    }, []);*/

    /*
    BOTON PARA PROBAR AGREGAR UN PRODUCTO
    function handleButton(e) {
        e.preventDefault();
        dispatch(addToCart(e.target.value));
    }
    <button class={s.button} value={el.id} type='button' onClick={(e) => handleButton(e)}> Add a product </button>
    */
    function handleDelete(e, el) {
        // El handler este le da el ID a la accion del producto que quiere remover
        e.preventDefault();
        dispatch(removeFromCart(e.target.value));
    }

    return (
        <div className={"container"}>
            <h1>Cart</h1>
            <div className={"headers"}>
                <span className={"span"}>Product</span>
                <span className={"span"}>Price</span>
                <span className={"span"}>Units</span>
            </div>
            {
                // Mapeo el carrito que me traigo con useSelector para crear cada item
                cart? cart.map(el =>

                    <div className={"items"}>
                        <div className={"product"}>
                            <img className={"cartImg"} src={el.image} alt='noimage'></img>
                            <p className={"span"}>{el.brand + ' ' + el.model}</p>
                        </div>

                        <label className={"span"}>{`$ ${el.price}`}</label>

                        <input className={"span"}
                            id={"units"}
                            type="number"
                            min="0"                   // Aca me falta handelear las cantidades
                            max="100"
                        />
                        {/* Este boton que se renderiza por cada uno de los componentes toma como value el ID del producto */}
                        <button className={"button"} value={el.id} type='button' onClick={(e) => handleDelete(e)}> X </button>
                    </div>) : <h1>You don't add any product...</h1>
            }

        </div>
    )
}

export default Cart; 