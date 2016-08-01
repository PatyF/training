import {
  REQUEST_COURSES, RECEIVE_COURSES
} from '../actions/course'

export default (state = { isFetching: false, didInvalidate: false, courses: [] }, action) => {
  switch (action.type) {
    case REQUEST_COURSES:
      return { ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_COURSES:
      return { ...state,
        isFetching: false,
        didInvalidate: false,
        courses: action.courses
      }
    default:
      return state
  }
}
