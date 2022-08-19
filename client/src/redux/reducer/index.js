
import {
    GET_ALL_PRODUCTS,
    GET_ALL_CATEGORIES,
    FILTER_AND_SORT_BY,
    GET_PRODUCT_DETAILS
} from "../actions";

import { filterCurrentBrands, filterData } from "../utils";

const initialState = {
    products: [],
    productsCopy: [],
    brands: [],
    allCategories: [],
    details: []
}

const rootReducer = (state = initialState, action) => {

    switch (action.type) {
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
            const filteredBrands = filterCurrentBrands(state.productsCopy, category);
            return {
                ...state,
                products: filteredProducts,
                brands: filteredBrands
            }
        case GET_PRODUCT_DETAILS:
            return {
                ...state,
                details: action.payload
            }

        default:
            return { ...state }
    }
}

export default rootReducer;