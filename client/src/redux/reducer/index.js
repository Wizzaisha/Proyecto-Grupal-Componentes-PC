
import {
    GET_ALL_PRODUCTS,
    GET_ALL_CATEGORIES,
    GET_CURRENT_BRANDS,
    ADD_REMOVE_FILTER_BRAND,
    FILTER_AND_SORT_BY,
    SET_CATEGORY,
    GET_PRODUCT_DETAILS
} from "../actions";

import { filterCurrentBrands, filterData } from "../utils";

const initialState = {
    products: [],
    productsCopy: [],
    brands: [],
    filterBrands: [],
    allCategories: [],
    currentCategory: "",
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

        case FILTER_AND_SORT_BY:
            const { sort } = action.payload;
            // console.log("category", category);
            // console.log("sortVal", sort);
            // console.log("brands", brands);
            const filteredProducts = filterData(state.productsCopy, state.category, sort, state.filterBrands);

            return {
                ...state,
                products: filteredProducts,
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