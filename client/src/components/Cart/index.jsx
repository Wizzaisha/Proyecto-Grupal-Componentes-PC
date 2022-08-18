import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions";
//import { Link } from "react-router-dom";
import s from './Cart.module.css';


function Cart () {
    
    const cart = useSelector(state => state.cart)

    const dispatch = useDispatch()

    const [input, setInput] = useState({
        aux: 1
    })
    
    function handleButton(e) {
        e.preventDefault();
        dispatch(addToCart(input.aux));
        console.log(input.aux)
        setInput({
            aux: input.aux+1
        })
        
    }

    return (
        <div class={s.container}>
            <h1>Cart</h1>
            <div class={s.headers}>
            <span class={s.span}>Units</span>
            <span class={s.span}>Price</span>
            <span class={s.span}>Product</span>
            </div>
            <button class={s.button} type='button' onClick={(e) => handleButton(e)}> Add a product </button>
            {
                cart.map(el =>
                    
                    
                        <div class = {s.items}>
                        <div class = {s.product}>
                        <img src = {el.background_image} alt = 'no image'></img>
                        <p class={s.span}>{el.marca + ' ' + el.modelo}</p>
                        </div>
        
                        <label class={s.span}>{`$ ${el.precio}`}</label>

                        <input class={s.span}
                            id = {s.units}
                            type = "number"
                            min = "0"                   // Aca me falta handelear las cantidades
                            max = "100" 
                        />
                
                        <button class={s.button} type='button' /*onClick={(e) => handleDelete(e)}*/> X </button>
                        
                    </div> )
            }
           
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