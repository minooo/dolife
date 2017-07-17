import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {routerReducer} from "react-router-redux";
import api from "../middleware/api";
import * as rootReducer from "../reducers";

export default (initialState) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    combineReducers({
      ...rootReducer,
      routing: routerReducer
    }),
    initialState,
    composeEnhancers(
      applyMiddleware(thunkMiddleware, api)
    )
  )
}