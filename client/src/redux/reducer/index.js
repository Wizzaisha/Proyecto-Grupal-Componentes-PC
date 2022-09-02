
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
    SEARCH_PRODUCTS,
    SET_ADMIN_CATEGORY,
    FILTER_CATEGORY_ADMIN,
    CLEAR_FILTER_ADMIN,
    CLEAR_FILTER_STORE,
    GET_STATISTICS_DATA

    UPDATE_PRODUCT,
    SET_MESSAGE,
    CLEAR_MESSAGE
} from "../actions";

import { filterCurrentBrands, filterData } from "../utils";

const initialState = {
    products: [],
    productsCopy: [],
    productsCopy2: [],
    productsAdmin: [],
    productsAdminCopy: [],
    brands: [],
    filterBrands: [],
    allCategories: [],
    category: "",
    admCurrCategory: "",
    currentSort: "",
    details: [],
    cart: [],
    orderList: [],
    orderListCopy: [],
    orderDetails: {},
    customerHistory: [],
    message: "",
}

const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_ALL_PRODUCTS:

            return {
                ...state,
                brands: [],
                filterBrands: [],
                category: "",
                admCurrCategory: "",
                products: action.payload,
                productsCopy: action.payload,
                productsCopy2: action.payload,
                productsAdmin: action.payload,
                productsAdminCopy: action.payload,

            }

        case GET_ALL_CATEGORIES:
            return {
                ...state,
                allCategories: action.payload
            }
        case GET_CURRENT_BRANDS:

            const categoryType = action.payload;

            const dataCopy = state.productsCopy.filter(e => e.isDeleted === false); 

            const filteredBrands = filterCurrentBrands(dataCopy, categoryType);

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
        case SET_ADMIN_CATEGORY:
            return {
                ...state,
                admCurrCategory: action.payload
            }

        case SET_SORT:
            return {
                ...state,
                currentSort: action.payload
            }

        case FILTER_AND_SORT_BY:

            const data = state.productsCopy.filter(e => e.isDeleted === false);

            const filteredData = filterData(data, state.category, state.currentSort, state.filterBrands);

            return {
                ...state,
                products: filteredData.slice()
            }
        case FILTER_CATEGORY_ADMIN:
            
            const dataFiltered = filterData(state.productsAdminCopy, state.admCurrCategory, action.payload, []);
            return {
                ...state,
                productsAdmin: dataFiltered
            }
            
        case CLEAR_FILTER_ADMIN:
            return {
                ...state,
                productsAdmin: state.productsAdminCopy,
                admCurrCategory: "",
            }
        case CLEAR_FILTER_STORE:
            return {
                ...state,
                products: state.productsCopy,
                category: "",
                currentSort: "",
                filterBrands: [],
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
                statisticsData: action.payload
            }

            case UPDATE_PRODUCT:
                return {  ...state    }

            case SET_MESSAGE:
                return { message: action.payload };
            case CLEAR_MESSAGE:
                return { message: "" };

        default:
            return { ...state }
    }
}

export default rootReducer;