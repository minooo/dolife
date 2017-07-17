import {combineReducers} from "redux";
import {
  LOTTERY_CONFIG_FAIL, LOTTERY_CONFIG_REQUEST, LOTTERY_CONFIG_SUCCESS
} from "actions/lottery";
const config = (state = {
  isFetching: false,
  isFetchied: false
}, action) => {
  switch (action.type) {
    case LOTTERY_CONFIG_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case LOTTERY_CONFIG_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        ...action.response
      })
    default:
      return state
  }
}

export default combineReducers({
  config,
})