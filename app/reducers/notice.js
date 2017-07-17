import {
  NOTICES_REQUEST, NOTICES_SUCCESS
} from "actions/notice";
const initialState = {}
export default (state = initialState, action) => {
  switch (action.type) {
    case NOTICES_REQUEST:
      return Object.assign({}, state, {
        [action.fullName]: {
          isFetching: true
        }
      })
    case NOTICES_SUCCESS:
      return Object.assign({}, state, {
        [action.fullName]: {
          isFetching: false,
          notices: action.response.notices || [],
          isFetched: true
        }
      })
    default:
      return state
  }
}