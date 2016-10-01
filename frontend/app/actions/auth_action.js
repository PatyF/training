import {
  getProfile,
  } from '../tools/api'
export const requestProfile = () => dispatch => {
  getProfile(profile => {
      dispatch(setProfile(profile))
    }
  )
}

export const PROFILE = 'PROFILE'
export const setProfile = (profile) => (
  { type: PROFILE, profile }
)
