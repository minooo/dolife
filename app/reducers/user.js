import {
  SET_LOCATION_FAIL, SET_LOCATION_REQUEST, SET_LOCATION_SUCCESS,
  USER_FAIL, USER_INCREASE_CREDIT, USER_REQUEST, USER_SET_MOBILE,
  USER_SUCCESS,
  USER_SIGN_REQUEST, USER_SIGN_SUCCESS, USER_SIGN_FAIL,
  USER_WEAL_REQUEST, USER_WEAL_SUCCESS, USER_WEAL_FAIL,
  USER_INCREASE_MONEY,
  USER_SET_PROFILE
} from "actions/user";
import {
  ORDER_SUCCESS, ORDER_DONE
} from 'actions/order';
const initialState = {
  isLogin: false,
  isFetching: false,
  signFetching: false,
  weal: {
    redpacket: {
      money: {
        total: 0
      },
      consume: {
        total: 0,
        used: 0,
        count: {}
      }
    },
    coupon: {
      count: {},
      money: {}
    }
  }
}
export default (state = initialState, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        isLogin: action.response.code == 'SUCCESS',
        auth: action.response.auth,
        token: action.response.token,
        ...action.response.user
      }, {
        // is_vip:true
      })
    case USER_WEAL_SUCCESS:
      return Object.assign({}, state, {
        weal: action.response.weal
      })
    case SET_LOCATION_SUCCESS:
      return Object.assign({}, state, {
        ...state.user,
        location: action.options.body
      })
    case USER_INCREASE_CREDIT:
      return Object.assign({}, state, {
        ...state.user,
        credit: parseFloat(state.credit) + parseFloat(action.credit)
      })
    case USER_SET_MOBILE:
      return Object.assign({}, state, {
        ...state.user,
        mobile: action.mobile
      })
    case USER_SIGN_REQUEST:
      return Object.assign({}, state, {
        signFetching: true,
      })
    case USER_SIGN_SUCCESS:
      return Object.assign({}, state, {
        signFetching: false,
        is_sign: true,
        credit: parseFloat(state.credit) + parseFloat(action.response.credit)
      })
    case ORDER_SUCCESS:
      return Object.assign({}, state, {
        order: Object.assign({}, state.order, {
          pay: parseInt(state.order.pay) + 1
        })
      })
    case ORDER_DONE:
      return Object.assign({}, state, {
        order: Object.assign({}, state.order, {
          pay: parseInt(state.order.pay) - 1
        })
      })
    case USER_INCREASE_MONEY:
      return Object.assign({}, state, {
        finance: Object.assign({}, state.finance, {
          money: parseFloat(state.finance.money || 0) + parseFloat(action.money || 0)
        })
      })
    case USER_SET_PROFILE:
      return Object.assign({}, state, action.profile)
    default:
      return state
  }
}