import {
  FILTERS_FAIL, FILTERS_REQUEST, FILTERS_SUCCESS
} from "actions/filter";
const initialState = {}
export default (state = initialState, action) => {
  switch (action.type) {
    case FILTERS_REQUEST:
      return Object.assign({}, state, {
        [action.fullName]: {
          isFetching: true
        }
      })
    case FILTERS_SUCCESS:
      return Object.assign({}, state, {
        [action.fullName]: {
          filters: action.response.filters || [],
          isFetching: false,
          isFetched: true
        }
      })
    default:
      return state
  }
}