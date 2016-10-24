import React from 'react'
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem, Grid, Col, Button } from 'react-bootstrap'
import { PROFILE_ADMIN, PROFILE_INSTRUCTOR, PROFILE_STUDENT } from '../tools/profiles'
import Authorize from '../components/Authorize'

class App extends React.Component {

  componentDidMount() {
    this.props.requestProfile()
  }

  render(){
    return <div >
        <Navbar fluid className="navbar-fixed-top navbar-background">
          <Link to={'/'}>
            <Navbar.Header>
              <img className="logo" src="/assets/images/knap.png"/>
            </Navbar.Header>
          </Link>
          <Nav pullRight><LinkContainer to={'/login'}><Button bsStyle="link">Log out</Button></LinkContainer></Nav>
          <Authorize viewFor={PROFILE_ADMIN}><Nav pullRight><LinkContainer to={'/instructors'}><Button bsStyle="link">Instrutores</Button></LinkContainer></Nav></Authorize>
          <Nav pullRight><LinkContainer to={'/courses'}><Button bsStyle="link">Cursos</Button></LinkContainer></Nav>
          <Authorize viewFor={PROFILE_ADMIN}><Nav pullRight><LinkContainer to={'/categories'}><Button bsStyle="link">Categorias</Button></LinkContainer></Nav></Authorize>
          <Authorize viewFor={PROFILE_ADMIN}><Nav pullRight><LinkContainer to={'/students'}><Button bsStyle="link">Alunos</Button></LinkContainer></Nav></Authorize>
        </Navbar>
        <div className="margin-body">
          {this.props.children}
        </div>
      </div>
  }
}

export default App
