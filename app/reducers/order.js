import {
  ORDER_REQUEST, ORDER_SUCCESS, ORDER_DONE
} from "actions/order";
const initialState = {}
export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case ORDER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        ...action.response
      })
    default:
      return state
  }
}