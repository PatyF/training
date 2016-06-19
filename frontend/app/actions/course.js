import fetch from 'isomorphic-fetch'
export const REQUEST_COURSES = 'REQUEST_COURSES'
export const RECEIVE_COURSES = 'RECEIVE_COURSES'

export const requestCourses = () => (
  { type: REQUEST_COURSES }
)

export const receiveCourses = (json) => (
  {
    type: RECEIVE_COURSES,
    courses: json
  }
)

export function fetchCourses() {
  return function (dispatch) {
    dispatch(requestCourses())
    return fetch(`http://192.168.99.100:3000/courses.json`)
      .then(response => response.json())
      .then(json =>
        dispatch(receiveCourses(json))
      )
  }
}
