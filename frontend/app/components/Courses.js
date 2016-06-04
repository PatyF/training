import React from 'react'
import Table from 'react-bootstrap/lib/Table'
import Button from 'react-bootstrap/lib/Button'

class Courses extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [
      {
        "id": 2,
        "name": "xyz",
        "keywords": "x",
        "available": null,
        "created_at": "2016-05-28T22:04:08.000Z",
        "updated_at": "2016-05-28T22:04:08.000Z"
      },
      {
        "id": 3,
        "name": "React Components",
        "keywords": "react;facebook;views",
        "available": true,
        "created_at": "2016-05-29T11:56:23.000Z",
        "updated_at": "2016-05-29T11:56:23.000Z"
      },
      {
        "id": 4,
        "name": "HTML+CSS+JS",
        "keywords": "html;css;javascript",
        "available": true,
        "created_at": "2016-05-29T11:58:01.000Z",
        "updated_at": "2016-05-29T11:58:01.000Z"
      },
      {
        "id": 5,
        "name": "Ruby On Rails",
        "keywords": "ruby;rails;framework",
        "available": false,
        "created_at": "2016-05-29T11:58:44.000Z",
        "updated_at": "2016-05-29T11:58:44.000Z"
      }
    ]};
  }

  render() {
    return(
        <div>
          <Button id="something-btn" type="button" class="btn btn-success btn-sm">
            Something
          </Button>
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
              this.state.data.map((item, key) =>
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

export default Courses;
