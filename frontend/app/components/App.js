import React from 'react'
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem, Grid, Col } from 'react-bootstrap'

class App extends React.Component {
  render(){
    return <div >
        <Navbar fluid className="navbar-fixed-top navbar-background">
          <Link to={'/'}>
            <Navbar.Header>
              <img className="logo" src="/assets/images/knap.png"/>
            </Navbar.Header>
          </Link>
        </Navbar>
        <Grid >
          <Col md={12} className={'grid-background'}>
            <div className="margin-body">
              {this.props.children}
            </div>
          </Col>
        </Grid>
      </div>


  }
}

export default App
