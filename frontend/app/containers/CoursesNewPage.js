import React from 'react'
import { connect } from 'react-redux'

import CoursesNew from '../components/CoursesNew'
import { fetchCourses } from '../actions/course'

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = dispatch => ({
  coursesNew: () => dispatch(fetchNewCourse())
})

export default connect(mapStateToProps, mapDispatchToProps)(CoursesNew)
