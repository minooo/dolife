import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {routerReducer} from "react-router-redux";
import api from "../middleware/api";
import * as rootReducer from "../reducers";

export default (initialState) => {
  return createStore(
    combineReducers({
      ...rootReducer,
      routing: routerReducer
    }),
    initialState,
    applyMiddleware(thunkMiddleware, api)
  )
}