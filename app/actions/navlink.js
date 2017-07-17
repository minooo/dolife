import {CALL_API} from "../middleware/api";
import * as cache from "../utils/cache";

export const NAVLINKS_REQUEST = 'NAVLINKS_REQUEST'
export const NAVLINKS_SUCCESS = 'NAVLINKS_SUCCESS'
export const NAVLINKS_FAIL = 'NAVLINKS_FAIL'

export const getNavLinks = (fullName) => (dispatch, getState) => {
  const repo = getState().navlink[fullName]
  if (repo && repo.isFetched) {
    return null
  }
  cache.get(`${fullName}_navlinks`) && dispatch({
    type: NAVLINKS_SUCCESS,
    response: cache.get(`${fullName}_navlinks`),
    fullName: fullName
  })
  const types = {index: 1, rim: 4}
  return dispatch({
    [CALL_API]: {
      types: [NAVLINKS_REQUEST, NAVLINKS_SUCCESS, NAVLINKS_FAIL],
      endpoint: `/navlink`,
      body: {
        typeid: types[fullName]
      }
    },
    fullName: fullName
  }).then(action => {
    action.response.code == 'SUCCESS' && cache.set(`${fullName}_navlinks`, action.response)
    return action
  })
}