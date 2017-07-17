import {
  RIM_REQUEST, RIM_SUCCESS, RIM_FAIL,
  RIMS_REQUEST, RIMS_SUCCESS, RIMS_FAIL,
  FETCH_RIMS_REQUEST, FETCH_RIMS_SUCCESS, FETCH_RIMS_FAIL,
} from 'actions/rim';
const initialState = {
  rims: [],
  isFetching: false,
  isMore: true,
  isRefreshing: false,
  filter: {
    limit: 10
  }
}
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RIMS_REQUEST:
      return Object.assign({}, state, {
        filter: action.filter,
        isFetching: true,
        isRefreshing: action.isRefreshing,
      }, action.isRefreshing ? {
        rims: []
      } : {})
    case FETCH_RIMS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isRefreshing: false,
        isMore: action.response.rims && action.response.rims.length >= action.filter.limit,
        rims: action.isRefreshing ? action.response.rims || [] : state.rims.concat(action.response.rims || []),
      })
    default:
      return state
  }
}