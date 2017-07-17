import {
  BUYING_REQUEST, BUYING_SUCCESS, BUYING_FAIL,
  BUYINGS_REQUEST, BUYINGS_SUCCESS, BUYINGS_FAIL,
  FETCH_BUYINGS_REQUEST, FETCH_BUYINGS_SUCCESS, FETCH_BUYINGS_FAIL,
} from 'actions/buying';
const initialState = {
  buyings: [],
  isFetching: false,
  isMore: true,
  isRefreshing: false,
  filter: {
    typeid: 2,
    limit: 10
  }
}
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BUYINGS_REQUEST:
      return Object.assign({}, state, {
        filter: action.filter,
        isFetching: true,
        isRefreshing: action.isRefreshing,
      }, action.isRefreshing ? {
        buyings: []
      } : {})
    case FETCH_BUYINGS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isRefreshing: false,
        isMore: action.response.buyings && action.response.buyings.length >= action.filter.limit,
        buyings: action.isRefreshing ? action.response.buyings || [] : state.buyings.concat(action.response.buyings || []),
      })
    default:
      return state
  }
}