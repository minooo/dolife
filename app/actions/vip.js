import {CALL_API} from "../middleware/api";
export const VIP_REQUEST = 'VIP_REQUEST'
export const VIP_SUCCESS = 'VIP_SUCCESS'
export const VIP_FAIL = 'VIP_FAIL'

export const VIP_FETCH_BUYINGS_REQUEST = 'VIP_FETCH_BUYINGS_REQUEST'
export const VIP_FETCH_BUYINGS_SUCCESS = 'VIP_FETCH_BUYINGS_SUCCESS'
export const VIP_FETCH_BUYINGS_FAIL = 'VIP_FETCH_BUYINGS_FAIL'

export const VIP_FETCH_SHOPS_REQUEST = 'VIP_FETCH_SHOPS_REQUEST'
export const VIP_FETCH_SHOPS_SUCCESS = 'VIP_FETCH_SHOPS_SUCCESS'
export const VIP_FETCH_SHOPS_FAIL = 'VIP_FETCH_SHOPS_FAIL'

export const VIP_FETCH_GIFTS_REQUEST = 'VIP_FETCH_GIFTS_REQUEST'
export const VIP_FETCH_GIFTS_SUCCESS = 'VIP_FETCH_GIFTS_SUCCESS'
export const VIP_FETCH_GIFTS_FAIL = 'VIP_FETCH_GIFTS_FAIL'

export const VIP_SET_INVITE = 'VIP_SET_INVITE'

export const getVip = () => (dispatch, getState) => {
  const repo = getState().vip
  if (repo && repo.isFetching) {
    return null
  }
  return dispatch({
    [CALL_API]: {
      types: [VIP_REQUEST, VIP_SUCCESS, VIP_FAIL],
      endpoint: `/vip`
    }
  })
}
export const fetchBuyings = (filter) => (dispatch, getState) => {
  const {vip} = getState()
  filter = Object.assign({}, vip.buying.filter, filter)
  if ((!vip.buying.isMore && !filter.isRefreshing) || vip.buying.isFetching) {
    return null
  }
  return dispatch({
    isRefreshing: filter.isRefreshing,
    filter: filter,
    [CALL_API]: {
      types: [VIP_FETCH_BUYINGS_REQUEST, VIP_FETCH_BUYINGS_SUCCESS, VIP_FETCH_BUYINGS_FAIL],
      endpoint: `/vip/buyings`,
      body: filter
    }
  })
}
export const fetchShops = (filter) => (dispatch, getState) => {
  const {vip} = getState()
  filter = Object.assign({}, vip.shop.filter, filter)
  if ((!vip.shop.isMore && !filter.isRefreshing) || vip.shop.isFetching) {
    return null
  }
  return dispatch({
    isRefreshing: filter.isRefreshing,
    filter: filter,
    [CALL_API]: {
      types: [VIP_FETCH_SHOPS_REQUEST, VIP_FETCH_SHOPS_SUCCESS, VIP_FETCH_SHOPS_FAIL],
      endpoint: `/vip/shops`,
      body: filter
    }
  })
}
export const fetchGifts = (filter) => (dispatch, getState) => {
  const {vip} = getState()
  filter = Object.assign({}, vip.gift.filter, filter)
  if ((!vip.gift.isMore && !filter.isRefreshing) || vip.gift.isFetching) {
    return null
  }
  return dispatch({
    isRefreshing: filter.isRefreshing,
    filter: filter,
    [CALL_API]: {
      types: [VIP_FETCH_GIFTS_REQUEST, VIP_FETCH_GIFTS_SUCCESS, VIP_FETCH_GIFTS_FAIL],
      endpoint: `/vip/gifts`,
      body: filter
    }
  })
}
export const setInvite = (params) => ({
  type: VIP_SET_INVITE,
  params
})