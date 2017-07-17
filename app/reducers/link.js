import {
  LINKS_REQUEST, LINKS_SUCCESS
} from "actions/link";
const initialState = {}
export default (state = initialState, action) => {
  switch (action.type) {
    case LINKS_REQUEST:
      return Object.assign({}, state, {
        [action.fullName]: {
          isFetching: true
        }
      })
    case LINKS_SUCCESS:
      return Object.assign({}, state, {
        [action.fullName]: {
          isFetching: false,
          links: action.response.links || [],
          isFetched: true
        }
      })
    default:
      return state
  }
}