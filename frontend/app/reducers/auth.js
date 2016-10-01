import {
  PROFILE
} from '../actions/auth_action'

export default (state = {profile: -1}, action) => {
  switch (action.type) {
    case PROFILE:
      return {
        ...state,
        profile: action.profile
      }
    default:
      return state
  }
}
