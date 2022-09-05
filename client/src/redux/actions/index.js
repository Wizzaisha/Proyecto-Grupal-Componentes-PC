import axios from "axios";

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const FILTER_AND_SORT_BY = "FILTER_AND_SORT_BY";
export const GET_CURRENT_BRANDS = "GET_CURRENT_BRANDS";
export const ADD_REMOVE_FILTER_BRAND = "ADD_REMOVE_FILTER_BRAND";
export const SET_CATEGORY = "SET_CATEGORY";
export const GET_PRODUCT_DETAILS = "GET_PRODUCT_DETAILS";
export const SET_SORT = "SET_SORT";
export const GET_ALL_ORDERS = "GET_ALL_ORDERS";
export const GET_ORDER_DETAILS = "GET_ORDER_DETAILS";
export const GET_CUSTOMER_HISTORY = "GET_CUSTOMER_HISTORY";
export const UPDATED_ORDER = "UPDATED_ORDER";
export const FILTER_BY_STATUS = "FILTER_BY_STATUS";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS";
export const SET_ADMIN_CATEGORY = "SET_ADMIN_CATEGORY";
export const FILTER_CATEGORY_ADMIN = "FILTER_CATEGORY_ADMIN";
export const CLEAR_FILTER_ADMIN = "CLEAR_FILTER_ADMIN";
export const CLEAR_FILTER_STORE = "CLEAR_FILTER_STORE";
export const GET_STATISTICS_DATA = "GET_STATISTICS_DATA";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT"; 
export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";
export const CREATE_REVIEW = "CREATE_REVIEW";

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

        return dispatch({ type: GET_PRODUCT_DETAILS, payload: response.data })
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

export const getOrdersList = () => {
    return async (dispatch) => {

        const response = await axios.get("http://localhost:3001/api/order-list");

        return dispatch({ type: GET_ALL_ORDERS, payload: response.data });
    }
}

export const getOrderDetails = (id) => {
    return async (dispatch) => {
        const response = await axios.get(`http://localhost:3001/api/order-list/${id}`);

        return dispatch({ type: GET_ORDER_DETAILS, payload: response.data });
    }
}

export const getCustomerHistory = (id) => {
    return async (dispatch) => {
        const response = await axios.get(`http://localhost:3001/api/order-list/customer/${id}`);

        return dispatch({ type: GET_CUSTOMER_HISTORY, payload: response.data });
    }
}

export const updateOrder = (id, data) => {
    return async (dispatch) => {
        const response = await axios.post(`http://localhost:3001/api/order-list/${id}`, data);

        return dispatch({ type: UPDATED_ORDER, payload: response.data });
    }
}

export const filterByStatus = (value) => {
    return (dispatch) => {
        return dispatch({ type: FILTER_BY_STATUS, payload: value });
    }
}

export const deleteProduct = (id) => {
    return async (dispatch) => {
        await axios.delete(`http://localhost:3001/api/productos/${id}`);
        return dispatch({ type: DELETE_PRODUCT, payload: id });
    }
}

export const searchProducts = (wanted) => {
    return async (dispatch) => {
        return dispatch({ type: SEARCH_PRODUCTS, payload: wanted });
    }
}

export const setAdminCategory = (value) => {
    return (dispatch) => {
        return dispatch({ type: SET_ADMIN_CATEGORY, payload: value });
    }
}

export const adminFilterCategory = (filterValues) => {
    return (dispatch) => {
        return dispatch({ type: FILTER_CATEGORY_ADMIN, payload: filterValues })
    }
}

export const clearAdminFilter = () => {
    return (dispatch) => {
        return dispatch({ type: CLEAR_FILTER_ADMIN });
    }
}

export const clearStoreFilter = () => {
    return (dispatch) => {
        return dispatch({ type: CLEAR_FILTER_STORE });
    }
}

export const getStatisticsData = () => {
    return async (dispatch) => {
        const response = await axios.get("http://localhost:3001/api/statistics-data");

        return dispatch({ type: GET_STATISTICS_DATA, payload: response.data })
    }
}
//------------CREAR PRODUCTO--------------
export function createProduct(input){
    return async function(dispatch){
        const product=await axios.post("http://localhost:3001/api/productos/", input)
        return product
    }
}
export const editProduct = (id, brand,model,image,description,specs,benchmark,price,stock,category) => {
    return async  (dispatch) => {
        try {
            let response = await axios.put(`http://localhost:3001/api/productos/${id}`, {
                id, brand,model,image,description,specs,benchmark,price,stock,category})
                console.log(response.data)
                return dispatch({type: UPDATE_PRODUCT});
        } catch (error) {
            console.log(error)
        }
    }
}
export const setMessage = (message) => ({
    type: SET_MESSAGE,
    payload: message,
});

export const clearMessage = () => ({
    type: CLEAR_MESSAGE,
});

export const createReview = (data, productId) => {
    return async (dispatch) => {
        await axios.post(`http://localhost:3001/api/comentarios/${productId}`, data);
        return dispatch({ type: CREATE_REVIEW });
    }
}