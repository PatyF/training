import React from 'react'
import _ from 'lodash'
import { Alert, Panel, Grid, Row, Col, Table, ButtonToolbar, Button, PageHeader, Label, FormGroup, ControlLabel, FormControl, HelpBlock, Radio } from 'react-bootstrap'
import { Link } from 'react-router'
import Loading from '../../components/Loading'
import InputText from '../../components/InputText'
import InputDate from '../../components/InputDate'
import { getCategory, saveCategory } from '../../tools/api'

var dadosVazios = {
  name: ''
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
    if (isFinite(this.props.params.categoryId)) {
      getCategory(this.props.params.categoryId, dados => {
        this.setState({
          dados,
          editando: true
        })
      })
    }
  }

  salvar = () => {
    saveCategory(this.props.params.categoryId, this.state.dados, (success) => {
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
            <PageHeader>{this.state.editando ? 'Editar' : 'Adicionar'} Categoria</PageHeader>
            <InputText erros={this.state.erros.name} label={"Nome"} value={this.state.dados.name} onChange={(event) => this.setState({dados: {...this.state.dados, name: event.target.value}})} />
            <Row>
              <Col md={1}>
                <Button bsStyle="primary" onClick={this.salvar}>Salvar</Button>
              </Col>
              <Col md={1}>
                <Link to={'/categories'}><Button bsStyle="default">Cancelar</Button></Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }

}

export default Edit
