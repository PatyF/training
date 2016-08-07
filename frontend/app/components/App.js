import React from 'react'
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import ReactPlayer from 'react-player'

class App extends React.Component {
  // <ReactPlayer
  //     url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
  //     playing={true}
  //   />
  render(){
    return <div>
        <Navbar fluid className="navbar-fixed-top navbar-background">
          <Link to={'/'}>
            <Navbar.Header>
              <img className="logo" src="/assets/images/knap.png"/>
            </Navbar.Header>
          </Link>
        </Navbar>
        <div className="margin-body">
          {this.props.children}
        </div>
      </div>


  }
}

export default App
