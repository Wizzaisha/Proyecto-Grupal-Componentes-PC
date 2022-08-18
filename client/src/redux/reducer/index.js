
import {
    ACTION_TEST,
    ADD_TO_CART
} from "../actions";

const initialState = {
    products: [],
    cart:[]
}

const rootReducer = (state = initialState, action) => {

    switch(action.type) {
        case ACTION_TEST:
            console.log(action.payload);
            break;

        case ADD_TO_CART:
            
                // Selecciono y guardo en una constante el objeto elegido para agregar al carrito
                const chosenProduct = products.find(p => p.id === action.payload)

                // Aca busco si existe el producto buscandolo por ID entre los que se encuentran dentro del array «cart» del estado global...
                // Negamos el resultado del condicional ya que solo en caso de que arroje undefined (no exista) vamos a solicitar que  nos retorne el 
                // estado «cart» con el producto actual agregado. De lo contrario retorna el estado tal cual esta

                if(!cart.find(p => p.id === action.payload)) return {...state, cart: [...cart, chosenProduct]};

                return {...state}

        default: 
            return {...state}
    }
}

export default rootReducer;