import React from 'react'
import _ from 'lodash'
import { Panel, Grid, Row, Col, Table, ButtonToolbar, Button, PageHeader, Label } from 'react-bootstrap'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import Loading from '../../components/Loading'
import { getCourses } from '../../tools/api'
import Authorize from '../../components/Authorize'
import { PROFILE_ADMIN, PROFILE_INSTRUCTOR, PROFILE_STUDENT } from '../../tools/profiles'


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
        <Loading carregando={this.state.carregando}>
          <Row >
            {_.map(this.state.dados, (course, idx) =>
                <Col key={idx} md={3} className={'box'}>
                  <Link to={`/courses/view/${course.id}`}>
                    <Panel className={`box-height box-color${idx%2+1}`}>
                      <div className={'box-text'}>{course.name}</div>
                      <div className={'box-keywords'}>{course.keywords}</div>
                    </Panel>
                  </Link>
                </Col>
            )}
            <Authorize viewFor={PROFILE_ADMIN}>
              <Col md={3} className={'box'}>
                <Link to={'/courses/register'}>
                  <Panel className={'box-height box-color0'}>
                    <div className={'box-text'}>Adicionar Curso</div>
                  </Panel>
                </Link>
              </Col>
            </Authorize>
          </Row>
        </Loading>
      </div>
    )
  }

}

export default Index
