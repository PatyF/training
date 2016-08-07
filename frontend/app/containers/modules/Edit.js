import React from 'react'
import _ from 'lodash'
import { Alert, Panel, Grid, Row, Col, Table, ButtonToolbar, Button, PageHeader, Label, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import { Link } from 'react-router'
import Loading from '../../components/Loading'
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
              <PageHeader>{this.state.editando ? 'Editar' : 'Adicionar'} Módulo</PageHeader>
            </Col>
          </Row>
          <Panel className="showgrid">
            <FormGroup validationState={this.state.erros.title ? 'error' : null}>
              <ControlLabel>Título</ControlLabel>
              <FormControl type="text" placeholder='Título' value={this.state.dados.title} onChange={(event) => this.setState({dados: {...this.state.dados, title: event.target.value}})} />
              <HelpBlock>{this.state.erros.title}</HelpBlock>
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
