import {
  NAVLINKS_REQUEST, NAVLINKS_SUCCESS
} from "actions/navlink";
const initialState = {}
export default (state = initialState, action) => {
  switch (action.type) {
    case NAVLINKS_REQUEST:
      return Object.assign({}, state, {
        [action.fullName]: {
          isFetching: true
        }
      })
    case NAVLINKS_SUCCESS:
      return Object.assign({}, state, {
        [action.fullName]: {
          isFetching: false,
          navlinks: action.response.navlinks || [],
          isFetched: true
        }
      })
    default:
      return state
  }
}