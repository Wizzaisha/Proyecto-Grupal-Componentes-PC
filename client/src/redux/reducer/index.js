
import {
    GET_ALL_PRODUCTS,
    GET_ALL_CATEGORIES,
    FILTER_AND_SORT_BY
} from "../actions";

import { filterData } from "../utils";

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

        case FILTER_AND_SORT_BY:
            const { category, sort, brands } = action.payload;
            
            const filteredProducts = filterData(state.productsCopy, category, sort, brands);
            
            return {
                ...state,
                products: filteredProducts
            }
        default: 
            return {...state}
    }
}

export default rootReducer;