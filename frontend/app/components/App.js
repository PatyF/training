import React from 'react'
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem, Grid, Col, Button } from 'react-bootstrap'

class App extends React.Component {

  render(){
    return <div >
        <Navbar fluid className="navbar-fixed-top navbar-background">
          <Link to={'/'}>
            <Navbar.Header>
              <img className="logo" src="/assets/images/knap.png"/>
            </Navbar.Header>
          </Link>
          <Nav pullRight>
            <LinkContainer to={'/students'}><Button bsStyle="link">Alunos</Button></LinkContainer>
            <LinkContainer to={'/categories'}><Button bsStyle="link">Categorias</Button></LinkContainer>
            <LinkContainer to={'/courses'}><Button bsStyle="link">Cursos</Button></LinkContainer>
            <LinkContainer to={'/instructors'}><Button bsStyle="link">Instrutores</Button></LinkContainer>
            <LinkContainer to={'/login'}><Button bsStyle="link">Log out</Button></LinkContainer>

          </Nav>
        </Navbar>
          <div className={'grid-background'}>
            <div className="margin-body">
              {this.props.children}
            </div>
          </div>
      </div>


  }
}

export default App
