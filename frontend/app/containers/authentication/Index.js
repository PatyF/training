import React from 'react'
import _ from 'lodash'
import { Button, PageHeader, FormGroup, ControlLabel, FormControl, HelpBlock, Row, Col } from 'react-bootstrap'
import { authentication } from '../../tools/api'
import { browserHistory } from 'react-router'


var dadosVazios = {
  email: '',
  password: ''
}

class Index extends React.Component {
  constructor() {
    super();
    localStorage.removeItem('auth_token')
    this.state = { dados: dadosVazios, erros: dadosVazios }
  }

  login = () => {
    authentication(this.state.dados, (success) => {
      localStorage.setItem('auth_token', success.auth_token)
      browserHistory.push('/courses')
      javascript:scroll(0, 0);
    }, (errors) => {
      this.setState({ mensagem: { tipo: 'danger', conteudo: 'Dados incorretos para o login.' }, erros: errors.errors })
    })
  }

  render() {
    return(
      <Row>
        <Col mdOffset={4} md={4} className={'box-login'} >
          <PageHeader className={'title-header'}><img className="logo" src="/assets/images/knap.png"/></PageHeader>
          <FormGroup validationState={this.state.erros.email ? 'error' : null}>
            <ControlLabel>Email</ControlLabel>
            <FormControl type="text" placeholder='Email' value={this.state.dados.email} onChange={(event) => this.setState({dados: {...this.state.dados, email: event.target.value}})} />
            <HelpBlock>{this.state.erros.email}</HelpBlock>
          </FormGroup>
          <FormGroup validationState={this.state.erros.password ? 'error' : null}>
            <ControlLabel>Senha</ControlLabel>
            <FormControl type="password" placeholder='Senha' value={this.state.dados.password} onChange={(event) => this.setState({dados: {...this.state.dados, password: event.target.value}})} />
            <HelpBlock>{this.state.erros.password}</HelpBlock>
          </FormGroup>
          <Row>
            <Col md={12} className={'btn-login'}>
              <Button bsStyle='primary' bsSize='large' block onClick={() => this.login()}>Login</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }

}

export default Index
