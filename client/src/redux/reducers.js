import {
  ACTION_TEST
} from "../actions";

const initialState = {
  products: []
}

const rootReducer = (state = initialState, action) => {

  switch(action.type) {
      case ACTION_TEST:
          console.log(action.payload);
          break;

      default: 
          return {...state}
  }
}

export default rootReducer;