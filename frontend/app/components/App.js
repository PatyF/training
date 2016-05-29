import React from 'react'
import { Link } from 'react-router';
import ReactPlayer from 'react-player'

const App = ({ thunkExample }) => (
  <ReactPlayer
      url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
      playing={true}
    />
)

export default App
