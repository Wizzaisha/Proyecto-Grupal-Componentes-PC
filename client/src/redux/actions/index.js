import axios from "axios";

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const FILTER_AND_SORT_BY = "FILTER_AND_SORT_BY";
export const GET_CURRENT_BRANDS = "GET_CURRENT_BRANDS";
export const ADD_REMOVE_FILTER_BRAND = "ADD_REMOVE_FILTER_BRAND";
export const SET_CATEGORY = "SET_CATEGORY";

export const getAllProducts = () => {
    return async (dispatch) => {
        const response = await axios.get("http://localhost:3001/productos");
        
        return dispatch({type: GET_ALL_PRODUCTS, payload: response.data});
    }
}


export const getAllCategories = () => {
    return async (dispatch) => {
        const response = await axios.get("http://localhost:3001/categorias");

        return dispatch({type: GET_ALL_CATEGORIES, payload: response.data})
    }
}


export const filterAndSortBy = (filterValues) => {
    return (dispatch) => {
        return dispatch({type: FILTER_AND_SORT_BY, payload: filterValues});
    }
}

export const getCurrentBrands = (filterValues) => {
    return (dispatch) => {
        return dispatch({type: GET_CURRENT_BRANDS, payload: filterValues});
    }
}


export const addAndRemoveFilterBrand = (brand) => {
    return (dispatch) => {
        return dispatch({type: ADD_REMOVE_FILTER_BRAND, payload: brand});
    }
}

export const setCategory = (category) => {
    return (dispatch) => {
        return dispatch({type: SET_CATEGORY, payload: category})
    }
}
