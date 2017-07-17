import {CALL_API} from "../middleware/api";
import * as cache from "../utils/cache";
export const FOCUSS_REQUEST = 'FOCUSS_REQUEST'
export const FOCUSS_SUCCESS = 'FOCUSS_SUCCESS'
export const FOCUSS_FAIL = 'FOCUSS_FAIL'

export const getFocuss = (fullName) => (dispatch, getState) => {
  const repo = getState().focus[fullName]
  if (repo && repo.isFetched) {
    return null
  }
  cache.get(`${fullName}_focuss`) && dispatch({
    type: FOCUSS_SUCCESS,
    response: cache.get(`${fullName}_focuss`),
    fullName: fullName
  })
  const types = {index: 1, shop: 2, buying: 3}
  return dispatch({
    [CALL_API]: {
      types: [FOCUSS_REQUEST, FOCUSS_SUCCESS, FOCUSS_FAIL],
      endpoint: `/focus`,
      body: {
        typeid: types[fullName]
      }
    },
    fullName: fullName
  }).then(action => {
    action.response.code == 'SUCCESS' && cache.set(`${fullName}_focuss`, action.response)
    return action
  })
}