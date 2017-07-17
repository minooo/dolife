import {CALL_API} from "../middleware/api";

export const CASHIER_SET = 'CASHIER_SET'
export const CASHIER_DISCOUNT_REQUEST = 'CASHIER_DISCOUNT_REQUEST'
export const CASHIER_DISCOUNT_SUCCESS = 'CASHIER_DISCOUNT_SUCCESS'
export const CASHIER_DISCOUNT_FAIL = 'CASHIER_DISCOUNT_FAIL'

export const setCashier = (params) => ({
  type: CASHIER_SET,
  ...params
})
export const discount = (shopid, params, isShow = false) => ({
  [CALL_API]: {
    types: [CASHIER_DISCOUNT_REQUEST, CASHIER_DISCOUNT_SUCCESS, CASHIER_DISCOUNT_FAIL],
    endpoint: `/shop/cashier/${shopid}/discount`,
    body: Object.assign({}, {
      fee: params.total_fee,
      real_fee: params.real_fee,
      redpacket_id: (isShow && params.redpacket) ? params.redpacket.id : 0,
      coupon_id: (isShow && params.coupon) ? params.coupon.id : 0,
    }),
    method: 'POST'
  }
})