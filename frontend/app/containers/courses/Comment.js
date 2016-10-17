import React from 'react'
import _ from 'lodash'
import { Panel, Grid, Row, Col, Table, ButtonToolbar, Button, PageHeader, Label, ControlLabel } from 'react-bootstrap'
import { Link } from 'react-router'
import InputText from '../../components/InputText'


class Comment extends React.Component {
  render() {
    return(
      <div>
        <Row>
          <Col md={10} mdOffset={1} className={'box-grades margin-top-comment'}>
            <Col md={4}>
              <Row>
                <ControlLabel className='margin-grade'>Sua nota para o curso</ControlLabel>
              </Row>
              <Row>
                <Button bsStyle='link' disabled={this.props.comment.saved ? true : false} className='grade' onClick={() => this.props.onChangeGrade(1)}><span className={this.props.comment.grade >= 1 ? 'nota glyphicon glyphicon-star' : 'glyphicon glyphicon-star-empty'}/></Button>
                <Button bsStyle='link' disabled={this.props.comment.saved ? true : false} className='grade' onClick={() => this.props.onChangeGrade(2)}><span className={this.props.comment.grade >= 2 ? 'nota glyphicon glyphicon-star' : 'glyphicon glyphicon-star-empty'}/></Button>
                <Button bsStyle='link' disabled={this.props.comment.saved ? true : false} className='grade' onClick={() => this.props.onChangeGrade(3)}><span className={this.props.comment.grade >= 3 ? 'nota glyphicon glyphicon-star' : 'glyphicon glyphicon-star-empty'}/></Button>
                <Button bsStyle='link' disabled={this.props.comment.saved ? true : false} className='grade' onClick={() => this.props.onChangeGrade(4)}><span className={this.props.comment.grade >= 4 ? 'nota glyphicon glyphicon-star' : 'glyphicon glyphicon-star-empty'}/></Button>
                <Button bsStyle='link' disabled={this.props.comment.saved ? true : false} className='grade' onClick={() => this.props.onChangeGrade(5)}><span className={this.props.comment.grade >= 5 ? 'nota glyphicon glyphicon-star' : 'glyphicon glyphicon-star-empty'}/></Button>
              </Row>
            </Col>
            <Col md={6}>
              <InputText disabled={this.props.comment.saved ? true : false} componentClass="textarea" label={"Seu depoimento"} value={this.props.comment.comment} onChange={this.props.onChangeComment} />
            </Col>
            <Col md={2}>
              { !this.props.comment.saved
                ? <Row className={'box-grades-value box-grades-button'}>
                    <Button bsStyle="primary" bsSize="small" onClick={this.props.onSaveComment}>
                      Salvar comentário
                    </Button>
                  </Row>
                : null
              }
            </Col>
          </Col>
        </Row>
      </div>
    )
  }

}

export default Comment
