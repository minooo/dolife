import {
  FOCUSS_REQUEST, FOCUSS_SUCCESS
} from "actions/focus";
const initialState = {}
export default (state = initialState, action) => {
  switch (action.type) {
    case FOCUSS_REQUEST:
      return Object.assign({}, state, {
        [action.fullName]: {
          isFetching: true
        }
      })
    case FOCUSS_SUCCESS:
      return Object.assign({}, state, {
        [action.fullName]: {
          isFetching: false,
          focuss: action.response.focuss || [],
          isFetched: true
        }
      })
    default:
      return state
  }
}