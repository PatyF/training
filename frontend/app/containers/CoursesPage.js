import React from 'react'
import { connect } from 'react-redux'

import Courses from '../components/Courses'
import { thunkExample } from '../actions/course'

const mapStateToProps = (state) => {
  return {
    courses: state.course.courses
  }
}

const mapDispatchToProps = dispatch => ({
  thunkExample: () => dispatch(thunkExample())
})

export default connect(mapStateToProps, mapDispatchToProps)(Courses)
