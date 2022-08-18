import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/Actions";
import { Link } from "react-router-dom";
import s from './Cart.module.css';


function Cart () {
    
    const cart = useSelector(state => state.cart)

    return (
        <div>
            <h1>Cart</h1>
            <h3>Product</h3>
            <h3>Price</h3>
            <h3>Units</h3>
            <h3>Subtotal</h3>
            {
                cart.map(el =>
                    
                    <div class = {s.div} key = {el.id}>
                        <img src = {el.background_image} alt = 'no image'></img>
                        <p>{el.marca + ' ' + el.modelo}</p>
                        <label>{`$ ${el.precio}`}</label>
                        <input
                            id = {s.units}
                            type = "number"
                            min = "0"                   // Aca me falta handelear las cantidades
                            max = "100" 
                        />
                        <label>{el.precio * input.units}</label>
                    </div> )
            }
            <button class={s.button} type='button' onClick={(e) => HandleButton(e)}>Add step</button>
        </div>
    )
}

export default Cart;

/*
| Propiedades del input Units |
value = {input.units} 
                            name = 'units'
                            onChange={(e) => handleChange(e)}
*/