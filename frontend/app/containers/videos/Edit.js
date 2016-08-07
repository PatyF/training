import React from 'react'
import _ from 'lodash'
import { Alert, Panel, Grid, Row, Col, Table, ButtonToolbar, Button, PageHeader, Label, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import { Link } from 'react-router'
import Loading from '../../components/Loading'
import { saveVideo,
         getVideo } from '../../tools/api'

var dadosVazios = {
  course_id: '',
  modulo_id: '',
  title: '',
  link: '',
  description: ''
}

class Edit extends React.Component {

  constructor() {
    super();
    this.state = {
      dados: dadosVazios,
      erros: dadosVazios,
      mensagem: {
        tipo: false
      },
      editando: false
    }
  }

  componentDidMount() {
    if (isFinite(this.props.params.videoId)) {
      getVideo(this.props.params.courseId, this.props.params.moduleId, this.props.params.videoId, dados => {
        this.setState({
          dados,
          editando: true
        })
      })
    } else {
      this.setState({
        dados: {
          ...this.state.dados,
          course_id: this.props.params.courseId,
          modulo_id: this.props.params.moduleId
        }
      })
    }
  }

  salvar = () => {
    let response = null
    console.log(this.state.dados);
    saveVideo(this.props.params.courseId, this.props.params.moduleId, this.props.params.videoId, this.state.dados, (success) => {
      var dados = dadosVazios
      dados = {...dados,
        course_id: this.props.params.courseId,
        modulo_id: this.props.params.moduleId
      }
      console.log(dados);
      this.setState({
          dados: this.state.editando ? this.state.dados : dados,
          mensagem: { tipo: 'success', conteudo: 'Dados salvos com sucesso.' },
          erros: dadosVazios
      })
      javascript:scroll(0, 0);
    }, (errors) => {
      this.setState({ mensagem: { tipo: 'danger', conteudo: 'Corrija os erros para salvar.' }, erros: errors.errors })
    })
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            { this.state.mensagem.tipo ?
              <Alert bsStyle={this.state.mensagem.tipo}>
                {this.state.mensagem.conteudo}
              </Alert>
            : null }
            <Col md={10} xs={8}>
              <PageHeader>{this.state.editando ? 'Editar' : 'Adicionar'} Vídeo</PageHeader>
            </Col>
          </Row>
          <Panel className="showgrid">
            <FormGroup validationState={this.state.erros.title ? 'error' : null}>
              <ControlLabel>Título</ControlLabel>
              <FormControl type="text" placeholder='Título' value={this.state.dados.title} onChange={(event) => this.setState({dados: {...this.state.dados, title: event.target.value}})} />
              <HelpBlock>{this.state.erros.title}</HelpBlock>
            </FormGroup>
            <FormGroup validationState={this.state.erros.link ? 'error' : null}>
              <ControlLabel>Link</ControlLabel>
              <FormControl type="text" placeholder='Link' value={this.state.dados.link} onChange={(event) => this.setState({dados: {...this.state.dados, link: event.target.value}})} />
              <HelpBlock>{this.state.erros.link}</HelpBlock>
            </FormGroup>
            <FormGroup validationState={this.state.erros.description ? 'error' : null}>
              <ControlLabel>Descrição</ControlLabel>
              <FormControl componentClass="textarea" placeholder='Descrição' value={this.state.dados.description} onChange={(event) => this.setState({dados: {...this.state.dados, description: event.target.value}})} />
              <HelpBlock>{this.state.erros.description}</HelpBlock>
            </FormGroup>
            <Button bsStyle="primary" bsSize="small" onClick={this.salvar}>Salvar</Button>
          </Panel>
        </Grid>
      </div>
    )
  }
}

export default Edit
