import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import moment from 'moment'
import { Panel, Grid, Row, Col, FormGroup, ControlLabel, FormControl, ButtonToolbar, Button, PageHeader, Label } from 'react-bootstrap'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import Loading from '../../components/Loading'
import ViewVideos from '../videos/View'
import Grades from './Grades'
import Comment from './Comment'
import { getCourse, getCourseStudents } from '../../tools/api'
import Authorize from '../../components/Authorize'
import { PROFILE_ADMIN, PROFILE_INSTRUCTOR, PROFILE_STUDENT } from '../../tools/profiles'


class Index extends React.Component {

  constructor() {
    super();
    this.state = {
      carregando: true,
      course: '',
    }
  }

  componentDidMount() {
    getCourse(this.props.params.courseId, course => {
      this.setState({
        course: course.course
      })
    })
    getCourseStudents(this.props.params.courseId, students => {
      this.setState({
        students: students.students,
        carregando: false
      })
    })
  }

  render() {
    return(
      <div>
        <Row>
          <Col md={10} mdOffset={1}>
            <Loading carregando={this.state.carregando}>
              <Row>
                <PageHeader className='title-header'>
                  {this.state.course.name}
                </PageHeader>
              </Row>
              <Row className='header-modulo'>
                <Col md={5}>
                  Aluno
                </Col>
                <Col md={2}>
                  Vídeos
                </Col>
                <Col md={2}>
                  Questões
                </Col>
                <Col md={1}>
                  Nota
                </Col>
                <Col md={2}>
                  Fim
                </Col>
              </Row>
              { _.map(this.state.students, (student, idx) =>
                <div  key={idx}>
                  <Row className={`body-modulo color-modulo${idx%2+1}`}>
                    <Col md={5}>
                      {student.name}
                    </Col>
                    <Col md={2}>
                      {student.watched_videos}/{student.number_videos}
                    </Col>
                    <Col md={2}>
                      {student.answered_activities}/{student.number_activities}
                    </Col>
                    <Col md={1}>
                      {student.grade}
                    </Col>
                    <Col md={2}>
                      {student.final_date}
                    </Col>
                  </Row>
                </div>
              )}
            </Loading>
          </Col>
        </Row>
      </div>
    )
  }

}

let mapStateToProps = state => ({
  profile: state.auth.profile.profile,
  profileId: state.auth.profile.id
})

export default connect(mapStateToProps)(Index)
