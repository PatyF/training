import {
  GET_COURSES
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

export default (state = {courses: data}, action) => {
  switch (action.type) {
    case GET_COURSES:
      return {
        ...state,
        courses: action.courses
      }
    default:
      return state
  }
}
