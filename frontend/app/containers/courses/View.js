import React from 'react'
import _ from 'lodash'
import { Panel, Grid, Row, Col, FormGroup, ControlLabel, FormControl, ButtonToolbar, Button, PageHeader, Label } from 'react-bootstrap'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import Loading from '../../components/Loading'
import ReactPlayer from 'react-player'
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
    getVideos(this.state.dados[index].course_id, this.state.dados[index].id, (videos) => {
      this.setState({ dados: [...this.state.dados.slice(0,index),
                              {...this.state.dados[index],
                                  videos
                              },
                              ...this.state.dados.slice(index + 1)]})
    })
  }

  assistirVideo = (indexModulo, indexVideo) => {
    var videos = this.state.dados[indexModulo].videos
    videos = _.map(videos, (video) => {
      return {...video, assistir: false}
    })
    videos = [...videos.slice(0, indexVideo),
              {...videos[indexVideo],
                assistir: true},
              ...videos.slice(indexVideo + 1)]
    this.setState({ dados: [...this.state.dados.slice(0, indexModulo),
                            {...this.state.dados[indexModulo],
                                videos
                            },
                            ...this.state.dados.slice(indexModulo + 1)]})
  }

  header(title, id){
    return <Row>
      <Col md={11}>
        <h4 className='title-module'>{title}</h4>
      </Col>
      <Col md={1}>
        <Link title="Editar Módulo" to={`/courses/${this.props.params.courseId}/modules/register/${id}`}><span className="icons sub-icon glyphicon glyphicon-pencil"></span></Link>
      </Col>
    </Row>
  }

  render() {
    return(
      <div>
        <Row>
          <Col md={10} mdOffset={1}>
            <Loading carregando={this.state.carregando}>
              <Row>
                <PageHeader className='title-header'>
                  {this.state.course}
                  <Link title="Editar Curso" to={`/courses/register/${this.props.params.courseId}`}><span className="icons glyphicon glyphicon-pencil" aria-hidden="true"></span></Link>
                </PageHeader>
              </Row>
              { _.map(this.state.dados, (dado, idx) =>
                <Row key={idx}>
                  <Col>
                    <Panel header={this.header(dado.title, dado.id)}>
                      <div className='description'>{dado.description}</div>
                      { dado.videos
                        ? _.map(dado.videos, (video, key) =>
                          <div key={key}>
                            { video.assistir
                              ? <Row key={key}>
                                 <Col mdOffset={2} md={8}>
                                   <h3>
                                     {video.title}
                                     <Link title="Editar Vídeo" to={`/courses/${this.props.params.courseId}/modules/${dado.id}/videos/register/${video.id}`}>
                                       <span className="icons glyphicon glyphicon-pencil" aria-hidden="true"/>
                                     </Link>
                                   </h3>
                                   <ReactPlayer
                                     width={'auto'}
                                     url={video.link}
                                     playing={true}
                                     />
                                   <div>{video.description}</div>
                                 </Col>
                                </Row>

                              : <Row key={key} className={'box-video'}>
                                 <Col md={3} className={'left-video'}>
                                   <ReactPlayer
                                     className={'assistir-video-video'}
                                     width={'auto'}
                                     height={'auto'}
                                     url={video.link}
                                     playing={false}
                                     />
                                   <Button bsStyle='link' onClick={() => this.assistirVideo(idx, key)}><div className={'assistir-video-button'}></div></Button>
                                 </Col>
                                 <Col md={9}>
                                   <h4>
                                     {video.title}
                                     <Link title="Editar Vídeo" to={`/courses/${this.props.params.courseId}/modules/${dado.id}/videos/register/${video.id}`}>
                                       <span className="icons glyphicon glyphicon-pencil" aria-hidden="true"/>
                                     </Link>
                                   </h4>
                                   <p>{video.description}</p>
                                 </Col>
                               </Row>
                            }
                          </div>
                          )
                        : <Button bsStyle="link" onClick={() => this.visualizarVideos(idx)}>Carregar Vídeos ...</Button>
                      }
                      <Row>
                        <Col md={3} className={'box-modulo'}>
                          <Link to={`/courses/${this.props.params.courseId}/modules/${dado.id}/videos/register`}>
                            <Panel className={'box color0'}>
                              <div className={'box-align'}>
                                <div className={'new-icon glyphicon glyphicon-plus'}></div>
                                <div className={'text'}>Adicionar Vídeo</div>
                              </div>
                            </Panel>
                          </Link>
                        </Col>
                      </Row>
                    </Panel>
                  </Col>
                </Row>
              )}
              <Row>
                <Col className={'box'}>
                  <Link to={`/courses/${this.props.params.courseId}/modules/register`}>
                    <Panel className={'box-color0'}>
                      <div className={'box-align'}>
                        <div className={'text'}>Adicionar Módulo</div>
                      </div>
                    </Panel>
                  </Link>
                </Col>
              </Row>
            </Loading>
          </Col>
        </Row>
      </div>
    )
  }

}

export default Index
