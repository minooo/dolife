import {
  SHOPS_FAIL, SHOPS_REQUEST, SHOPS_SUCCESS,
  FETCH_SHOPS_FAIL, FETCH_SHOPS_REQUEST, FETCH_SHOPS_SUCCESS,
  SHOP_JOIN_CONFIG_REQUEST, SHOP_JOIN_CONFIG_SUCCESS, SHOP_JOIN_CONFIG_FAIL
} from "actions/shop";
const initialState = {
  shops: [],
  isFetching: false,
  isMore: true,
  isRefreshing: false,
  filter: {
    limit: 10,
    sort: 'recommend'
  },
  join: {
    config: {
      isFetched: false
    }
  }
}
export default (state = initialState, action) => {
  switch (action.type) {
    case SHOPS_REQUEST:
      return Object.assign({}, state, {
        [action.fullName]: {
          isFetching: true
        }
      })
    case SHOPS_SUCCESS:
      return Object.assign({}, state, {
        [action.fullName]: {
          shops: action.response.shops || [],
          isFetching: false,
          isFetched: true
        }
      })
    case FETCH_SHOPS_REQUEST:
      return Object.assign({}, state, {
        filter: action.filter,
        isFetching: true,
        isRefreshing: action.isRefreshing,
      }, action.isRefreshing ? {
        shops: []
      } : {})
    case FETCH_SHOPS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isRefreshing: false,
        isMore: action.response.shops && action.response.shops.length >= action.filter.limit,
        shops: action.isRefreshing ? action.response.shops || [] : state.shops.concat(action.response.shops || []),
      })
    case SHOP_JOIN_CONFIG_SUCCESS:
      return Object.assign({}, state, {
        join: Object.assign({}, state.join, {
          config: {
            ...action.response.config,
            isFetched: true
          }
        })
      })
    default:
      return state
  }
}