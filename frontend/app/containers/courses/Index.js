import React from 'react'
import _ from 'lodash'
import { Panel, Grid, Row, Col, Table, ButtonToolbar, Button, PageHeader, Label, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import Loading from '../../components/Loading'
import { getCourses, getCategories } from '../../tools/api'
import Authorize from '../../components/Authorize'
import { PROFILE_ADMIN, PROFILE_INSTRUCTOR, PROFILE_STUDENT } from '../../tools/profiles'
import InputText from '../../components/InputText'

class Index extends React.Component {

  constructor() {
    super();
    this.state = { carregando: true,
      dados_filtrados: [],
      dados: [],
      categorias: [],
      categoria_id: '',
      palavra: '',
    }
  }

  componentDidMount() {
    getCourses(json => {
      this.setState({
        dados_filtrados: _.sortBy(json.courses, 'name'),
        dados: _.sortBy(json.courses, 'name'),
        carregando: false
      })
    })
    getCategories(json => {
      this.setState({
        categorias:json
      })
    })
  }

  onChangeCategoria = (event) => {
    this.setFilter(event.target.value, this.state.palavra)
  }

  onChangePalavra = (event) => {
    this.setFilter(this.state.categoria_id, event.target.value)
  }

  setFilter(categoria_id, palavra ) {
    var dados_filtrados = this.state.dados
    if (parseInt(categoria_id, 10) >= 0) {
      dados_filtrados = _.filter(dados_filtrados, (course) => {
        return course.categories.indexOf(parseInt(categoria_id, 10)) >= 0
      })
    }
    if (palavra != '') {
      dados_filtrados = _.filter(dados_filtrados, (course) => {
        return course.keywords.indexOf(palavra) >= 0
      })
    }
    this.setState({palavra: palavra, categoria_id: categoria_id, dados_filtrados: dados_filtrados})
  }

  render() {
    return(
      <div>
        <Loading carregando={this.state.carregando}>
          <Form inline className="filtrar-categoria">
            <FormGroup>
              <ControlLabel className="filtrar-categoria-label" >Filtrar por Categoria: </ControlLabel>
              <FormControl className="filtrar-categoria-select" componentClass="select" placeholder="Categorias" value={this.state.categoria_id || ''} onChange={this.onChangeCategoria}>
                <option value="">Categoria...</option>
                {_.map(this.state.categorias, (categoria, key) =>
                  <option key={key} value={categoria.id}>{categoria.name}</option>
                )}
              </FormControl>
            </FormGroup>
            <FormGroup className="filtrar-group">
              <ControlLabel className="filtrar-categoria-label" >Filtrar por palavra-chave: </ControlLabel>
              <InputText className="filtrar-categoria-select" value={this.state.palavra} onChange={this.onChangePalavra} />
            </FormGroup>
          </Form>
          <Row >
            {_.map(this.state.dados_filtrados, (course, idx) =>
                <Col key={idx} md={3} className={'box'}>
                  <Link to={`/courses/view/${course.id}`}>
                    <Panel className={`box-height box-color${idx%2+1}`}>
                      <div className={'box-average'}>{course.average_grades == 0 ? <div className={'height-nota'}/> : <div className={'height-nota'}>{Array(course.average_grades).fill().map((e,i)=><span key={i} className={'nota nota-index glyphicon glyphicon-star'}/>)}</div>}</div>
                      <div className={'box-text'}>{course.name}</div>
                      <div className={'box-keywords'}>{course.keywords}</div>
                    </Panel>
                  </Link>
                </Col>
            )}
            <Authorize viewFor={PROFILE_ADMIN}>
              <Col md={3} className={'box'}>
                <Link to={'/courses/register'}>
                  <Panel className={'box-height box-color0'}>
                    <div className={'height-nota'}/>
                    <div className={'box-text'}>Adicionar Curso</div>
                  </Panel>
                </Link>
              </Col>
            </Authorize>
          </Row>
        </Loading>
      </div>
    )
  }

}

export default Index
