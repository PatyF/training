import React from 'react'
import _ from 'lodash'
import { Panel, Grid, Row, Col, Table, ButtonToolbar, Button, PageHeader, Label } from 'react-bootstrap'
import { Link } from 'react-router'
import Loading from '../../components/Loading'


class Grade extends React.Component {

  render() {
    return(
      <div>
        <Row>
          <Col md={10} mdOffset={1} className={'box-grades'}>
            <Col md={2}>
              <Row>
                <Row className={'box-grades-value'}>{this.props.watched_videos}/{this.props.number_videos}</Row>
                <Row className={'box-grades-legend'}>Vídeos assistidos</Row>
              </Row>
            </Col>
            <Col md={2}>
              <Row>
                <Row className={'box-grades-value'}>{this.props.answered_activities}/{this.props.number_activities}</Row>
                <Row className={'box-grades-legend'}>Questões respondidas</Row>
              </Row>
            </Col>
            <Col md={2}>
              <Row>
                <Row className={'box-grades-value'}>{this.props.grade}</Row>
                <Row className={'box-grades-legend'}>Aproveitamento</Row>
              </Row>
            </Col>
            <Col md={4}>
            </Col>
            <Col md={2}>
              { this.props.generate_certificate
                ? <Row className={'box-grades-value box-grades-button'}>
                    <Button bsStyle="primary" bsSize="small" onClick={this.props.onGenerateCertified}>
                      {this.props.final_date ? 'Download certificado' : 'Finalizar curso'}
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

export default Grade
