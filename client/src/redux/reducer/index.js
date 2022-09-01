
import {
    GET_ALL_PRODUCTS,
    GET_ALL_CATEGORIES,
    GET_CURRENT_BRANDS,
    ADD_REMOVE_FILTER_BRAND,
    FILTER_AND_SORT_BY,
    SET_CATEGORY,
    GET_PRODUCT_DETAILS,
    SET_SORT,
    GET_ORDER_DETAILS,
    GET_ALL_ORDERS,
    GET_CUSTOMER_HISTORY,
    FILTER_BY_STATUS,
    UPDATED_ORDER,
    DELETE_PRODUCT,
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
    cart: [],
    orderList: [],
    orderListCopy: [],
    orderDetails: {},
    customerHistory: [],
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

            if (currentIndex === -1) {
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

        case GET_ALL_ORDERS:
            
            return {
                ...state,
                orderList: action.payload,
                orderListCopy: action.payload
            }
        case GET_ORDER_DETAILS: 

            return {
                ...state,
                orderDetails: action.payload
            }

        case GET_CUSTOMER_HISTORY:
            return {
                ...state,
                customerHistory: action.payload
            }
        
        case UPDATED_ORDER:
            
            const findObjectIndex = state.orderList.findIndex(e => e.id === action.payload.id);

            return {
                ...state,
                orderList: [...state.orderList.slice(0, findObjectIndex), action.payload, ...state.orderList.slice(findObjectIndex + 1)],
                orderListCopy: [...state.orderListCopy.slice(0, findObjectIndex), action.payload, ...state.orderListCopy.slice(findObjectIndex + 1)]
            }

        case FILTER_BY_STATUS:

            return {
                ...state,
                orderList: action.payload === "ALL" ? state.orderListCopy : state.orderListCopy.filter(e => e.metadata.orderStatus === action.payload)
            }

        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(e => e.id !== action.payload),
                productsCopy: state.productsCopy.filter(e => e.id !== action.payload),
            }

            //-------------------Crear Producto----------
            case "POST_PRODUCT":
                return{
                    ...state,
                }
        default:
            return { ...state }
    }
}

export default rootReducer;