import React from 'react'
import _ from 'lodash'
import { Panel, Grid, Row, Col, Table, ButtonToolbar, Button, PageHeader, Label } from 'react-bootstrap'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import Loading from '../../components/Loading'
import { getCategories } from '../../tools/api'


class Index extends React.Component {

  constructor() {
    super();
    this.state = { carregando: true, dados: [] }
  }

  componentDidMount() {
    getCategories(json => {
      this.setState({
        dados: json,
        carregando: false
      })
    })
  }

  render() {
    return(
      <div>
        <Row>
          <PageHeader className='title-header'>
            Categorias
          </PageHeader>
        </Row>
        <Row className='header-modulo'>
          <Col md={11}>
            <span className="icon-modulo glyphicon glyphicon-th-list" aria-hidden="true"></span>
            Nome
          </Col>
          <Col md={1}>
          </Col>
        </Row>
        <Loading carregando={this.state.carregando}>
          { _.map(this.state.dados, (dado, idx) =>
            <div  key={idx}>
              <Row className={`body-modulo color-modulo${idx%2+1}`}>
                <Col md={11}>
                  {dado.name}
                </Col>
                <Col md={1}>
                  <Link title="Editar Categoria" to={`/categories/register/${dado.id}`}><span className="icons sub-icon glyphicon glyphicon-pencil"></span></Link>
                </Col>
              </Row>
            </div>
          )}
        </Loading>
        <Link title="Nova Categoria" to={`/categories/register`}>
          <Row className={`body-modulo color-modulo0`}>
            <Col md={8}>
              <Button bsStyle="link" className={`title-modulo`}>Adicionar Categoria</Button>
            </Col>
            <Col md={3}>
            </Col>
            <Col md={1}>
              <span className="icons sub-icon glyphicon glyphicon-plus"></span>
            </Col>
          </Row>
        </Link>
      </div>
    )
  }

}

export default Index
