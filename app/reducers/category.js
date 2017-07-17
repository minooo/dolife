import {
  CATEGORYS_FAIL, CATEGORYS_REQUEST, CATEGORYS_SUCCESS
} from "actions/category";
const initialState = {}
export default (state = initialState, action) => {
  switch (action.type) {
    case CATEGORYS_REQUEST:
      return Object.assign({}, state, {
        [action.fullName]: {
          isFetching: true
        }
      })
    case CATEGORYS_SUCCESS:
      return Object.assign({}, state, {
        [action.fullName]: {
          categorys: action.response.categorys || [],
          locals: action.response.locals || [],
          isFetching: false,
          isFetched: true
        }
      })
    default:
      return state
  }
}