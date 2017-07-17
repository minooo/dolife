import {
  CONFIG_REQUEST, CONFIG_SUCCESS,
  NOT_ANY_TIPS_FOLLOW
} from "actions/config";
import {cookie} from 'utils';

const initialState = {}
export default (state = initialState, action) => {
  switch (action.type) {
    case CONFIG_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case CONFIG_SUCCESS:
      if (cookie.get('not_tips_remind_follow')) {
        action.response.siteConfig.remind_follow = null
      }
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        ...action.response
      })
    case NOT_ANY_TIPS_FOLLOW:
      return Object.assign({}, state, {
        siteConfig: Object.assign({}, state.siteConfig, {
          remind_follow: null
        })
      })
    default:
      return state
  }
}