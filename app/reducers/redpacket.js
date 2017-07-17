import {
  REDPACKETS_FAIL, REDPACKETS_REQUEST, REDPACKETS_SUCCESS,
  FETCH_REDPACKETS_FAIL, FETCH_REDPACKETS_REQUEST, FETCH_REDPACKETS_SUCCESS
} from "actions/coupon";

const initialState = {
  redpackets: [],
  isFetching: false,
  isMore: true,
  isRefreshing: false,
  filter: {
    limit: 10
  }
}
export default (state = initialState, action) => {
  switch (action.type) {
    case REDPACKETS_REQUEST:
      return Object.assign({}, state, {
        [action.fullName]: {
          isFetching: true
        }
      })
    case REDPACKETS_SUCCESS:
      return Object.assign({}, state, {
        [action.fullName]: {
          redpackets: action.response.redpackets || [],
          isFetching: false,
          isFetched: true
        }
      })
    case FETCH_REDPACKETS_REQUEST:
      return Object.assign({}, state, {
        filter: action.filter,
        isFetching: true,
        isRefreshing: action.isRefreshing,
      }, action.isRefreshing ? {
        redpackets: []
      } : {})
    case FETCH_REDPACKETS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isRefreshing: false,
        isMore: action.response.redpackets && action.response.redpackets.length >= action.filter.limit,
        redpackets: action.isRefreshing ? action.response.redpackets || [] : state.redpackets.concat(action.response.redpackets || []),
      })
    default:
      return state
  }
}