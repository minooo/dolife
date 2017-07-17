import {CALL_API} from "../middleware/api";
import * as cache from "../utils/cache";

export const REDPACKETS_REQUEST = 'REDPACKETS_REQUEST'
export const REDPACKETS_SUCCESS = 'REDPACKETS_SUCCESS'
export const REDPACKETS_FAIL = 'REDPACKETS_FAIL'

export const FETCH_REDPACKETS_REQUEST = 'FETCH_REDPACKETS_REQUEST'
export const FETCH_REDPACKETS_SUCCESS = 'FETCH_REDPACKETS_SUCCESS'
export const FETCH_REDPACKETS_FAIL = 'FETCH_REDPACKETS_FAIL'

export const getRedpackets = (fullName, filter = {}) => (dispatch, getState) => {
  const repo = getState().coupon[fullName]
  if (repo && repo.isFetchec) {
    return null
  }
  cache.get(`${fullName}_redpackets`) && dispatch({
    type: REDPACKETS_SUCCESS,
    response: cache.get(`${fullName}_redpackets`),
    fullName: fullName
  })
  return dispatch({
    [CALL_API]: {
      types: [REDPACKETS_REQUEST, REDPACKETS_SUCCESS, REDPACKETS_FAIL],
      endpoint: `/redpacket`,
      body: filter
    },
    fullName: fullName
  }).then(action => {
    action.response.code == 'SUCCESS' && cache.set(`${fullName}_redpackets`, action.response)
    return action
  })
}

export const fetchRedpackets = (filter) => (dispatch, getState) => {
  const {redpacket} = getState()
  filter = Object.assign(redpacket.filter, filter)
  if ((!redpacket.isMore && !filter.isRefreshing) || redpacket.isFetching) {
    return null
  }
  return dispatch({
    isRefreshing: filter.isRefreshing,
    filter: filter,
    [CALL_API]: {
      types: [FETCH_REDPACKETS_REQUEST, FETCH_REDPACKETS_SUCCESS, FETCH_REDPACKETS_FAIL],
      endpoint: `/redpacket`,
      body: filter
    }
  })
}