import {
  CART_BUYING_ADD_DETAIL, CART_BUYING_SET_ADDRESS, CART_BUYING_SET_QUANTITY
} from "actions/cart/buying";

export default (state = {
  quantity: 1
}, action) => {
  switch (action.type) {
    case CART_BUYING_ADD_DETAIL:
      return Object.assign({}, state, {
        detail: action.buying
      })
    case CART_BUYING_SET_ADDRESS:
      return Object.assign({}, state, {
        address: action.address
      })
    case CART_BUYING_SET_QUANTITY:
      return Object.assign({}, state, {
        quantity: action.quantity
      })
    default:
      return state
  }
}