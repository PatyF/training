import React from 'react'
import _ from 'lodash'
import { Alert, Panel, Grid, Row, Col, Table, ButtonToolbar, Button, PageHeader, Label, FormGroup, ControlLabel, FormControl, HelpBlock, Checkbox } from 'react-bootstrap'
import { Link } from 'react-router'
import Loading from '../../components/Loading'
import InputText from '../../components/InputText'
import { getCourse, saveCourse } from '../../tools/api'

var dadosVazios = {
  name: '',
  keywords: '',
  available: false
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
    if (isFinite(this.props.params.courseId)) {
      getCourse(this.props.params.courseId, dados => {
        this.setState({
          dados,
          editando: true
        })
      })
    }
  }

  salvar = () => {
    let response = null
    saveCourse(this.props.params.courseId, this.state.dados, (success) => {
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
            <PageHeader>{this.state.editando ? 'Editar' : 'Adicionar'} Curso</PageHeader>
            <InputText erros={this.state.erros.name} label={"Nome"} value={this.state.dados.name} onChange={(event) => this.setState({dados: {...this.state.dados, name: event.target.value}})} />
            <InputText erros={this.state.erros.keywords} label={"Palavras Chave"} value={this.state.dados.keywords} onChange={(event) => this.setState({dados: {...this.state.dados, keywords: event.target.value}})} />
            <FormGroup validationState={this.state.erros.available ? 'error' : null}>
              <Checkbox inline checked={this.state.dados.available} onClick={(event) => this.setState({dados: {...this.state.dados, available: event.target.checked}})}>
                Disponível
              </Checkbox>
              <HelpBlock>{this.state.erros.available}</HelpBlock>
            </FormGroup>
            <Row>
              <Col md={1}>
                <Button bsStyle="primary" onClick={this.salvar}>Salvar</Button>
              </Col>
              <Col md={1}>
                <Link to={this.state.editando ? '/courses/view/' + this.props.params.courseId : '/'}><Button bsStyle="default">Cancelar</Button></Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }

}

export default Edit
