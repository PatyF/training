import React from 'react'
import { Alert, Panel, Grid, Row, Col, Table, ButtonToolbar, Button, PageHeader, Label, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import ReactPlayer from 'react-player'
import Authorize from '../../components/Authorize'
import { PROFILE_ADMIN, PROFILE_INSTRUCTOR, PROFILE_STUDENT } from '../../tools/profiles'
import _ from 'lodash'
import { download } from '../../tools/api'
class View extends React.Component {

  downloadDocument = (id, name) => {
    download(`courses/${this.props.courseId}/modulos/${this.props.moduloId}/documents/${id}/download`, name)
  }

  render() {
    return (
      <div>
        <Col md={12}>
          <div className='video-title'>
            Documentos Auxiliares
          </div>
        </Col>
      { _.map(this.props.documents, (document, key) =>
          <Col md={12} key={key}>
            <div className='video-title'>
              <Row>
                <Col md={12}>
                  <div className='video-description'>
                    <Button bsStyle="link" bsSize="small" onClick={() => this.downloadDocument(document.id, document.name)}>
                      {document.name}
                    </Button>
                    <Authorize viewFor={PROFILE_INSTRUCTOR}>
                      <Button bsStyle="link" bsSize="small" onClick={() => this.props.onDeleteDocumento(this.props.indexModulo, this.props.moduloId, document.id)}>
                        <span className="video-icon icons glyphicon glyphicon-trash" aria-hidden="true"/>
                      </Button>
                    </Authorize>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
      )}
        <Authorize viewFor={PROFILE_INSTRUCTOR}>
          <Row>
            <Col md={3} className={'atividade-box-adicionar color-modulo0'}>
              <Link to={`/courses/${this.props.courseId}/modules/${this.props.moduloId}/documents/register`}>
                <Row>
                  <Col md={12}>
                    <div className={'adicionar-video-icon glyphicon glyphicon-plus'}></div>
                    <Button bsStyle="link" className={`title-modulo`}>Adicionar Documento</Button>
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
