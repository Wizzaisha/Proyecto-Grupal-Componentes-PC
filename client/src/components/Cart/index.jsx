import React /*{ useState }*/ from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions";
//import { Link } from "react-router-dom";
import s from './Cart.module.css';


function Cart () {
    
    const cart = useSelector(state => state.cart)

    const dispatch = useDispatch()

   
    /*

    BOTON PARA PROBAR AGREGAR UN PRODUCTO

    function handleButton(e) {
        e.preventDefault();
        dispatch(addToCart(e.target.value));
    }

    <button class={s.button} value={el.id} type='button' onClick={(e) => handleButton(e)}> Add a product </button>
    */
    function handleDelete(e) {
        // El handler este le da el ID a la accion del producto que quiere remover
        e.preventDefault();
        dispatch(removeFromCart(e.target.value));
        console.log(e.target.value)
    }

    return (
        <div class={s.container}>
            <h1>Cart</h1>
            <div class={s.headers}>
            <span class={s.span}>Units</span>
            <span class={s.span}>Price</span>
            <span class={s.span}>Product</span>
            </div>
            {
                // Mapeo el carrito que me traigo con useSelector para crear cada item
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
                        {/* Este boton que se renderiza por cada uno de los componentes toma como value el ID del producto */}
                        <button class={s.button} value={el.id} type='button' onClick={(e) => handleDelete(e)}> X </button>
                        
                    </div> )
            }
           
        </div>
    )
}

export default Cart;

/*
 Ignorar esto
| Propiedades del input Units |
value = {input.units} 
                            name = 'units'
                            onChange={(e) => handleChange(e)}
*/