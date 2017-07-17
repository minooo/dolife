import {CALL_API} from '../middleware/api'
export const ORDER_REQUEST = 'ORDER_REQUEST'
export const ORDER_SUCCESS = 'ORDER_SUCCESS'
export const ORDER_DONE = 'ORDER_DONE'

export const submitOrder = (endpoint, params) => ({
  [CALL_API]: {
    types: [ORDER_REQUEST, ORDER_SUCCESS, ORDER_DONE],
    endpoint: endpoint,
    body: params,
    method: 'POST'
  }
})
export const doneOrder = (order_id, status) => ({
  type: ORDER_DONE,
  order_id: order_id,
  status: status
})