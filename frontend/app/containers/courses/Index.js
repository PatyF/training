import React from 'react'
import _ from 'lodash'
import { Panel, Grid, Row, Col, Table, ButtonToolbar, Button, PageHeader, Label } from 'react-bootstrap'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import Loading from '../../components/Loading'
import { getCourses, saveUser } from '../../tools/api'


class Index extends React.Component {

  constructor() {
    super();
    this.state = { carregando: true, dados: [] }
  }

  componentDidMount() {
    getCourses(json => {
      this.setState({
        dados: _.sortBy(json, 'name'),
        carregando: false
      })
    })
  }

  salvar = () => {
    saveUser((success) => {
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
        <Col>
          <PageHeader className={'title-header'}>Cursos</PageHeader>
          <Button bsStyle="primary" onClick={this.salvar}>Teste</Button>
        </Col>
        <Loading carregando={this.state.carregando}>
          <Row >
            {_.map(this.state.dados, (course, idx) =>
                <Col key={idx} md={4} className={'box'}>
                  <Link to={`/courses/view/${course.id}`}>
                    <Panel className={`box-height color${idx%5 + 1}`}>
                      <div className={'text'}>{course.name}</div>
                    </Panel>
                  </Link>
                </Col>
            )}
            <Col md={4} className={'box'}>
              <Link to={'/courses/register'}>
                <Panel className={'box color0'}>
                  <div className={'box-align'}>
                    <div className={'new-icon glyphicon glyphicon-plus'}></div>
                    <div className={'text'}>Adicionar Curso</div>
                  </div>
                </Panel>
              </Link>
            </Col>
          </Row>
        </Loading>
      </div>
    )
  }

}

export default Index
