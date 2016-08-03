import React from 'react'
import _ from 'lodash'
import { Panel, Grid, Row, Col, Table, ButtonToolbar, Button, PageHeader, Label } from 'react-bootstrap'
import { Link } from 'react-router'
import Loading from '../../components/Loading'


class Index extends React.Component {

  constructor() {
    super();
    this.state = { carregando: true }
  }

  componentDidMount() {
    fetch('http://192.168.99.100:3000/courses.json')
      .then(res => { return res.json() })
      .then(json => {
          this.setState({
            dados: _.sortBy(json, 'name'),
            carregando: false
          })
        }
      )
      .catch(erro => { console.log(erro) })
  }

  render() {
    return(
      <div>
        <Grid>
          <Row>
            <Col>
              <PageHeader>Cursos</PageHeader>
            </Col>
          </Row>
          <Panel>
            <Loading carregando={this.state.carregando}>
              <Table responsive >
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Keywords</th>
                    <th>Disponível</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {_.map(this.state.dados, (course, idx) =>
                    <tr key={idx}>
                      <td>{course.id}</td>
                      <td>{course.name}</td>
                      <td>{course.keywords}</td>
                      <td>{course.available ? 'Disponível' : 'Indisponível'}</td>
                      <td><Link to={`/courses/register/${course.id}`}> Editar </Link></td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Loading>
          </Panel>
        </Grid>
      </div>
    )
  }

}

export default Index
