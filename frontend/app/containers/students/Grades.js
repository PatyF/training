import React from 'react'
import _ from 'lodash'
import { Panel, Grid, Row, Col, Table, ButtonToolbar, Button, PageHeader, Label } from 'react-bootstrap'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import Loading from '../../components/Loading'
import { getStudentCourses, getStudent } from '../../tools/api'


class Index extends React.Component {

  constructor() {
    super();
    this.state = { carregando: true, dados: [], student: '' }
  }

  componentDidMount() {
    getStudentCourses(this.props.params.studentId, json => {
      this.setState({
        dados: _.sortBy(json.grades, 'initial_date'),
        carregando: false
      })
    })
    getStudent(this.props.params.studentId, dados => {
      this.setState({
        student: dados.name
      })
    })
  }

  render() {
    return(
      <div>
        <Row>
          <PageHeader className='title-header'>
            Aluno: {this.state.student}
          </PageHeader>
        </Row>
        <Row className='header-modulo'>
          <Col md={4}>
            Curso
          </Col>
          <Col md={2}>
            Início
          </Col>
          <Col md={2}>
            Fim
          </Col>
          <Col md={1}>
            Vídeos
          </Col>
          <Col md={1}>
            Questões
          </Col>
          <Col md={2}>
            Nota
          </Col>
        </Row>
        {_.map(this.state.dados, (dado, index) =>
          <div  key={index}>
            <Row className={`body-modulo color-modulo${index%2+1}`}>
              <Col md={4}>
                {dado.name}
              </Col>
              <Col md={2}>
                {dado.initial_date}
              </Col>
              <Col md={2}>
                {dado.final_date}
              </Col>
              <Col md={1}>
                {dado.watched_videos}/{dado.number_videos}
              </Col>
              <Col md={1}>
                {dado.answered_activities}/{dado.number_activities}
              </Col>
              <Col md={2}>
                {dado.grade}
              </Col>
            </Row>
          </div>
        )}
      </div>
    )
  }

}

export default Index
