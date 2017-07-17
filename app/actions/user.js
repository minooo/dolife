import {CALL_API} from "../middleware/api";
import * as wx from "../utils/wxapi";

export const USER_REQUEST = 'USER_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAIL = 'USER_FAIL'

export const SET_LOCATION_REQUEST = 'SET_LOCATION_REQUEST'
export const SET_LOCATION_SUCCESS = 'SET_LOCATION_SUCCESS'
export const SET_LOCATION_FAIL = 'SET_LOCATION_FAIL'

export const USER_INCREASE_CREDIT = 'USER_INCREASE_CREDIT'

export const USER_SET_MOBILE = 'USER_SET_MOBILE'

export const USER_SIGN_REQUEST = 'USER_SIGN_REQUEST'
export const USER_SIGN_SUCCESS = 'USER_SIGN_SUCCESS'
export const USER_SIGN_FAIL = 'USER_SIGN_FAIL'

export const USER_WEAL_REQUEST = 'USER_WEAL_REQUEST'
export const USER_WEAL_SUCCESS = 'USER_WEAL_SUCCESS'
export const USER_WEAL_FAIL = 'USER_WEAL_FAIL'

export const USER_INCREASE_MONEY = 'USER_INCREASE_MONEY'

export const USER_SET_PROFILE = 'USER_SET_PROFILE'

export const getUser = () => ({
  [CALL_API]: {
    types: [USER_REQUEST, USER_SUCCESS, USER_FAIL],
    endpoint: `/user`
  }
})
export const getWeal = () => ({
  [CALL_API]: {
    types: [USER_WEAL_REQUEST, USER_WEAL_SUCCESS, USER_WEAL_FAIL],
    endpoint: `/user/weal`
  }
})
export const sign = () => (dispatch, getState) => {
  const user = getState().user
  if (user.is_sign) {
    return null
  }
  return dispatch({
    [CALL_API]: {
      types: [USER_SIGN_REQUEST, USER_SIGN_SUCCESS, USER_SIGN_FAIL],
      endpoint: `/user/sign`
    }
  })
}
export const updateLocation = () => (dispatch, getState) => {
  return wx.getLocation().then(res => {
    return dispatch({
      [CALL_API]: {
        types: [SET_LOCATION_REQUEST, SET_LOCATION_SUCCESS, SET_LOCATION_FAIL],
        endpoint: `/user/location`,
        body: {
          lng: res.longitude,
          lat: res.latitude
        },
        method: 'PUT'
      }
    })
  })
}
export const increaseCredit = (credit) => ({
  type: USER_INCREASE_CREDIT,
  credit: credit
})
export const setMobile = (mobile) => ({
  type: USER_SET_MOBILE,
  mobile: mobile
})
export const increaseMoney = (money) => ({
  type: USER_INCREASE_MONEY,
  money: money
})
export const setProfile = (profile) => ({
  type: USER_SET_PROFILE,
  profile
})