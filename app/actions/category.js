import {CALL_API} from "../middleware/api";
import * as cache from "../utils/cache";

export const CATEGORYS_REQUEST = 'CATEGORYS_REQUEST'
export const CATEGORYS_SUCCESS = 'CATEGORYS_SUCCESS'
export const CATEGORYS_FAIL = 'CATEGORYS_FAIL'

export const getCategorys = (fullName) => (dispatch, getState) => {
  const repo = getState().category[fullName]
  if (repo && repo.isFetched) {
    return null
  }
  cache.get(`${fullName}_categorys`) && dispatch({
    type: CATEGORYS_SUCCESS,
    response: cache.get(`${fullName}_categorys`),
    fullName: fullName
  })
  const types = {coupon: 2, rim: 3}
  return dispatch({
    [CALL_API]: {
      types: [CATEGORYS_REQUEST, CATEGORYS_SUCCESS, CATEGORYS_FAIL],
      endpoint: `/category`,
      body: {
        typeid: types[fullName]
      }
    },
    fullName: fullName
  }).then(action => {
    action.response.code == 'SUCCESS' && cache.set(`${fullName}_categorys`, action.response)
    return action
  })
}