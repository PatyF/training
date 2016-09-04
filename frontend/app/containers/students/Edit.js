import React from 'react'
import _ from 'lodash'
import { Alert, Panel, Grid, Row, Col, Table, ButtonToolbar, Button, PageHeader, Label, FormGroup, ControlLabel, FormControl, HelpBlock, Radio } from 'react-bootstrap'
import { Link } from 'react-router'
import Loading from '../../components/Loading'
import { getStudent, saveStudent } from '../../tools/api'

var dadosVazios = {
  name: '',
  email: '',
  gender: '',
  birthday: ''
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
    if (isFinite(this.props.params.studentId)) {
      getUser(this.props.params.studentId, dados => {
        this.setState({
          dados,
          editando: true
        })
      })
    }
  }

  salvar = () => {
    let response = null
    saveUser(this.props.params.studentId, this.state.dados, (success) => {
      this.setState({
          dados: this.state.editando ? this.state.dados : dadosVazios,
          mensagem: { tipo: 'success', conteudo: 'Dados salvos com sucesso.' },
          erros: dadosVazios
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
          { this.state.mensagem.tipo ?
            <Alert bsStyle={this.state.mensagem.tipo}>
              {this.state.mensagem.conteudo}
            </Alert>
          : null }
            <PageHeader>{this.state.editando ? 'Editar' : 'Adicionar'} Aluno</PageHeader>
            <FormGroup validationState={this.state.erros.name ? 'error' : null}>
              <ControlLabel>Nome</ControlLabel>
              <FormControl type="text" placeholder='Nome' value={this.state.dados.name} onChange={(event) => this.setState({dados: {...this.state.dados, name: event.target.value}})} />
              <HelpBlock>{this.state.erros.name}</HelpBlock>
            </FormGroup>
            <FormGroup validationState={this.state.erros.email ? 'error' : null}>
              <ControlLabel>Email</ControlLabel>
              <FormControl type="text" placeholder='Email' value={this.state.dados.email} onChange={(event) => this.setState({dados: {...this.state.dados, email: event.target.value}})} />
              <HelpBlock>{this.state.erros.email}</HelpBlock>
            </FormGroup>
            <FormGroup validationState={this.state.erros.gender ? 'error' : null}>
              <Radio inline checked={this.state.dados.gender==1} onClick={(event) => this.setState({dados: {...this.state.dados, gender: 1}})}>
                Feminino
              </Radio>
              <Radio inline checked={this.state.dados.gender==2} onClick={(event) => this.setState({dados: {...this.state.dados, gender: 2}})}>
                Masculino
              </Radio>
              <HelpBlock>{this.state.erros.gender}</HelpBlock>
            </FormGroup>
            <FormGroup validationState={this.state.erros.birthday ? 'error' : null}>
              <ControlLabel>Data de Nascimento</ControlLabel>
              <FormControl type="text" placeholder='Nascimento' value={this.state.dados.birthday} onChange={(event) => this.setState({dados: {...this.state.dados, birthday: event.target.value}})} />
              <HelpBlock>{this.state.erros.birthday}</HelpBlock>
            </FormGroup>
            <Row>
              <Col md={1}>
                <Button bsStyle="primary" onClick={this.salvar}>Salvar</Button>
              </Col>
              <Col md={1}>
                <Link to={this.state.editando ? '/student/view/' + this.props.params.studentId : '/students'}><Button bsStyle="default">Cancelar</Button></Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }

}

export default Edit
