import React, { Component, PropTypes } from 'react'
import Table from 'react-bootstrap/lib/Table'
import Button from 'react-bootstrap/lib/Button'
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'

class CoursesNew extends React.Component {
  constructor(){
    super();
    this.state = { value: '' }
  }

  handleChange(e) {
    console.log(e);
  }

  render() {
    return (
      <form>
        <FormGroup controlId="formBasicText">
          <ControlLabel>Nome</ControlLabel>
          <FormControl type="text" placeholder="Nome do Curso" />
        </FormGroup>
        <FormGroup controlId="formBasicText">
          <ControlLabel>Palavras-chave</ControlLabel>
          <FormControl type="text" placeholder="Palavras;Chave;" />
        </FormGroup>
        <FormGroup controlId="formBasicText">
          <ControlLabel>Descrição</ControlLabel>
          <FormControl componentClass="textarea" placeholder="Descrição do Curso" />
        </FormGroup>
      </form>
    );
  }
}

CoursesNew.propTypes = {
  coursesNew: PropTypes.func.isRequired
}

export default CoursesNew;
