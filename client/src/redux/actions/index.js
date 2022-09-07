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
export const GET_USER_PRODUCTS = "GET_USER_PRODUCTS";
export const UPDATE_REVIEW = "UPDATE_REVIEW";
export const CREATE_QUESTION = "CREATE_QUESTION";
export const RESPONSE_QUESTION = "RESPONSE_QUESTION";
export const GET_QUESTION = "GET_QUESTION";

export const getAllProducts = () => {
    return async (dispatch) => {
        const response = await axios.get("https://henryhardware.herokuapp.com/api/productos");

        return dispatch({ type: GET_ALL_PRODUCTS, payload: response.data });
    }
}


export const getAllCategories = () => {
    return async (dispatch) => {
        const response = await axios.get("https://henryhardware.herokuapp.com/api/categorias");

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
        const response = await axios.get(`https://henryhardware.herokuapp.com/api/productos/${payload}`);

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
            let response = await axios.post(`https://henryhardware.herokuapp.com/LogIn`, {
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
            let response = await axios.post(`https://henryhardware.herokuapp.com/singin`, {
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

        const response = await axios.get("https://henryhardware.herokuapp.com/api/order-list");

        return dispatch({ type: GET_ALL_ORDERS, payload: response.data });
    }
}

export const getOrderDetails = (id) => {
    return async (dispatch) => {
        const response = await axios.get(`https://henryhardware.herokuapp.com/api/order-list/${id}`);

        return dispatch({ type: GET_ORDER_DETAILS, payload: response.data });
    }
}

export const getCustomerHistory = (id) => {
    return async (dispatch) => {
        const response = await axios.get(`https://henryhardware.herokuapp.com/api/order-list/customer/${id}`);

        return dispatch({ type: GET_CUSTOMER_HISTORY, payload: response.data });
    }
}

export const updateOrder = (id, data) => {
    return async (dispatch) => {
        const response = await axios.post(`https://henryhardware.herokuapp.com/api/order-list/${id}`, data);

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
        await axios.delete(`https://henryhardware.herokuapp.com/api/productos/${id}`);
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
        const response = await axios.get("https://henryhardware.herokuapp.com/api/statistics-data");

        return dispatch({ type: GET_STATISTICS_DATA, payload: response.data })
    }
}
//------------CREAR PRODUCTO--------------
export function createProduct(input){
    return async function(dispatch){
        const product=await axios.post("https://henryhardware.herokuapp.com/api/productos/", input)
        return product
    }
}
export const editProduct = (id, input) => {
    return async  (dispatch) => {
        try {
            let response = await axios.put(`https://henryhardware.herokuapp.com/api/productos/${id}`,input)
                console.log(response.data)
                dispatch(getAllProducts())
                dispatch(getAllCategories())
                dispatch({type: UPDATE_PRODUCT});
                return response.data;
        } catch (error) {
            console.log(error)
        }
    }
}
//------------CREAR PREGUNTA--------------
export const createQuestion = (id,input) => {
    return async  (dispatch) => {
        try {
            let response = await axios.post(`https://henryhardware.herokuapp.com/api/question/user/${id}`,input)
                console.log(response.data)
                   dispatch({type: CREATE_QUESTION});
                return response.data;
        } catch (error) {
            console.log(error)
        }
    }
}
//------------CREAR RESPUESTA--------------
export const responseQuestion = (id,input) => {
    return async  (dispatch) => {
        try {
            let response = await axios.put(`https://henryhardware.herokuapp.com/api/question/admin/${id}`,input)
                console.log(response.data)
                   dispatch({type: RESPONSE_QUESTION});
                return response.data;
        } catch (error) {
            console.log(error)
        }
    }
}

//------------OBTENER COMENTARIOS POR PRODUCTO--------------
export const getQuestion = (id) => {
    return async  (dispatch) => {
        try {
            let response = await axios.get(`https://henryhardware.herokuapp.com/api/question/${id}`)
                console.log(response.data)
                   dispatch({type: GET_QUESTION , payload: response.data});
                
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
        const response = await axios.post(`https://henryhardware.herokuapp.com/api/reviews/${productId}`, data);
        return dispatch({ type: CREATE_REVIEW, payload: response.data});
    }
}

export const getUserProdutcs = (email) => {
    return async (dispatch) => {
        const response = await axios.get(`https://henryhardware.herokuapp.com/api/reviews/${email}`);
        return dispatch({ type: GET_USER_PRODUCTS, payload: response.data });
    }
}

export const updateReview = (data, idReview) => {
    return async (dispatch) => {
        const response = await axios.put(`https://henryhardware.herokuapp.com/api/reviews/${idReview}`, data);
        return dispatch({ type: UPDATE_REVIEW, payload: response.data});
    }
}