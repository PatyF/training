import React from 'react'
// import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Link } from 'react-router';
import ReactPlayer from 'react-player';
import CoursesPage from '../containers/CoursesPage';

class App extends React.Component {
  // <ReactPlayer
  //     url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
  //     playing={true}
  //   />
  // getChildContext() {
  //   return { muiTheme: getMuiTheme(baseTheme) };
  // }
  render(){
    return <CoursesPage />
  }
}

// App.childContextTypes = {
//     muiTheme: React.PropTypes.object.isRequired,
// };

export default App
