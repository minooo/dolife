export const CART_BUYING_ADD_DETAIL = 'CART_BUYING_ADD_DETAIL'
export const CART_BUYING_SET_ADDRESS = 'CART_BUYING_SET_ADDRESS'
export const CART_BUYING_SET_QUANTITY = 'CART_BUYING_SET_QUANTITY'

export const setDetail = (buying) => ({
  type: CART_BUYING_ADD_DETAIL,
  buying: buying
})
export const setQuantity = (quantity) => ({
  type: CART_BUYING_SET_QUANTITY,
  quantity: quantity
})
export const setAddress = (address) => ({
  type: CART_BUYING_SET_ADDRESS,
  address: address
})