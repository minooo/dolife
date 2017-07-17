import {
  CASHIER_DISCOUNT_FAIL, CASHIER_DISCOUNT_REQUEST, CASHIER_DISCOUNT_SUCCESS,
  CASHIER_SET,
} from "actions/cashier";
const initialState = {
  shop_id: 0,
  total_fee: 0.0,
  cash_fee: 0.0,
  redpacket: null,
  discount: {
    coupons: [],
    redpackets: []
  },
  real_fee: 0.0
}
export default (state = initialState, action) => {
  switch (action.type) {
    case CASHIER_SET:
      return Object.assign({}, state, action)
    case CASHIER_DISCOUNT_SUCCESS:
      return Object.assign({}, state, {
        discount: Object.assign({}, state.discount, action.response.discount),
        cash_fee: parseFloat(action.response.discount.cash_fee)
      })
    default:
      return state
  }
}