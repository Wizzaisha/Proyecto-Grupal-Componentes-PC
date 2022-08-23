import axios from "axios";

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const FILTER_AND_SORT_BY = "FILTER_AND_SORT_BY";
export const GET_CURRENT_BRANDS = "GET_CURRENT_BRANDS";
export const ADD_REMOVE_FILTER_BRAND = "ADD_REMOVE_FILTER_BRAND";
export const SET_CATEGORY = "SET_CATEGORY";
export const GET_PRODUCT_DETAILS = "GET_PRODUCT_DETAILS";
export const SET_SORT = "SET_SORT";


export const getAllProducts = () => {
    return async (dispatch) => {
        const response = await axios.get("http://localhost:3001/api/productos");

        return dispatch({ type: GET_ALL_PRODUCTS, payload: response.data });
    }
}


export const getAllCategories = () => {
    return async (dispatch) => {
        const response = await axios.get("http://localhost:3001/api/categorias");

        return dispatch({ type: GET_ALL_CATEGORIES, payload: response.data })
    }
}


export const filterAndSortBy = (filterValues) => {
    return (dispatch) => {
        return dispatch({ type: FILTER_AND_SORT_BY, payload: filterValues });
    }
}

export const getProductDetails = (payload) => {
    return async (dispatch) => {
        const response = await axios.get(`http://localhost:3001/api/productos/${payload}`);

        return dispatch({ type: 'GET_PRODUCT_DETAILS', payload: response.data })
    }
}


export const getCurrentBrands = (filterValues) => {
    return (dispatch) => {
        return dispatch({ type: GET_CURRENT_BRANDS, payload: filterValues });
    }
}

export const addAndRemoveFilterBrand = (brand) => {
    return (dispatch) => {
        return dispatch({ type: ADD_REMOVE_FILTER_BRAND, payload: brand });
    }
}

export const setCategory = (category) => {
    return (dispatch) => {
        return dispatch({ type: SET_CATEGORY, payload: category })
    }
}

export const setSort = (sortType) => {
    return (dispatch) => {
        return dispatch({ type: SET_SORT, payload: sortType });
    }
}

export function postLogIn(email, password) {
    return async function (dispatch) {
        try {
            console.log(email, password)
            let response = await axios.post(`http://localhost:3001/LogIn`, {
                email,
                password
            })
            return response;
        } catch (error) {
            console.log(error)
        }
    }
}
export function postSingIn(user, email, password) {
    return async function (dispatch) {
        try {
            let response = await axios.post(`http://localhost:3001/singin`, {
                user,
                email,
                password
            })
            return response;
        } catch (error) {
            console.log(error)
        }
    }
}