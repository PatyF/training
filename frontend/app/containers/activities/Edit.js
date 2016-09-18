import React from 'react'
import _ from 'lodash'
import { Alert, Panel, Grid, Row, Col, Table, ButtonToolbar, Button, PageHeader, Label, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import { Link } from 'react-router'
import Loading from '../../components/Loading'
import InputText from '../../components/InputText'
import { saveActivity,
         getActivity } from '../../tools/api'

var dadosVazios = {
  course_id: '',
  modulo_id: '',
  question: '',
  correct_answer: '',
  incorrect_answer_1: '',
  incorrect_answer_2: '',
  incorrect_answer_3: '',
  incorrect_answer_4: '',
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
    if (isFinite(this.props.params.activityId)) {
      getActivity(this.props.params.courseId, this.props.params.moduleId, this.props.params.activityId, dados => {
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
    saveActivity(this.props.params.courseId, this.props.params.moduleId, this.props.params.activityId, this.state.dados, (success) => {
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
              <PageHeader>{this.state.editando ? 'Editar' : 'Adicionar'} Atividade</PageHeader>
            </Col>
          </Row>
          <InputText componentClass="textarea" erros={this.state.erros.question} label={"Pergunta"} value={this.state.dados.question} onChange={(event) => this.setState({dados: {...this.state.dados, question: event.target.value}})} />
          <InputText componentClass="textarea" erros={this.state.erros.correct_answer} label={"Resposta Correta"} value={this.state.dados.correct_answer} onChange={(event) => this.setState({dados: {...this.state.dados, correct_answer: event.target.value}})} />

          <InputText componentClass="textarea" erros={this.state.erros.incorrect_answer_1} label={"Resposta Incorreta 1"} value={this.state.dados.incorrect_answer_1} onChange={(event) => this.setState({dados: {...this.state.dados, incorrect_answer_1: event.target.value}})} />
          <InputText componentClass="textarea" erros={this.state.erros.incorrect_answer_2} label={"Resposta Incorreta 2"} value={this.state.dados.incorrect_answer_2} onChange={(event) => this.setState({dados: {...this.state.dados, incorrect_answer_2: event.target.value}})} />
          <InputText componentClass="textarea" erros={this.state.erros.incorrect_answer_3} label={"Resposta Incorreta 3"} value={this.state.dados.incorrect_answer_3} onChange={(event) => this.setState({dados: {...this.state.dados, incorrect_answer_3: event.target.value}})} />
          <InputText componentClass="textarea" erros={this.state.erros.incorrect_answer_4} label={"Resposta Incorreta 4"} value={this.state.dados.incorrect_answer_4} onChange={(event) => this.setState({dados: {...this.state.dados, incorrect_answer_4: event.target.value}})} />

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
