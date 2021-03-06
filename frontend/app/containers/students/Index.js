import React from 'react'
import _ from 'lodash'
import { Panel, Grid, Row, Col, Table, ButtonToolbar, Button, PageHeader, Label } from 'react-bootstrap'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import Loading from '../../components/Loading'
import { getStudents } from '../../tools/api'


class Index extends React.Component {

  constructor() {
    super();
    this.state = { carregando: true, dados: [] }
  }

  componentDidMount() {
    getStudents(json => {
      this.setState({
        dados: _.sortBy(json, 'name'),
        carregando: false
      })
    })
  }

  render() {
    return(
      <div>
        <Row>
          <PageHeader className='title-header'>
            Alunos
          </PageHeader>
        </Row>
        <Row className='header-modulo'>
          <Col md={6}>
            <span className="icon-modulo glyphicon glyphicon-user" aria-hidden="true"></span>
            Nome
          </Col>
          <Col md={5}>
            Email
          </Col>
          <Col md={1}>
          </Col>
        </Row>
        <Loading carregando={this.state.carregando}>
          { _.map(this.state.dados, (dado, idx) =>
            <div  key={idx}>
              <Row className={`body-modulo color-modulo${idx%2+1}`}>
                <Col md={5}>
                  {dado.name}
                </Col>
                <Col md={5}>
                  {dado.email}
                </Col>
                <Col md={1}>
                  <Link title="Aproveitamento Aluno" to={`/students/${dado.id}/grades`}><span className="icons sub-icon glyphicon glyphicon-dashboard"></span></Link>
                </Col>
                <Col md={1}>
                  <Link title="Editar Aluno" to={`/students/register/${dado.id}`}><span className="icons sub-icon glyphicon glyphicon-pencil"></span></Link>
                </Col>
              </Row>
              {dado.aberto ? this.exibeVideos(dado, idx) : null}
            </div>
          )}
        </Loading>
        <Link title="Novo Aluno" to={`/students/register`}>
          <Row className={`body-modulo color-modulo0`}>
            <Col md={8}>
              <Button bsStyle="link" className={`title-modulo`}>Adicionar Aluno</Button>
            </Col>
            <Col md={3}>
            </Col>
            <Col md={1}>
              <span className="icons sub-icon glyphicon glyphicon-plus"></span>
            </Col>
          </Row>
        </Link>
      </div>
    )
  }

}

export default Index
