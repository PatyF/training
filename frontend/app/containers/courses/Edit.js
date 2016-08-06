import React from 'react'
import _ from 'lodash'
import { Alert, Panel, Grid, Row, Col, Table, ButtonToolbar, Button, PageHeader, Label, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import { Link } from 'react-router'
import Loading from '../../components/Loading'
import { saveCourse } from '../../tools/api'

var dadosVazios = {
  name: '',
  keywords: '',
  available: ''
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
    this.setState({ editando: isFinite(this.props.params.courseId) })
    if (this.props.params.courseId) {
      fetch(`http://192.168.99.100:3000/courses/${this.props.params.courseId}`)
        .then(res => { return res.json() })
        .then((dados) => {
          this.setState({ dados, editando: true }) })
        .catch(erro => { console.log(erro) })
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
        <Grid>
          <Row>
            { this.state.mensagem.tipo ?
              <Alert bsStyle={this.state.mensagem.tipo}>
                {this.state.mensagem.conteudo}
              </Alert>
            : null }
            <Col md={10} xs={8}>
              <PageHeader>{this.state.editando ? 'Editar' : 'Adicionar'} Curso</PageHeader>
            </Col>
          </Row>
          <Panel className="showgrid">
            <FormGroup validationState={this.state.erros.name ? 'error' : null}>
              <ControlLabel>Nome</ControlLabel>
              <FormControl type="text" placeholder='Nome' value={this.state.dados.name} onChange={(event) => this.setState({dados: {...this.state.dados, name: event.target.value}})} />
              <HelpBlock>{this.state.erros.name}</HelpBlock>
            </FormGroup>
            <FormGroup validationState={this.state.erros.keywords ? 'error' : null}>
              <ControlLabel>Keywords</ControlLabel>
              <FormControl type="text" placeholder='Keywords' value={this.state.dados.keywords} onChange={(event) => this.setState({dados: {...this.state.dados, keywords: event.target.value}})} />
              <HelpBlock>{this.state.erros.keywords}</HelpBlock>
            </FormGroup>
            <FormGroup validationState={this.state.erros.available ? 'error' : null}>
              <ControlLabel>Available</ControlLabel>
              <FormControl type="text" placeholder='Disponível' value={this.state.dados.available} onChange={(event) => this.setState({dados: {...this.state.dados, available: event.target.value}})} />
              <HelpBlock>{this.state.erros.available}</HelpBlock>
            </FormGroup>
            <Button bsStyle="primary" bsSize="small" onClick={this.salvar}>Salvar</Button>
          </Panel>
        </Grid>
      </div>
    )
  }

}

export default Edit
