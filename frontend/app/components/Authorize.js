import React from 'react'
import { connect } from 'react-redux'
import { PROFILE_ADMIN, PROFILE_INSTRUCTOR, PROFILE_STUDENT } from '../tools/profiles'


class Authorize extends React.Component {
  render() {
    return this.props.profile === this.props.viewFor
      ? this.props.children
      : null
  }
}

let mapStateToProps = state => ({
  profile: state.auth.profile.profile
})

export default connect(mapStateToProps)(Authorize)
