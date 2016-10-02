import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Panel, Grid, Row, Col, FormGroup, ControlLabel, FormControl, ButtonToolbar, Button, PageHeader, Label } from 'react-bootstrap'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import Loading from '../../components/Loading'
import ReactPlayer from 'react-player'
import { getCourse,
         getModules,
         getVideos,
         getActivities,
         getRegistry,
         saveRegistry } from '../../tools/api'
import Authorize from '../../components/Authorize'
import { PROFILE_ADMIN, PROFILE_INSTRUCTOR, PROFILE_STUDENT } from '../../tools/profiles'


class Index extends React.Component {

  constructor() {
    super();
    this.state = {
      carregando: true,
      course: '',
      dados: [],
      registry: []
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

    if (this.props.profile === PROFILE_STUDENT) {
      getRegistry(this.props.params.courseId, json => {
        this.setState({
          registry: json
        })
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile) {
      if (nextProps.profile === PROFILE_STUDENT) {
        getRegistry(this.props.params.courseId, json => {
          this.setState({
            registry: json
          })
        })
      }
    }
  }

  visualizarDetalhes = (index) => {
    var modulos = this.state.dados
    modulos = _.map(modulos, (modulo, idx) => {
      return {...modulo, aberto: false}
    })
    getVideos(this.state.dados[index].course_id, this.state.dados[index].id, (videos) => {
      modulos = [ ...modulos.slice(0,index),
                 {...modulos[index],
                    videos,
                    aberto: true
                 },
                 ...modulos.slice(index + 1)]

     getActivities(this.state.dados[index].course_id, this.state.dados[index].id, (activities) => {
       modulos = [ ...modulos.slice(0,index),
         {...modulos[index],
           activities
         },
         ...modulos.slice(index + 1)]
         this.setState({ dados: modulos })
       })
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

  exibeDetalhes(modulo, indexModulo) {
    return <Row className='box-video'>
      <Col md={12} className='modulo-description'>
        {modulo.description}
      </Col>
      { this.state.registry.length != 0 || this.props.profile !== PROFILE_STUDENT
      ? <div>
        { _.map(modulo.videos, (video, key) =>
            <Col md={12} key={key}>
              { video.assistir
                ? <Row key={key}>
                   <Col mdOffset={2} md={8}>
                     <div className='video-title-assistir'>
                       {video.title}
                       <Link title="Editar Vídeo" to={`/courses/${this.props.params.courseId}/modules/${modulo.id}/videos/register/${video.id}`}>
                         <span className="video-icon-assistir icons glyphicon glyphicon-pencil" aria-hidden="true"/>
                       </Link>
                     </div>
                     <ReactPlayer
                       width={'auto'}
                       url={video.link}
                       playing={true}
                       />
                     <div className='video-description-assistir' >{video.description}</div>
                   </Col>
                  </Row>

                : <Row key={key}>
                   <Col md={3} className={'left-video'}>
                     <ReactPlayer
                       className={'assistir-video-video'}
                       width={'auto'}
                       height={'auto'}
                       url={video.link}
                       playing={false}
                       />
                     <Button bsStyle='link' onClick={() => this.assistirVideo(indexModulo, key)}><div className={'assistir-video-button'}></div></Button>
                   </Col>
                   <Col md={9}>
                     <div className='video-title'>
                       {video.title}
                       <Authorize viewFor={PROFILE_INSTRUCTOR}>
                         <Link title="Editar Vídeo" to={`/courses/${this.props.params.courseId}/modules/${modulo.id}/videos/register/${video.id}`}>
                           <span className="video-icon icons glyphicon glyphicon-pencil" aria-hidden="true"/>
                         </Link>
                       </Authorize>
                     </div>
                     <p className='video-description'>{video.description}</p>
                   </Col>
                 </Row>
              }
            </Col>
          )}
          <Authorize viewFor={PROFILE_INSTRUCTOR}>
            <Row>
              <Col md={3} className={'video-box-adicionar color-modulo0'}>
                <Link to={`/courses/${this.props.params.courseId}/modules/${modulo.id}/videos/register`}>
                  <Row>
                    <Col md={12}>
                      <div className={'adicionar-video-icon glyphicon glyphicon-plus'}></div>
                      <Button bsStyle="link" className={`title-modulo`}>Adicionar Vídeo</Button>
                    </Col>
                  </Row>
                </Link>
              </Col>
            </Row>
          </Authorize>
          { _.map(modulo.activities, (activity, key) =>
              <Col md={12} key={key}>
                {  <Row key={key}>
                    <Col md={9}>
                      <div className='video-title'>
                        Questão {key+1}
                        <Authorize viewFor={PROFILE_INSTRUCTOR}>
                          <Link title="Editar Atividade" to={`/courses/${this.props.params.courseId}/modules/${modulo.id}/activities/register/${activity.id}`}>
                            <span className="video-icon icons glyphicon glyphicon-pencil" aria-hidden="true"/>
                          </Link>
                        </Authorize>
                        <Authorize viewFor={PROFILE_STUDENT}>
                          <Link title="Responder Atividade" to={`/courses/${this.props.params.courseId}/modules/${modulo.id}/activities/${activity.id}/question`}>
                            <span className="video-icon icons" aria-hidden="true">Responder</span>
                          </Link>
                        </Authorize>
                      </div>
                      <p className='video-description'>{activity.question}</p>
                    </Col>
                   </Row>
                }
              </Col>
            )}
          <Authorize viewFor={PROFILE_INSTRUCTOR}>
            <Row>
              <Col md={3} className={'atividade-box-adicionar color-modulo0'}>
                <Link to={`/courses/${this.props.params.courseId}/modules/${modulo.id}/activities/register`}>
                  <Row>
                    <Col md={12}>
                      <div className={'adicionar-video-icon glyphicon glyphicon-plus'}></div>
                      <Button bsStyle="link" className={`title-modulo`}>Adicionar Atividade</Button>
                    </Col>
                  </Row>
                </Link>
              </Col>
            </Row>
          </Authorize>
      </div>
      : null
      }
    </Row>
  }

  matricular = () => {
    let response = null
    saveRegistry(this.props.params.courseId, (success) => {
      this.setState({
          registry: success
      })
      javascript:scroll(0, 0);
    }, (errors) => {
      this.setState({ mensagem: { tipo: 'danger', conteudo: 'Corrija os erros para salvar.' }, erros: errors.errors })
    })
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
                  <Authorize viewFor={PROFILE_ADMIN}><Link title="Editar Curso" to={`/courses/register/${this.props.params.courseId}`}><span className="icons glyphicon glyphicon-pencil" aria-hidden="true"></span></Link></Authorize>
                </PageHeader>
              </Row>
              <Row className='header-modulo'>
                <Col md={8}>
                  <span className="icon-modulo glyphicon glyphicon-blackboard" aria-hidden="true"></span>
                  Módulo
                </Col>
                <Col md={3}>
                  <span className="icon-modulo glyphicon glyphicon-dashboard" aria-hidden="true"></span>
                  Nota
                </Col>
                <Col md={1}>
                </Col>
              </Row>
              { _.map(this.state.dados, (dado, idx) =>
                <div  key={idx}>
                  <Row className={`body-modulo color-modulo${idx%2+1}`}>
                    <Col md={8}>
                      <Button bsStyle="link" className={`title-modulo`} onClick={() => this.visualizarDetalhes(idx)}>{dado.title}</Button>
                    </Col>
                    <Col md={3}>
                      5.0
                    </Col>
                    <Col md={1}>
                      <Authorize viewFor={PROFILE_INSTRUCTOR}><Link title="Editar Módulo" to={`/courses/${this.props.params.courseId}/modules/register/${dado.id}`}><span className="icons sub-icon glyphicon glyphicon-pencil"></span></Link></Authorize>
                    </Col>
                  </Row>
                  {dado.aberto ? this.exibeDetalhes(dado, idx) : null}
                </div>
              )}
              <Authorize viewFor={PROFILE_INSTRUCTOR}>
                <Link title="Novo Módulo" to={`/courses/${this.props.params.courseId}/modules/register/`}>
                  <Row className={`body-modulo color-modulo0`}>
                    <Col md={8}>
                      <Button bsStyle="link" className={`title-modulo`}>Adicionar Módulo</Button>
                    </Col>
                    <Col md={3}>
                    </Col>
                    <Col md={1}>
                      <span className="icons sub-icon glyphicon glyphicon-plus"></span>
                    </Col>
                  </Row>
                </Link>
              </Authorize>
            </Loading>
          </Col>
        </Row>
        <Authorize viewFor={PROFILE_STUDENT}>
          { this.state.registry.length != 0
            ? null
            : <Row>
              <Col mdOffset={5} md={2} >
                <Button className={"button-top"} bsStyle="primary" bsSize="large" onClick={() => this.matricular()}>
                  Matricular-se
                </Button>
              </Col>
            </Row>
          }

        </Authorize>
      </div>
    )
  }

}

let mapStateToProps = state => ({
  profile: state.auth.profile.profile
})

export default connect(mapStateToProps)(Index)
