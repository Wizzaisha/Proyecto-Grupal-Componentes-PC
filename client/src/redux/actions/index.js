

export const ACTION_TEST = "ACTION_TEST";


export const actionTest = (message) => {
    return (dispatch) => {
        return dispatch({type: ACTION_TEST, payload: {message}})
    }
}