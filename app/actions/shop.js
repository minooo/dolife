import {CALL_API} from "../middleware/api";
import * as cache from "../utils/cache";

export const SHOPS_REQUEST = 'SHOPS_REQUEST'
export const SHOPS_SUCCESS = 'SHOPS_SUCCESS'
export const SHOPS_FAIL = 'SHOPS_FAIL'

export const FETCH_SHOPS_REQUEST = 'FETCH_SHOPS_REQUEST'
export const FETCH_SHOPS_SUCCESS = 'FETCH_SHOPS_SUCCESS'
export const FETCH_SHOPS_FAIL = 'FETCH_SHOPS_FAIL'

export const SHOP_JOIN_CONFIG_REQUEST = 'SHOP_JOIN_CONFIG_REQUEST'
export const SHOP_JOIN_CONFIG_SUCCESS = 'SHOP_JOIN_CONFIG_SUCCESS'
export const SHOP_JOIN_CONFIG_FAIL = 'SHOP_JOIN_CONFIG_FAIL'


export const getShops = (fullName, filter = {}, endpoint = '/shop') => (dispatch, getState) => {
  const repo = getState().shop[fullName]
  if (repo && repo.isFetched) {
    return null
  }
  cache.get(`${fullName}_shops`) && dispatch({
    type: SHOPS_SUCCESS,
    response: cache.get(`${fullName}_shops`),
    fullName: fullName
  })
  return dispatch({
    [CALL_API]: {
      types: [SHOPS_REQUEST, SHOPS_SUCCESS, SHOPS_FAIL],
      endpoint: endpoint,
      body: filter
    },
    fullName: fullName
  }).then(action => {
    action.response.code == 'SUCCESS' && cache.set(`${fullName}_shops`, action.response)
    return action
  })
}
export const fetchShops = (filter) => (dispatch, getState) => {
  const {shop} = getState()
  filter = Object.assign(shop.filter, filter)
  if ((!shop.isMore && !filter.isRefreshing) || shop.isFetching) {
    return null
  }
  return dispatch({
    isRefreshing: filter.isRefreshing,
    filter: filter,
    [CALL_API]: {
      types: [FETCH_SHOPS_REQUEST, FETCH_SHOPS_SUCCESS, FETCH_SHOPS_FAIL],
      endpoint: `/shop`,
      body: filter
    }
  })
}
export const getJoinConfig = () => (dispatch, getState) => {
  const repo = getState().shop.join.config
  if (repo && repo.isFetched) {
    return null
  }
  return dispatch({
    [CALL_API]: {
      types: [SHOP_JOIN_CONFIG_REQUEST, SHOP_JOIN_CONFIG_SUCCESS, SHOP_JOIN_CONFIG_FAIL],
      endpoint: `/shop/join/config`
    }
  })
}