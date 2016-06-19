import React from 'react'
import { connect } from 'react-redux'

import Courses from '../components/Courses'
import { fetchCourses } from '../actions/course'

const mapStateToProps = (state) => {
  return {
    courses: state.course.courses,
    isFetching: state.course.isFetching
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCourses: () => dispatch(fetchCourses())
})

export default connect(mapStateToProps, mapDispatchToProps)(Courses)

// const actions = bindActionCreators(actionCreators, dispatch);
//     return {
//         addItem: actions.addItem,
//         removeItem: actions.removeItem
//     };
