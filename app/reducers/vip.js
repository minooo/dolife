import {
  VIP_FAIL, VIP_REQUEST, VIP_SUCCESS,
  VIP_FETCH_BUYINGS_REQUEST, VIP_FETCH_BUYINGS_SUCCESS, VIP_FETCH_BUYINGS_FAIL,
  VIP_FETCH_SHOPS_FAIL, VIP_FETCH_SHOPS_REQUEST, VIP_FETCH_SHOPS_SUCCESS,
  VIP_FETCH_GIFTS_REQUEST, VIP_FETCH_GIFTS_SUCCESS, VIP_FETCH_GIFTS_FAIL,
  VIP_SET_INVITE
} from "actions/vip";
const initialState = {
  isFetching: false,
  buying: {
    buyings: [],
    isFetching: false,
    isMore: true,
    isRefreshing: false,
    filter: {
      limit: 10
    }
  },
  shop: {
    shops: [],
    isFetching: false,
    isMore: true,
    isRefreshing: false,
    filter: {
      limit: 10
    }
  },
  gift: {
    gifts: [],
    isFetching: false,
    isMore: true,
    isRefreshing: false,
    filter: {
      limit: 10
    }
  },
  invite: {
    invite_from: 0,
    invite_from_id: 0
  }
}
export default (state = initialState, action) => {
  switch (action.type) {
    case VIP_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case VIP_SUCCESS:
      return Object.assign({}, state, {
        ...action.response.data,
        isOpen: action.response.code == 'SUCCESS',
        isFetching: false,
        isFetched: true
      })
    case VIP_FETCH_BUYINGS_REQUEST:
      return Object.assign({}, state, {
        buying: Object.assign({}, state.buying, {
          filter: action.filter,
          isFetching: true,
          isRefreshing: action.isRefreshing,
        }, action.isRefreshing ? {
          buyings: []
        } : {})
      })
    case VIP_FETCH_BUYINGS_SUCCESS:
      return Object.assign({}, state, {
        buying: Object.assign({}, state.buying, {
          isFetching: false,
          isRefreshing: false,
          isMore: action.response.buyings && action.response.buyings.length >= action.filter.limit,
          buyings: action.isRefreshing ? action.response.buyings || [] : state.buying.buyings.concat(action.response.buyings || []),
        })
      })
    case VIP_FETCH_SHOPS_REQUEST:
      return Object.assign({}, state, {
        shop: Object.assign({}, state.shop, {
          filter: action.filter,
          isFetching: true,
          isRefreshing: action.isRefreshing,
        }, action.isRefreshing ? {
          shops: []
        } : {})
      })
    case VIP_FETCH_SHOPS_SUCCESS:
      return Object.assign({}, state, {
        shop: Object.assign({}, state.shop, {
          isFetching: false,
          isRefreshing: false,
          isMore: action.response.shops && action.response.shops.length >= action.filter.limit,
          shops: action.isRefreshing ? action.response.shops || [] : state.shop.shops.concat(action.response.shops || []),
        })
      })
    case VIP_FETCH_GIFTS_REQUEST:
      return Object.assign({}, state, {
        gift: Object.assign({}, state.gift, {
          filter: action.filter,
          isFetching: true,
          isRefreshing: action.isRefreshing,
        }, action.isRefreshing ? {
          gifts: []
        } : {})
      })
    case VIP_FETCH_GIFTS_SUCCESS:
      return Object.assign({}, state, {
        gift: Object.assign({}, state.gift, {
          isFetching: false,
          isRefreshing: false,
          isMore: action.response.gifts && action.response.gifts.length >= action.filter.limit,
          gifts: action.isRefreshing ? action.response.gifts || [] : state.gift.gifts.concat(action.response.gifts || []),
        })
      })
    case VIP_SET_INVITE:
      return Object.assign({}, state, {
        invite: Object.assign({}, state.invite, action.params)
      })
    default:
      return state
  }
}