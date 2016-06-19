import React, { Component, PropTypes } from 'react'
import Table from 'react-bootstrap/lib/Table'
import Button from 'react-bootstrap/lib/Button'

class Courses extends Component {

  componentDidMount() {
    this.props.fetchCourses()
  }

  render(){
    const { courses, isFetching } = this.props
    if(isFetching)
      return(
        <div>Carregando...</div>
      )
    else
      return(
          <div>
            <Table >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome do Curso</th>
                  <th>Palavras Chave</th>
                  <th>Disponível</th>
                </tr>
              </thead>
              <tbody >
              {
                courses.map((item, key) =>
                    <tr key={key}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.keywords}</td>
                      <td>{item.available ? "Disponível":""}</td>
                    </tr>
                )
              }
              </tbody>
            </Table>
          </div>
        )
  }
}


Courses.propTypes = {
  courses: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchCourses: PropTypes.func.isRequired
}


export default Courses;
