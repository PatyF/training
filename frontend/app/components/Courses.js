import React from 'react'
import Table from 'react-bootstrap/lib/Table'
import Button from 'react-bootstrap/lib/Button'

const Courses = ({ courses })  => {
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


export default Courses;
