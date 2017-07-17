import 'isomorphic-fetch'
import {callApi, is_Android, setWxConfig} from 'utils'
export const CALL_API = Symbol('Call API')
export default store => next => action => {
  if (action.type == '@@router/LOCATION_CHANGE') {
    is_Android && setWxConfig()
    return next(action)
  }
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }
  let {endpoint} = callAPI
  const {types, body, method} = callAPI
  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }
  const actionWith = (data) => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }
  const [requestType, successType, failureType] = types
  next(actionWith({
    type: requestType
  }))
  return callApi(endpoint, body, method).then(response => next(actionWith({
    response,
    type: successType
  })), error => next(actionWith({
    type: failureType,
    error: error.message || 'Something bad happened'
  })))
}