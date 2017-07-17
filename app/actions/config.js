import {CALL_API} from '../middleware/api'
// import {cookie} from '../utils';

export const CONFIG_REQUEST = 'CONFIG_REQUEST'
export const CONFIG_SUCCESS = 'CONFIG_SUCCESS'
export const CONFIG_FAIL = 'CONFIG_FAIL'

export const NOT_ANY_TIPS_FOLLOW = 'NOT_ANY_TIPS_FOLLOW'

export const getConfig = () => ({
  [CALL_API]: {
    types: [CONFIG_REQUEST, CONFIG_SUCCESS, CONFIG_FAIL],
    endpoint: `/config`,
  }
})
export const notAnyTipsFollow = () => (dispatch, getState) => {
  // cookie.set('not_tips_remind_follow',true,Infinity);
  return dispatch({
    type: NOT_ANY_TIPS_FOLLOW
  })
}