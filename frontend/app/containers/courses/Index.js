import React from 'react'
import _ from 'lodash'
import { Panel, Grid, Row, Col, Table, ButtonToolbar, Button, PageHeader, Label } from 'react-bootstrap'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import Loading from '../../components/Loading'
import { getCourses } from '../../tools/api'


class Index extends React.Component {

  constructor() {
    super();
    this.state = { carregando: true, dados: [] }
  }

  componentDidMount() {
    getCourses(json => {
      this.setState({
        dados: _.sortBy(json, 'name'),
        carregando: false
      })
    })
  }

  render() {
    return(
      <div>
        <Col>
          <PageHeader className={'title-header'}>Cursos</PageHeader>
        </Col>
        <Loading carregando={this.state.carregando}>
          <Row >
            {_.map(this.state.dados, (course, idx) =>
                <Col key={idx} md={4} className={'box-curso'}>
                  <Link to={`/courses/view/${course.id}`}>
                    <Panel className={idx%2 ? 'box-height color1' : 'box-height color2' }>
                      <div className={'text'}>{course.name}</div>
                    </Panel>
                  </Link>
                </Col>
            )}
            <Col md={4} className={'box-curso'}>
              <Link to={'/courses/register'}>
                <Panel className={'box-curso color0'}>
                  <div className={'box-align'}>
                    <div className={'new-icon glyphicon glyphicon-plus'}></div>
                    <div className={'text'}>Adicionar Curso</div>
                  </div>
                </Panel>
              </Link>
            </Col>
          </Row>
        </Loading>
      </div>
    )
  }

}

export default Index
