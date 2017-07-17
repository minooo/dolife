import {
  FETCH_GIFTS_REQUEST, FETCH_GIFTS_SUCCESS, FETCH_GIFTS_FAIL,
} from "actions/gift";
const initialState = {
  gifts: [],
  isFetching: false,
  isMore: true,
  isRefreshing: false,
  filter: {
    limit: 10
  }
}
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GIFTS_REQUEST:
      return Object.assign({}, state, {
        filter: action.filter,
        isFetching: true,
        isRefreshing: action.isRefreshing,
      }, action.isRefreshing ? {
        gifts: []
      } : {})
    case FETCH_GIFTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isRefreshing: false,
        isMore: action.response.gifts && action.response.gifts.length >= action.filter.limit,
        gifts: action.isRefreshing ? action.response.gifts || [] : state.gifts.concat(action.response.gifts || []),
      })
    default:
      return state
  }
}