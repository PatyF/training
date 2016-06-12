export const GET_COURSES = 'GET_COURSES'

export const thunkExample = () => {
  return (dispatch, getState) => {
    dispatch(example())
  }
}

export const example = () => (
  { type: GET_COURSES }
)
