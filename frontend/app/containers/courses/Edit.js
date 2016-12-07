import React from 'react'
import _ from 'lodash'
import { Alert, Panel, Grid, Row, Col, Table, ButtonToolbar, Button, PageHeader, Label, FormGroup, ControlLabel, FormControl, HelpBlock, Checkbox } from 'react-bootstrap'
import { Link } from 'react-router'
import Loading from '../../components/Loading'
import InputText from '../../components/InputText'
import { getCourse, saveCourse, getCategories, getInstructors } from '../../tools/api'

var dadosVazios = {
  name: '',
  keywords: '',
  description: '',
  workload: '',
  instructor_id: '',
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
      editando: false,
      categories: { carregando: true, dados: [] },
      instructors: { carregando: true, dados: [] }
    }
  }

  componentDidMount() {
    if (isFinite(this.props.params.courseId)) {
      getCourse(this.props.params.courseId, dados => {
        dados = dados.course
        this.setState({
          dados,
          editando: true
        })
        this.carregaCategorias()
      })
    }
    getCategories( categories => {
      _.each(categories, (dado, index) => {
        categories = [ ...categories.slice(0,index),
                       {...categories[index],
                          checked: false
                       },
                  ...categories.slice(index + 1)]
      })
      this.setState({
        categories: {
          carregando: false,
          dados: categories
        }
      })
      this.carregaCategorias()
    })
    getInstructors( dados => {
      this.setState({
        instructors: {
          carregando: false,
          dados
        }
      })
    })
  }

  carregaCategorias() {
    if(this.state.editando) {
      var categories = this.state.categories.dados
      _.each(categories, (dado, index) => {
        categories = [ ...categories.slice(0,index),
                       {...categories[index],
                          checked: _.indexOf(_.map(this.state.dados.categories, 'id'), dado.id) >= 0
                       },
                  ...categories.slice(index + 1)]
      })
      this.setState({
        categories: { ...categories,
          dados: categories
        }
      })
    }
  }


  salvar = () => {
    var dados = { ...this.state.dados,
        category_ids: _.map(_.filter(this.state.categories.dados, 'checked'), 'id')
      }
    saveCourse(this.props.params.courseId, dados, (success) => {
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

  checkCategoria = (event, index) => {
    this.setState({
      categories: { ...this.state.categories,
        dados: [ ...this.state.categories.dados.slice(0,index),
                   {...this.state.categories.dados[index],
                      checked: event.target.checked
                   },
                   ...this.state.categories.dados.slice(index + 1)]

      }
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
            <Row>
              <Col md={9}>
                <InputText erros={this.state.erros.name} label={"Nome do curso"} value={this.state.dados.name} onChange={(event) => this.setState({dados: {...this.state.dados, name: event.target.value}})} />
                <InputText erros={this.state.erros.keywords} label={"Palavras Chave"} value={this.state.dados.keywords} onChange={(event) => this.setState({dados: {...this.state.dados, keywords: event.target.value}})} />
                <InputText componentClass="textarea" erros={this.state.erros.description} label={"Descrição"} value={this.state.dados.description} onChange={(event) => this.setState({dados: {...this.state.dados, description: event.target.value}})} />

                <Row>
                  <Col md={8}>
                    <FormGroup validationState={this.state.erros.instructor_id ? 'error' : null}>
                      <ControlLabel>Instrutor</ControlLabel>
                      <FormControl componentClass="select" placeholder="Instrutor" value={this.state.dados.instructor_id || ''} onChange={(event) => this.setState({dados: {...this.state.dados, instructor_id: event.target.value}})}>
                        <option value="">Selecione...</option>
                        {_.map(this.state.instructors.dados, (instructor, key) =>
                          <option key={key} value={instructor.id}>{instructor.name}</option>
                        )}
                      </FormControl>
                      <HelpBlock>{this.state.erros.instructor_id}</HelpBlock>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <InputText erros={this.state.erros.workload} label={"Carga Horária (Horas)"} value={this.state.dados.workload} onChange={(event) => this.setState({dados: {...this.state.dados, workload: event.target.value}})} />
                  </Col>
                </Row>
                <FormGroup validationState={this.state.erros.available ? 'error' : null}>
                  <Checkbox inline checked={this.state.dados.available} onClick={(event) => this.setState({dados: {...this.state.dados, available: event.target.checked}})}>
                    Disponibilizar para os alunos
                  </Checkbox>
                  <HelpBlock>{this.state.erros.available}</HelpBlock>
                </FormGroup>
              </Col>
              <Col md={3}>
                <ControlLabel>Categorias</ControlLabel>
                <Panel className={'panel-categories'}>
                  <Loading carregando={this.state.categories.carregando}>
                    {
                      _.map(this.state.categories.dados, (dado, key) =>
                        <Checkbox key={key} checked={dado.checked} onClick={(event) => this.checkCategoria(event, key)}>
                          {dado.name}
                        </Checkbox>
                      )
                    }
                  </Loading>
                </Panel>
              </Col>
            </Row>
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
