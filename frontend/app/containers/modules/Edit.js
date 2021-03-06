import React from 'react'
import _ from 'lodash'
import { Alert, Panel, Grid, Row, Col, Table, ButtonToolbar, Button, PageHeader, Label, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import { Link } from 'react-router'
import Loading from '../../components/Loading'
import InputText from '../../components/InputText'
import { saveModule,
         getModule } from '../../tools/api'

var dadosVazios = {
  course_id: '',
  title: '',
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
    if (isFinite(this.props.params.moduleId)) {
      getModule(this.props.params.courseId, this.props.params.moduleId, dados => {
        this.setState({
          dados,
          editando: true
        })
      })
    } else {
      this.setState({
        dados: {
          ...this.state.dados,
          course_id: this.props.params.courseId
        }
      })
    }
  }

  salvar = () => {
    let response = null
    saveModule(this.props.params.courseId, this.props.params.moduleId, this.state.dados, (success) => {
      var dados = dadosVazios
      dados = {
        ...dados,
        course_id: this.props.params.courseId
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
                <PageHeader>{this.state.editando ? 'Editar' : 'Adicionar'} Módulo</PageHeader>
              </Col>
            </Row>
            <InputText erros={this.state.erros.title} label={"Título"} value={this.state.dados.title} onChange={(event) => this.setState({dados: {...this.state.dados, title: event.target.value}})} />
            <InputText componentClass="textarea" erros={this.state.erros.description} label={"Descrição"} value={this.state.dados.description} onChange={(event) => this.setState({dados: {...this.state.dados, description: event.target.value}})} />
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
