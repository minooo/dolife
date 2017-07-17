import {
  COUPONS_FAIL, COUPONS_REQUEST, COUPONS_SUCCESS,
  FETCH_COUPONS_FAIL, FETCH_COUPONS_REQUEST, FETCH_COUPONS_SUCCESS
} from "actions/coupon";

const initialState = {
  coupons: [],
  isFetching: false,
  isMore: true,
  isRefreshing: false,
  filter: {
    limit: 10
  }
}
export default (state = initialState, action) => {
  switch (action.type) {
    case COUPONS_REQUEST:
      return Object.assign({}, state, {
        [action.fullName]: {
          isFetching: true
        }
      })
    case COUPONS_SUCCESS:
      return Object.assign({}, state, {
        [action.fullName]: {
          coupons: action.response.coupons || [],
          isFetching: false,
          isFetched: true
        }
      })
    case FETCH_COUPONS_REQUEST:
      return Object.assign({}, state, {
        filter: action.filter,
        isFetching: true,
        isRefreshing: action.isRefreshing,
      }, action.isRefreshing ? {
        coupons: []
      } : {})
    case FETCH_COUPONS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isRefreshing: false,
        isMore: action.response.coupons && action.response.coupons.length >= action.filter.limit,
        coupons: action.isRefreshing ? action.response.coupons || [] : state.coupons.concat(action.response.coupons || []),
      })
    default:
      return state
  }
}