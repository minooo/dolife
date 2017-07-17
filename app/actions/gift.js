import {CALL_API} from "../middleware/api";

export const GIFT_REQUEST = 'GIFT_REQUEST'
export const GIFT_SUCCESS = 'GIFT_SUCCESS'
export const GIFT_FAIL = 'GIFT_FAIL'

export const FETCH_GIFTS_REQUEST = 'FETCH_GIFTS_REQUEST'
export const FETCH_GIFTS_SUCCESS = 'FETCH_GIFTS_SUCCESS'
export const FETCH_GIFTS_FAIL = 'FETCH_GIFTS_FAIL'

export const getGifts = (filter = {}) => ({
  [CALL_API]: {
    types: [GIFTS_REQUEST, GIFTS_SUCCESS, GIFTS_FAIL],
    endpoint: `/gift`,
    body: filter
  }
})

export const fetchGifts = (filter) => (dispatch, getState) => {
  const {gift} = getState()
  filter = Object.assign(gift.filter, filter)
  if ((!gift.isMore && !filter.isRefreshing) || gift.isFetching) {
    return null
  }
  return dispatch({
    isRefreshing: filter.isRefreshing,
    filter: filter,
    [CALL_API]: {
      types: [FETCH_GIFTS_REQUEST, FETCH_GIFTS_SUCCESS, FETCH_GIFTS_FAIL],
      endpoint: `/gift`,
      body: filter
    }
  })
}
