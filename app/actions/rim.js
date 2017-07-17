import {CALL_API} from "../middleware/api";

export const FETCH_RIMS_REQUEST = 'FETCH_RIMS_REQUEST'
export const FETCH_RIMS_SUCCESS = 'FETCH_RIMS_SUCCESS'
export const FETCH_RIMS_FAIL = 'FETCH_RIMS_FAIL'

export const fetchRims = (filter) => (dispatch, getState) => {
  const {rim} = getState()
  filter = Object.assign(rim.filter, filter)
  if ((!rim.isMore && !filter.isRefreshing) || rim.isFetching) {
    return null
  }
  return dispatch({
    isRefreshing: filter.isRefreshing,
    filter: filter,
    [CALL_API]: {
      types: [FETCH_RIMS_REQUEST, FETCH_RIMS_SUCCESS, FETCH_RIMS_FAIL],
      endpoint: `/rim`,
      body: filter
    }
  })
}