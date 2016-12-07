import React from 'react'
import _ from 'lodash'
import { Alert, Panel, Grid, Row, Col, Table, ButtonToolbar, Button, PageHeader, Label, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import { Link } from 'react-router'
import Loading from '../../components/Loading'
import InputText from '../../components/InputText'
import { saveDocument,
         getDocument } from '../../tools/api'

var dadosVazios = {
  course_id: '',
  modulo_id: '',
  name: '',
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
      editando: false,
      name: ''
    }
  }

  componentDidMount() {
    if (isFinite(this.props.params.documentId)) {
      getDocument(this.props.params.courseId, this.props.params.moduleId, this.props.params.documentId, dados => {
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

    saveDocument(this.props.params.courseId, this.props.params.moduleId, this.state.dados.file, (success) => {
      var dados = dadosVazios
      dados = {...dados,
        course_id: this.props.params.courseId,
        modulo_id: this.props.params.moduleId
      }
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

  handleChange = (e) => {
    this.setState({dados: {
      ...this.state.dados,
      name: e.target.files[0].name,
      file: e.target.files
    }, name: e.target.files[0].name})
  }

  render() {
    return (
      <div>
        <Row>
          <Col md={10} mdOffset={1}>
          <Row>
            { this.state.mensagem.tipo ?
              <Alert bsStyle={this.state.mensagem.tipo}>
                {this.state.mensagem.conteudo}
              </Alert>
            : null }
            <Col md={10} xs={8}>
              <PageHeader>{this.state.editando ? 'Editar' : 'Adicionar'} Documento</PageHeader>
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <InputText disabled={true} erros={this.state.erros.name} label={"Arquivo"} value={this.state.dados.name} onChange={(event) => this.setState({dados: {...this.state.dados, name: event.target.value}})} />
            </Col>
            <Col md={5}>
              <Button bsStyle="primary" className="adicionar-documento-button">Escolher arquivo</Button>
              <input className="adicionar-documento" type="file" onChange={this.handleChange} />
            </Col>
          </Row>
          <Row>
            <Col md={1}>
              <Button bsStyle="primary" onClick={this.salvar}>Salvar</Button>
            </Col>
            <Col md={1}>
              <Link to={'/courses/view/' + this.props.params.courseId}><Button bsStyle="default">Cancelar</Button></Link>
            </Col>
          </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Edit
