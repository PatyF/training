import React from 'react'
import { Alert, Panel, Grid, Row, Col, Table, ButtonToolbar, Button, PageHeader, Label, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import ReactPlayer from 'react-player'
import Authorize from '../../components/Authorize'
import { PROFILE_ADMIN, PROFILE_INSTRUCTOR, PROFILE_STUDENT } from '../../tools/profiles'
import { savePositionVideo, getPositionVideo } from '../../tools/api'
import _ from 'lodash'

var dadosVazios = {
  playing: true,
  played: 0,
  duration: 0,
  seekTo: 0,
  playSaved: 0,
  watched: null,
  duration: null
}

class View extends React.Component {
  constructor() {
    super();
    this.state = dadosVazios
  }

  componentWillReceiveProps(nextProps) {
    var videoId = _.filter(nextProps.videos, 'assistir')[0].id

    var dados = dadosVazios
    if (nextProps.profile) {
      if (nextProps.profile === PROFILE_STUDENT && videoId) {
        getPositionVideo(this.props.courseId, this.props.moduloId, videoId, (json) => {
          if (json.length != 0){
            dados = {...dados,
              played: json[0].position,
              playSaved: json[0].position,
              watched: json[0].watched
            }
            this.player.seekTo(parseFloat(json[0].position))
            this.setState(dados)
          }
        })
      }
    }
    this.setState(dados)
  }

  savePosition = () => {
  }
  onSeekMouseDown = e => {
    this.setState({ seeking: true })
  }
  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }
  onSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }
  onProgress = state => {
    if (!this.state.seeking) {
      var posicaoAtual = this.state.duration * state.played
      var posicaoSalva = this.state.duration * this.state.playSaved
      var data = {
        duration: this.state.duration
      }
      if (posicaoAtual < posicaoSalva) {
        state["playSaved"] = state.played
      } else if (posicaoAtual < (posicaoSalva + 20) && posicaoAtual > (posicaoSalva + 4)) {
        state["playSaved"] = state.played
        data["position"] = state.played
        if(posicaoAtual > this.state.duration - 20) {
          state["watched"] = true
          data["watched"] = true
        }
        var videoId = _.filter(this.props.videos, 'assistir')[0].id
        savePositionVideo(this.props.courseId, this.props.moduloId, videoId, data, (success) => {}, (errors) => {})
      }
      this.setState(state)
    }
  }
  render() {
    return (
      <div>
      { _.map(this.props.videos, (video, key) =>
          <Col md={12} key={key}>
            { video.assistir
              ? <Row key={key}>
                 <Col mdOffset={2} md={8}>
                   <div className='video-title-assistir'>
                     {video.title} {this.state.watched ? <span className={'label label-default'}>Assistido</span> : null}
                     <Authorize viewFor={PROFILE_INSTRUCTOR}>
                       <Link title="Editar Vídeo" to={`/courses/${this.props.courseId}/modules/${this.props.moduloId}/videos/register/${video.id}`}>
                         <span className="video-icon-assistir icons glyphicon glyphicon-pencil" aria-hidden="true"/>
                       </Link>
                     </Authorize>
                   </div>
                   <ReactPlayer
                     ref={player => { this.player = player }}
                     width={'auto'}
                     url={video.link}
                     playing={this.state.playing}
                     onPlay={() => this.setState({ playing: true })}
                     onPause={() => this.setState({ playing: false })}
                     onEnded={() => this.setState({ playing: false })}
                     onProgress={this.onProgress}
                     onDuration={duration => this.setState({ duration })}
                     />
                  <input
                    type='range' min={0} max={1} step='any'
                    value={this.state.played}
                    onMouseDown={this.onSeekMouseDown}
                    onChange={this.onSeekChange}
                    onMouseUp={this.onSeekMouseUp}
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
                   <Button bsStyle='link' onClick={() => this.props.assistirVideo(this.props.indexModulo, key)}><div className={'assistir-video-button'}></div></Button>
                 </Col>
                 <Col md={9}>
                   <div className='video-title'>
                     {video.title} {video.watched ? <span className={'label label-default'}>Assistido</span> : null}
                     <Authorize viewFor={PROFILE_INSTRUCTOR}>
                       <Link title="Editar Vídeo" to={`/courses/${this.props.courseId}/modules/${this.props.moduloId}/videos/register/${video.id}`}>
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
              <Link to={`/courses/${this.props.courseId}/modules/${this.props.moduloId}/videos/register`}>
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
      </div>
    )
  }
}
let mapStateToProps = state => ({
  profile: state.auth.profile.profile
})

export default connect(mapStateToProps)(View)
