import React from 'react'
import { connect } from 'react-redux'

import App from '../components/App'
import { requestProfile } from '../actions/auth_action'

let mapStateToProps = state => ({
  profile: state.auth.profile
})

let mapDispatchToProps = dispatch => ({
  requestProfile: () => dispatch(requestProfile())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
