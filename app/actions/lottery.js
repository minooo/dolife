import {CALL_API} from '../middleware/api'

export const LOTTERY_ONFIG_REQUEST = 'LOTTERY_CONFIG_REQUEST'
export const LOTTERY_CONFIG_SUCCESS = 'LOTTERY_CONFIG_SUCCESS'
export const LOTTERY_CONFIG_FAIL = 'LOTTERY_CONFIG_FAIL'

export const getConfig = () => {
  return {
    type: LOTTERY_CONFIG_SUCCESS,
    response: {
      rule: '活动规则活动规则活动规则活动规则活动规则',
    }
  }
  return {
    [CALL_API]: {
      types: [LOTTERY_CONFIG_REQUEST, LOTTERY_CONFIG_SUCCESS, LOTTERY_CONFIG_FAIL],
      endpoint: `/lottery/config`,
    }
  }
}