import {
  REQUEST_COURSES, RECEIVE_COURSES
} from '../actions/course'

let data = [
  {
    "id": 2,
    "name": "xyz",
    "keywords": "x",
    "available": null,
    "created_at": "2016-05-28T22:04:08.000Z",
    "updated_at": "2016-05-28T22:04:08.000Z"
  },
  {
    "id": 3,
    "name": "React Components",
    "keywords": "react;facebook;views",
    "available": true,
    "created_at": "2016-05-29T11:56:23.000Z",
    "updated_at": "2016-05-29T11:56:23.000Z"
  },
  {
    "id": 4,
    "name": "HTML+CSS+JS",
    "keywords": "html;css;javascript",
    "available": true,
    "created_at": "2016-05-29T11:58:01.000Z",
    "updated_at": "2016-05-29T11:58:01.000Z"
  },
  {
    "id": 5,
    "name": "Ruby On Rails",
    "keywords": "ruby;rails;framework",
    "available": false,
    "created_at": "2016-05-29T11:58:44.000Z",
    "updated_at": "2016-05-29T11:58:44.000Z"
  }
];

export default (state = {
                  isFetching: false,
                  didInvalidate: false,
                  courses: []
                  },
                action) => {
  switch (action.type) {
    case REQUEST_COURSES:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_COURSES:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        courses: action.courses
      })
    default:
      return state
  }
}
