
import {
    GET_ALL_PRODUCTS,
    GET_ALL_CATEGORIES,
    GET_CURRENT_BRANDS,
    ADD_REMOVE_FILTER_BRAND,
    FILTER_AND_SORT_BY,
    SET_CATEGORY,
    GET_PRODUCT_DETAILS,
    SET_SORT,
    ADD_TO_CART,
    REMOVE_FROM_CART
} from "../actions";

import { filterCurrentBrands, filterData } from "../utils";

const initialState = {
    products: [],
    productsCopy: [],
    brands: [],
    filterBrands: [],
    allCategories: [],
    category: "",
    currentSort: "",
    details: [],
    cart:[]
}

const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                brands: [],
                filterBrands: [],
                category: "",
                products: action.payload,
                productsCopy: action.payload
            }

        case GET_ALL_CATEGORIES:
            return {
                ...state,
                allCategories: action.payload
            }
        case GET_CURRENT_BRANDS:

            const categoryType = action.payload;

            const filteredBrands = filterCurrentBrands(state.productsCopy, categoryType);

            return {
                ...state,
                brands: filteredBrands
            }

        case ADD_REMOVE_FILTER_BRAND:

            const currentIndex = state.filterBrands.indexOf(action.payload);

            if (currentIndex === -1){
                return {
                    ...state,
                    filterBrands: [...state.filterBrands, action.payload]
                }
            } else {
                return {
                    ...state,
                    filterBrands: state.filterBrands.filter(e => e !== action.payload)
                }
            }
        
        case SET_CATEGORY:
            return {
                ...state,
                filterBrands: [],
                category: action.payload
            }

        case SET_SORT:
            return {
                ...state,
                currentSort: action.payload
            }

        case FILTER_AND_SORT_BY:

            const filteredData = filterData(state.productsCopy, state.category, state.currentSort, state.filterBrands);
            
            return {
                ...state,
                products: filteredData.slice()
            }
        case GET_PRODUCT_DETAILS:
            return {
                ...state,
                details: action.payload
            }

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

                return {...state, cart: state.cart.filter(p => p.id !== action.payload)};
        default:
            return { ...state }
    }
}

export default rootReducer;