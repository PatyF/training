import React from 'react'
// import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Link } from 'react-router';
import ReactPlayer from 'react-player';
import Courses from './Courses';

class App extends React.Component {
  // <ReactPlayer
  //     url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
  //     playing={true}
  //   />
  // getChildContext() {
  //   return { muiTheme: getMuiTheme(baseTheme) };
  // }
  render(){
    return <Courses />
  }
}

// App.childContextTypes = {
//     muiTheme: React.PropTypes.object.isRequired,
// };

export default App
