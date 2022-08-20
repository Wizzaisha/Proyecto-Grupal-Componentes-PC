
import {
    ACTION_TEST,
    ADD_TO_CART,
    REMOVE_FROM_CART
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
                var chosenProduct = state.products.find(p => p.id === action.payload)
                
                // Aca busco si existe el producto buscandolo por ID entre los que se encuentran dentro del array «cart» del estado global...
                // Negamos el resultado del condicional ya que solo en caso de que arroje undefined (no exista) vamos a solicitar que  nos retorne el 
                // estado «cart» con el producto actual agregado. De lo contrario retorna el estado tal cual esta

                if(!state.cart.find(p => p.id === action.payload)) return {...state, cart: [...state.cart, chosenProduct]};

                // else
                return {...state}

        case REMOVE_FROM_CART:
                // Esto filtra el estado «cart» y retorna una copia sin el producto que coincida con el ID pasado por payload

                return {...state, cart: state.cart.filter(p => p.id != action.payload)};

                
        default: 
            return {...state}
    }
}

export default rootReducer;