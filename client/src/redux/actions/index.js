
export const ADD_TO_CART = 'ADD_TO_CART';
export const ACTION_TEST = "ACTION_TEST";

export function addToCart(idProduct){
    // Creo una action que recibe el ID del producto (desde el componente «Detail» cuando se presiona boton para agregar al carrito)
    return async function(dispatch) {
        // Despacho al reducer una accion de tipo «Agregar al carrito» y como payload el ID
        return dispatch({
            type: ADD_TO_CART,
            payload: idProduct
        })
    }
}


export const actionTest = (message) => {
    return (dispatch) => {
        return dispatch({type: ACTION_TEST, payload: {message}})
    }
}