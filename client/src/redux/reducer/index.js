
import {
    GET_ALL_PRODUCTS,
    GET_ALL_CATEGORIES
} from "../actions";

const initialState = {
    products: [],
    productsCopy: [],
    allCategories: []
}

const rootReducer = (state = initialState, action) => {

    switch(action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                productsCopy: action.payload
            }

        case GET_ALL_CATEGORIES:
            return {
                ...state,
                allCategories: action.payload
            }
        default: 
            return {...state}
    }
}

export default rootReducer;