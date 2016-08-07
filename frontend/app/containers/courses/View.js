import React from 'react'
import _ from 'lodash'
import { Panel, Grid, Row, Col, FormGroup, ControlLabel, FormControl, ButtonToolbar, Button, PageHeader, Label } from 'react-bootstrap'
import { Link } from 'react-router'
import Loading from '../../components/Loading'
import { getCourse,
         getModules } from '../../tools/api'


class Index extends React.Component {

  constructor() {
    super();
    this.state = {
      carregando: true,
      course: '',
      dados: []
    }
  }

  componentDidMount() {
    getCourse(this.props.params.courseId, course => {
      this.setState({
        course: course.name,
        carregando: false
      })
    })

    getModules(this.props.params.courseId, json => {
      this.setState({
        dados: json,
        carregando: false
      })
    })

  }

  render() {
    return(
      <div>
        <Grid>
          <Loading carregando={this.state.carregando}>
            <Row>
              <Col>
                <PageHeader>{this.state.course}</PageHeader>
              </Col>
            </Row>
            <Panel>
              { _.map(this.state.dados, (dado, idx) =>
                <Row key={idx}>
                  <Col>
                    <PageHeader>{dado.title}</PageHeader>
                    <div>{dado.description}</div>
                    <Button bsStyle="default" href={`/courses/${this.props.params.courseId}/modules/${dado.id}/videos/register`}>Adicionar Vídeo</Button>
                  </Col>
                </Row>
              ) }
            </Panel>
            <Col>
              <Button bsStyle="default" href={`/courses/${this.props.params.courseId}/modules/register`}>Adicionar Módulo</Button>
            </Col>
          </Loading>
        </Grid>
      </div>
    )
  }

}

export default Index
