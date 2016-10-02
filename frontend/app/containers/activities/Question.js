import React from 'react'
import _ from 'lodash'
import { Radio, Alert, Panel, Grid, Row, Col, Table, ButtonToolbar, Button, PageHeader, Label, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import { Link } from 'react-router'
import Loading from '../../components/Loading'
import InputText from '../../components/InputText'
import { saveStudentActivity,
         getStudentActivity } from '../../tools/api'

var dadosVazios = {
  course_id: '',
  modulo_id: '',
  activity_id: '',
  question: '',
  answer_a: '',
  answer_b: '',
  answer_c: '',
  answer_d: '',
  answer_e: '',
  answer_student: '',
  responded: false
}

class Question extends React.Component {

  constructor() {
    super();
    this.state = {
      dados: dadosVazios,
      mensagem: {
        tipo: false
      }
    }
  }

  componentDidMount() {
    getStudentActivity(this.props.params.courseId, this.props.params.moduleId, this.props.params.activityId, dados => {
      var dados = {
        ...dados,
        responded: dados.answer_student === null ? false : true
      }
      this.setState({
        dados
      })
    })
  }

  salvar = () => {
    if (this.state.dados.answer_student == null) {
      this.setState({ mensagem: { tipo: 'danger', conteudo: 'Selecione a resposta' } })
    } else {
      saveStudentActivity(this.props.params.courseId, this.props.params.moduleId, this.props.params.activityId, {answer_student: this.state.dados.answer_student}, (success) => {
        var dados = {...success,
          course_id: this.props.params.courseId,
          modulo_id: this.props.params.moduleId,
          responded: true
        }
        this.setState({
            dados: dados,
            mensagem: { tipo: 'success', conteudo: 'Dados salvos com sucesso.' },
            erros: dadosVazios
        })
        javascript:scroll(0, 0);
      }, (errors) => {
        this.setState({ mensagem: { tipo: 'danger', conteudo: 'Corrija os erros para salvar.' }, erros: errors.errors })
      })
    }
  }

  render() {
    return (
      <div>
        <Row>
          <Col md={10} mdOffset={1}>
          <Row>
            <Col md={10} xs={8}>
              { this.state.mensagem.tipo ?
                <Alert bsStyle={this.state.mensagem.tipo}>
                  {this.state.mensagem.conteudo}
                </Alert>
              : null }
              <PageHeader>Responder Atividade</PageHeader>
            </Col>
          </Row>
          <div>{this.state.dados.question}</div>
          <Radio
            disabled={this.state.dados.responded}
            checked={this.state.dados.answer_student == 'answer_a'}
            onClick={() =>this.setState({dados: {...this.state.dados, answer_student: 'answer_a'}})}>
              {this.state.dados.answer_a}
          </Radio>
          <Radio
            disabled={this.state.dados.responded}
            checked={this.state.dados.answer_student == 'answer_b'}
            onClick={() => this.setState({dados: {...this.state.dados, answer_student: 'answer_b'}})}>
              {this.state.dados.answer_b}
          </Radio>
          <Radio
            disabled={this.state.dados.responded}
            checked={this.state.dados.answer_student == 'answer_c'}
            onClick={() => this.setState({dados: {...this.state.dados, answer_student: 'answer_c'}})}>
              {this.state.dados.answer_c}
          </Radio>
          <Radio
            disabled={this.state.dados.responded}
            checked={this.state.dados.answer_student == 'answer_d'}
            onClick={() => this.setState({dados: {...this.state.dados, answer_student: 'answer_d'}})}>
              {this.state.dados.answer_d}
          </Radio>
          <Radio
            disabled={this.state.dados.responded}
            checked={this.state.dados.answer_student == 'answer_e'}
            onClick={() => this.setState({dados: {...this.state.dados, answer_student: 'answer_e'}})}>
              {this.state.dados.answer_e}
          </Radio>
          <Row>
            {this.state.dados.responded
              ? null
              : <Col md={1}>
                <Button bsStyle="primary" onClick={this.salvar}>Salvar</Button>
              </Col>
            }
            <Col md={1}>
              <Link to={'/courses/view/' + this.props.params.courseId}><Button bsStyle="default">Voltar</Button></Link>
            </Col>
          </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Question