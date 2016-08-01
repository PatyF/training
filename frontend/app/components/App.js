import React from 'react'
import { Link } from 'react-router';
import ReactPlayer from 'react-player';

class App extends React.Component {
  // <ReactPlayer
  //     url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
  //     playing={true}
  //   />
  render(){
    return <div>
      {this.props.children}
    </div>
  }
}

export default App
