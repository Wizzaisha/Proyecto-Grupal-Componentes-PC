import axios from "axios";

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";

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