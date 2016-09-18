import { browserHistory } from 'react-router'

export function getStudents(callback) {
  fetchUrl('students', (json) => callback(json))
}

export function getStudent(id, callback) {
  fetchUrl(`students/${id}`, (json) => callback(json))
}

export function saveStudent(id, data, success, errors) {
  submitUrl('students', id, data, success, errors)
}

export function getInstructors(callback) {
  fetchUrl('instructors', (json) => callback(json))
}

export function getInstructor(id, callback) {
  fetchUrl(`instructors/${id}`, (json) => callback(json))
}

export function saveInstructor(id, data, success, errors) {
  submitUrl('instructors', id, data, success, errors)
}

export function getCategories(callback) {
  fetchUrl('categories', (json) => callback(json))
}

export function getCategory(id, callback) {
  fetchUrl(`categories/${id}`, (json) => callback(json))
}

export function saveCategory(id, data, success, errors) {
  submitUrl('categories', id, data, success, errors)
}

export function getCourses(callback) {
  fetchUrl('courses', (json) => callback(json))
}

export function getCourse(id, callback) {
  fetchUrl(`courses/${id}`, (json) => callback(json))
}

export function saveCourse(id, data, success, errors) {
  submitUrl('courses', id, data, success, errors)
}

export function getModules(idCourse, callback) {
  fetchUrl(`courses/${idCourse}/modulos`, (json) => callback(json))
}

export function getModule(idCourse, idModule, callback) {
  fetchUrl(`courses/${idCourse}/modulos/${idModule}`, (json) => callback(json))
}

export function saveModule(idCourse, idModule, data, success, errors) {
  submitUrl(`courses/${idCourse}/modulos`, idModule, data, success, errors)
}

export function getVideos(idCourse, idModule, callback) {
  fetchUrl(`courses/${idCourse}/modulos/${idModule}/videos`, (json) => callback(json))
}

export function getVideo(idCourse, idModule, idVideo, callback) {
  fetchUrl(`courses/${idCourse}/modulos/${idModule}/videos/${idVideo}`, (json) => callback(json))
}

export function saveVideo(idCourse, idModule, idVideo, data, success, errors) {
  submitUrl(`courses/${idCourse}/modulos/${idModule}/videos`, idVideo, data, success, errors)
}

export function getActivities(idCourse, idModule, callback) {
  fetchUrl(`courses/${idCourse}/modulos/${idModule}/activities`, (json) => callback(json))
}

export function getActivity(idCourse, idModule, idActivity, callback) {
  fetchUrl(`courses/${idCourse}/modulos/${idModule}/activities/${idActivity}`, (json) => callback(json))
}

export function saveActivity(idCourse, idModule, idActivity, data, success, errors) {
  submitUrl(`courses/${idCourse}/modulos/${idModule}/activities`, idActivity, data, success, errors)
}

export function authentication(data, success, errors) {
  var response = null
  fetch('http://192.168.99.100:3000/auth_user', {
    method: ('POST'),
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(data)
  })
  .then(res => {
    response = res
    return res.json()
  })
  .then(json => {
    if (response.status < 400) success(json)
    else errors(json)

  })
  .catch(erro => { console.log(erro) })
}

export function fetchUrl(url, callback) {
  fetch('http://192.168.99.100:3000/api/v1/' + url + '.json',{
      headers : {'Authorization': 'Bearer ' + localStorage.getItem('auth_token')}
    })
    .then(res => {
      if (res.status == 401) browserHistory.push('/login')
      return res.json()
    })
    .then(callback)
    .catch(erro => { console.log(erro) })
}

export function submitUrl(url, id, data, success, errors) {
  var response = null
  fetch('http://192.168.99.100:3000/api/v1/' + url + (id ? '/' + id : ''), {
      method: (id ? 'PATCH' : 'POST'),
      headers: {'content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('auth_token')},
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.status == 401) browserHistory.push('/login')
      response = res
      if (response.status < 400 && id) return res
      return res.json()
    })
    .then(json => {
      if (response.status < 400) success(json)
      else errors(json)

    })
    .catch(erro => { console.log(erro) })
}
