import {CALL_API} from "../middleware/api";
import * as cache from "../utils/cache";

export const COUPONS_REQUEST = 'COUPONS_REQUEST'
export const COUPONS_SUCCESS = 'COUPONS_SUCCESS'
export const COUPONS_FAIL = 'COUPONS_FAIL'

export const FETCH_COUPONS_REQUEST = 'FETCH_COUPONS_REQUEST'
export const FETCH_COUPONS_SUCCESS = 'FETCH_COUPONS_SUCCESS'
export const FETCH_COUPONS_FAIL = 'FETCH_COUPONS_FAIL'

export const getCoupons = (fullName, filter = {}) => (dispatch, getState) => {
  const repo = getState().coupon[fullName]
  if (repo && repo.isFetching) {
    return null
  }
  cache.get(`${fullName}_coupons`) && dispatch({
    type: COUPONS_SUCCESS,
    response: cache.get(`${fullName}_coupons`),
    fullName: fullName
  })
  return dispatch({
    [CALL_API]: {
      types: [COUPONS_REQUEST, COUPONS_SUCCESS, COUPONS_FAIL],
      endpoint: `/coupon`,
      body: filter
    },
    fullName: fullName
  }).then(action => {
    action.response.code == 'SUCCESS' && cache.set(`${fullName}_coupons`, action.response)
    return action
  })
}

export const fetchCoupons = (filter) => (dispatch, getState) => {
  const {coupon} = getState()
  filter = Object.assign(coupon.filter, filter)
  if ((!coupon.isMore && !filter.isRefreshing) || coupon.isFetching) {
    return null
  }
  return dispatch({
    isRefreshing: filter.isRefreshing,
    filter: filter,
    [CALL_API]: {
      types: [FETCH_COUPONS_REQUEST, FETCH_COUPONS_SUCCESS, FETCH_COUPONS_FAIL],
      endpoint: `/coupon`,
      body: filter
    }
  })
}