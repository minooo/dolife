import {CALL_API} from "../middleware/api";
import * as cache from "../utils/cache";

export const NOTICES_REQUEST = 'NOTICES_REQUEST'
export const NOTICES_SUCCESS = 'NOTICES_SUCCESS'
export const NOTICES_FAIL = 'NOTICES_FAIL'

export const getNotices = (fullName) => (dispatch, getState) => {
  const repo = getState().notice[fullName]
  if (repo && repo.isFetched) {
    return null
  }
  cache.get(`${fullName}_notices`) && dispatch({
    type: NOTICES_SUCCESS,
    response: cache.get(`${fullName}_notices`),
    fullName: fullName
  })
  const types = {index: 1}
  return dispatch({
    [CALL_API]: {
      types: [NOTICES_REQUEST, NOTICES_SUCCESS, NOTICES_FAIL],
      endpoint: `/notice`,
      body: {typeid: types[fullName]}
    },
    fullName: fullName
  }).then(action => {
    action.response.code == 'SUCCESS' && cache.set(`${fullName}_notices`, action.response)
    return action
  })
}