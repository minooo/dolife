import {CALL_API} from "../middleware/api";

export const BUYINGS_REQUEST = 'BUYINGS_REQUEST'
export const BUYINGS_SUCCESS = 'BUYINGS_SUCCESS'
export const BUYINGS_FAIL = 'BUYINGS_FAIL'

export const FETCH_BUYINGS_REQUEST = 'FETCH_BUYINGS_REQUEST'
export const FETCH_BUYINGS_SUCCESS = 'FETCH_BUYINGS_SUCCESS'
export const FETCH_BUYINGS_FAIL = 'FETCH_BUYINGS_FAIL'

export const getBuyings = (filter = {}) => ({
  [CALL_API]: {
    types: [BUYINGS_REQUEST, BUYINGS_SUCCESS, BUYINGS_FAIL],
    endpoint: `/buying`,
    body: filter
  }
})
export const fetchBuyings = (filter) => (dispatch, getState) => {
  const {buying} = getState()
  filter = Object.assign(buying.filter, filter)
  if ((!buying.isMore && !filter.isRefreshing) || buying.isFetching) {
    return null
  }
  return dispatch({
    isRefreshing: filter.isRefreshing,
    filter: filter,
    [CALL_API]: {
      types: [FETCH_BUYINGS_REQUEST, FETCH_BUYINGS_SUCCESS, FETCH_BUYINGS_FAIL],
      endpoint: `/buying`,
      body: filter
    }
  })
}