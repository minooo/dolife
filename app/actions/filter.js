import {CALL_API} from "../middleware/api";
import * as cache from "../utils/cache";

export const FILTERS_REQUEST = 'FILTERS_REQUEST'
export const FILTERS_SUCCESS = 'FILTERS_SUCCESS'
export const FILTERS_FAIL = 'FILTERS_FAIL'

export const getFilters = (fullName = 'shop') => (dispatch, getState) => {
  const repo = getState().filter[fullName]
  if (repo && repo.isFetched) {
    return null
  }
  cache.get(`${fullName}_filters`) && dispatch({
    type: FILTERS_SUCCESS,
    response: cache.get(`${fullName}_filters`),
    fullName: fullName
  })
  const types = {shop: 1, coupon: 2, gift: 5}
  return dispatch({
    [CALL_API]: {
      types: [FILTERS_REQUEST, FILTERS_SUCCESS, FILTERS_FAIL],
      endpoint: `/filter`,
      body: {
        typeid: types[fullName]
      }
    },
    fullName: fullName
  }).then(action => {
    action.response.code == 'SUCCESS' && cache.set(`${fullName}_filters`, action.response)
    return action
  })
}