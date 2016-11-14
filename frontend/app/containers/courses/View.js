import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import moment from 'moment'
import { Panel, Grid, Row, Col, FormGroup, ControlLabel, FormControl, ButtonToolbar, Button, PageHeader, Label } from 'react-bootstrap'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import Loading from '../../components/Loading'
import ViewVideos from '../videos/View'
import ViewDocuments from '../documents/View'
import Grades from './Grades'
import Comment from './Comment'
import { getCourse,
         getModules,
         getVideos,
         getDocuments,
         getActivities,
         getRegistry,
         saveRegistry,
         getComment,
         getComments,
         saveComment,
         download,
         deleteDocument } from '../../tools/api'
import Authorize from '../../components/Authorize'
import { PROFILE_ADMIN, PROFILE_INSTRUCTOR, PROFILE_STUDENT } from '../../tools/profiles'


class Index extends React.Component {

  constructor() {
    super();
    this.state = {
      carregando: true,
      course: '',
      dados: [],
      registry: {},
      comment: {
        comment: '',
        grade: 0,
        saved: false
      }
    }
  }

  componentDidMount() {
    getCourse(this.props.params.courseId, course => {
      this.setState({
        course: course.course
      })
    })

    getModules(this.props.params.courseId, json => {
      this.setState({
        dados: json.modulos,
        carregando: false
      })
    })

    getComments(this.props.params.courseId, json => {
      this.setState({
        all_comments: json.comments
      })
    })
    this.atualizaDados(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile) {
      this.atualizaDados(nextProps)
    }
  }

  atualizaDados(props) {
    if (props.profile === PROFILE_STUDENT) {
      getRegistry(this.props.params.courseId, json => {
        this.setState({
          registry: json
        })
      })
      getComment(this.props.params.courseId, json => {
        if (json) {
          json = {...json, saved: true}
          this.setState({
            comment: json
          })
        }
      })
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
                    videos: videos.videos,
                    aberto: true
                 },
                 ...modulos.slice(index + 1)]

     getActivities(this.state.dados[index].course_id, this.state.dados[index].id, (activities) => {
       modulos = [ ...modulos.slice(0,index),
         {...modulos[index],
           activities: activities.activities
         },
         ...modulos.slice(index + 1)]
         this.setState({ dados: modulos })
       })

       getDocuments(this.state.dados[index].course_id, this.state.dados[index].id, (documents) => {
         modulos = [ ...modulos.slice(0,index),
           {...modulos[index],
             documents: documents.documents
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

  deleteDoc = (indexModulo, moduloId, id) => {
    if (confirm(`Confirma a exclusão do documento?`)) {
      deleteDocument(this.props.params.courseId, moduloId, id, (success) => {
        getDocuments(this.state.dados[indexModulo].course_id, this.state.dados[indexModulo].id, (documents) => {
          var modulos = this.state.dados
          modulos = [ ...modulos.slice(0,indexModulo),
            {...modulos[indexModulo],
              documents: documents.documents
            },
            ...modulos.slice(indexModulo + 1)]
            this.setState({ dados: modulos })
          })
      }, (errors) => {
        this.setState({ mensagem: { tipo: 'danger', conteudo: 'Não foi possível excluir' }, erros: errors.errors })
      })
    }
  }

  linkDescricao(activity) {
    if ("correct_answer" in activity) {
      if (activity.correct_answer)
        return <span className="atividade-icon-correta icons glyphicon glyphicon-ok" aria-hidden="true"/>
      else
        return <span className="atividade-icon-incorreta icons glyphicon glyphicon-remove" aria-hidden="true"/>
    } else
      return <span className="video-icon icons" aria-hidden="true">Responder</span>
  }

  exibeDetalhes(modulo, indexModulo) {
    return <Row className='box-video'>
      <Col md={12} className='modulo-description'>
        {modulo.description}
      </Col>
      { this.state.registry || this.props.profile !== PROFILE_STUDENT
      ? <div>
          <ViewVideos
            videos={modulo.videos}
            courseId={this.props.params.courseId}
            moduloId={modulo.id}
            indexModulo={indexModulo}
            assistirVideo={this.assistirVideo}
          />
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
                          <Link title={!("correct_answer" in activity) ? "Responder Atividade": "Conferir resposta"} to={`/courses/${this.props.params.courseId}/modules/${modulo.id}/activities/${activity.id}/question`}>
                            {this.linkDescricao(activity)}
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
          <ViewDocuments
            documents={modulo.documents}
            courseId={this.props.params.courseId}
            moduloId={modulo.id}
            indexModulo={indexModulo}
            onDeleteDocumento={this.deleteDoc}
            />
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

  onGenerateCertified = () => {
    download(`courses/${this.props.params.courseId}/certified`,`certificado_${this.props.params.courseId}_${this.props.profileId}.pdf`)
    this.setState({
        registry: {...this.state.registry,
                    final_date: moment().format('YYYY-MM-DD')
                  }
    })
  }

  onChangeGrade = (value) => {
    this.setState({comment: {...this.state.comment, grade: value}})
  }

  onSaveComment = () => {
    saveComment(this.props.params.courseId, this.state.comment, (success) => {
      success = {...success, saved: true}
      this.setState({
          comment: success
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
                  {this.state.course.name}
                  <Authorize viewFor={PROFILE_ADMIN}><Link title="Editar Curso" to={`/courses/register/${this.props.params.courseId}`}><span className="icons glyphicon glyphicon-pencil" aria-hidden="true"></span></Link></Authorize>
                </PageHeader>
              </Row>
              { this.props.profile == PROFILE_STUDENT && !this.state.registry
                ?
                  <div>
                      <Col mdOffset={3} md={6}>
                        <Row className='descrition-course'>
                          {this.state.course.description}
                        </Row>
                      </Col>
                  </div>
                : <div>
                  <Row className='header-modulo'>
                    <Col md={7}>
                      <span className="icon-modulo glyphicon glyphicon-blackboard" aria-hidden="true"></span>
                      Módulo
                    </Col>
                    <Col md={2}>
                      <Authorize viewFor={PROFILE_STUDENT}><div>Vídeos</div></Authorize>
                    </Col>
                    <Col md={2}>
                      <Authorize viewFor={PROFILE_STUDENT}><div>Questões</div></Authorize>
                    </Col>
                    <Col md={1}>
                    </Col>
                  </Row>
                  { _.map(this.state.dados, (dado, idx) =>
                    <div  key={idx}>
                      <Row className={`body-modulo color-modulo${idx%2+1}`}>
                        <Col md={7}>
                          <Button bsStyle="link" className={`title-modulo`} onClick={() => this.visualizarDetalhes(idx)}>{dado.title}</Button>
                        </Col>
                        <Col md={2}>
                          <Authorize viewFor={PROFILE_STUDENT}><span className={dado.watched_videos == dado.number_videos ? 'label label-success' : 'label label-warning'}>{dado.watched_videos}/{dado.number_videos}</span></Authorize>
                        </Col>
                        <Col md={2}>
                          <Authorize viewFor={PROFILE_STUDENT}><span className={dado.answered_activities == dado.number_activities ? 'label label-success' : 'label label-warning'}>{dado.answered_activities}/{dado.number_activities}</span></Authorize>
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
                </div>
              }
            </Loading>
          </Col>
        </Row>
        <Authorize viewFor={PROFILE_STUDENT}>
          { this.state.registry
            ? <div>
                <Grades
                  course_id={this.props.params.courseId}
                  profile_id={this.props.profileId}
                  number_videos={this.state.course.number_videos}
                  watched_videos={this.state.course.watched_videos}
                  number_activities={this.state.course.number_activities}
                  answered_activities={this.state.course.answered_activities}
                  grade={this.state.course.grade}
                  generate_certificate={this.state.course.generate_certificate}
                  final_date={this.state.registry.final_date}
                  onGenerateCertified={this.onGenerateCertified}
                />
              { this.state.registry.final_date
                ? <Comment
                    comment={this.state.comment}
                    onChangeComment={(event) => this.setState({comment: {...this.state.comment, comment: event.target.value}})}
                    onChangeGrade={this.onChangeGrade}
                    onSaveComment={this.onSaveComment}
                  />
                : null
              }
              </div>
            : <Row>
              <Col mdOffset={5} md={2} >
                <Button className={"button-top"} bsStyle="primary" bsSize="large" onClick={() => this.matricular()}>
                  Matricular-se
                </Button>
              </Col>
            </Row>
          }
        </Authorize>
        <Authorize viewFor={PROFILE_ADMIN}>
          <Row>
            <Col mdOffset={5} md={2} >
              <Link to={`/courses/${this.props.params.courseId}/students`}>
                <Button className={"button-top"} bsStyle="primary" bsSize="large">
                  Visualizar Aproveitamento
                </Button>
              </Link>
            </Col>
          </Row>
        </Authorize>
        <Authorize viewFor={PROFILE_INSTRUCTOR}>
          <Row>
            <Col mdOffset={5} md={2} >
              <Link to={`/courses/${this.props.params.courseId}/students`}>
                <Button className={"button-top"} bsStyle="primary" bsSize="large">
                  Visualizar Aproveitamento
                </Button>
              </Link>
            </Col>
          </Row>
        </Authorize>
        {_.map(this.state.all_comments, (comment, idx) => {
          return (this.props.profile == PROFILE_STUDENT && this.props.profileId == comment.user_id)
            ? null
            : <Row  key={idx}>
              <Col md={10} mdOffset={1} className={'box-grades margin-top-comment box-comment'}>
                <Row>
                  <Col md={2} className={'comment-name'}>
                    <Row>
                      <Col md={12}>
                        {comment.user_name}
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <div className={'height-nota'}>{Array(comment.grade).fill().map((e,i)=><span key={i} className={'nota nota-index glyphicon glyphicon-star'}/>)}</div>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={10} className={'comment-dialog'}>
                    {`\"${comment.comment}\"`}
                  </Col>
                </Row>
              </Col>
            </Row>
        })}
      </div>
    )
  }

}

let mapStateToProps = state => ({
  profile: state.auth.profile.profile,
  profileId: state.auth.profile.id
})

export default connect(mapStateToProps)(Index)
