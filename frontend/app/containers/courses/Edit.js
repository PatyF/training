import React from 'react'
import _ from 'lodash'
import { Panel, Grid, Row, Col, Table, ButtonToolbar, Button, PageHeader, Label, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import { Link } from 'react-router'
import Loading from '../../components/Loading'


class Edit extends React.Component {

  constructor() {
    super();
    this.state = {
      dados: {
        name: '',
        keywords: '',
        available: ''
      },
      errors:{}
    }
  }

  componentDidMount() {

  }

  render() {
    return(
      <div>
        <Grid>
          <Row>
            <Col md={10} xs={8}>
              <PageHeader>Editar</PageHeader>
            </Col>
          </Row>
          <Panel className="showgrid">
            <FormGroup validationState={this.state.errors.name ? 'error' : null}>
              <ControlLabel>Nome</ControlLabel>
              <FormControl type="text" placeholder='Nome' value={this.state.dados.name} onChange={(event) => this.setState({dados: {...this.state.dados, name: event.target.value}})} />
              <HelpBlock>{this.state.errors.name}</HelpBlock>
            </FormGroup>
            <FormGroup validationState={this.state.errors.keywords ? 'error' : null}>
              <ControlLabel>Keywords</ControlLabel>
              <FormControl type="text" placeholder='Keywords' value={this.state.dados.keywords} onChange={(event) => this.setState({dados: {...this.state.dados, keywords: event.target.value}})} />
              <HelpBlock>{this.state.errors.keywords}</HelpBlock>
            </FormGroup>
            <FormGroup validationState={this.state.errors.available ? 'error' : null}>
              <ControlLabel>Available</ControlLabel>
              <FormControl type="text" placeholder='Disponível' value={this.state.dados.available} onChange={(event) => this.setState({dados: {...this.state.dados, available: event.target.value}})} />
              <HelpBlock>{this.state.errors.available}</HelpBlock>
            </FormGroup>
          </Panel>
        </Grid>
      </div>
    )
  }

}

export default Edit
