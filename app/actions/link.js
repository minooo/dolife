import {CALL_API} from "../middleware/api";
import * as cache from "../utils/cache";

export const LINKS_REQUEST = 'LINKS_REQUEST'
export const LINKS_SUCCESS = 'LINKS_SUCCESS'
export const LINKS_FAIL = 'LINKS_FAIL'

export const getLinks = (fullName) => (dispatch, getState) => {
  const repo = getState().link[fullName]
  if (repo && repo.isFetched) {
    return null
  }
  cache.get(`${fullName}_links`) && dispatch({
    type: LINKS_SUCCESS,
    response: cache.get(`${fullName}_links`),
    fullName: fullName
  })
  return dispatch({
    [CALL_API]: {
      types: [LINKS_REQUEST, LINKS_SUCCESS, LINKS_FAIL],
      endpoint: `/link`
    },
    fullName: fullName
  }).then(action => {
    action.response.code == 'SUCCESS' && cache.set(`${fullName}_links`, action.response)
    return action
  })
}