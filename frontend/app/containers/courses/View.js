import React from 'react'
import _ from 'lodash'
import { Panel, Grid, Row, Col, FormGroup, ControlLabel, FormControl, ButtonToolbar, Button, PageHeader, Label } from 'react-bootstrap'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import Loading from '../../components/Loading'
import { getCourse,
         getModules,
         getVideos } from '../../tools/api'


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

  visualizarVideos = (index) => {
    console.log(this.state.dados[index].id);
    getVideos(this.state.dados[index].course_id, this.state.dados[index].id, (videos) => {
      this.setState({ dados: [...this.state.dados.slice(0,index),
                              {...this.state.dados[index],
                                  videos
                              },
                              ...this.state.dados.slice(index + 1)]})
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
                    { dado.videos
                      ? _.map(dado.videos, (video, key) =>
                          <Row key={key}>
                            <Col>Video: {video.title}</Col>
                            <Col>Descrição: {video.description}</Col>
                          </Row>
                        )
                      : <Button bsStyle="default" onClick={() => this.visualizarVideos(idx)}>Visualizar Vídeos</Button>
                    }
                    <LinkContainer to={`/courses/${this.props.params.courseId}/modules/${dado.id}/videos/register`}><Button bsStyle="default">Adicionar Vídeo</Button></LinkContainer>
                  </Col>
                </Row>
              ) }
            </Panel>
            <Col>
              <LinkContainer to={`/courses/${this.props.params.courseId}/modules/register`}><Button bsStyle="default">Adicionar Módulo</Button></LinkContainer>
            </Col>
          </Loading>
        </Grid>
      </div>
    )
  }

}

export default Index
