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

export function getDocuments(idCourse, idModule, callback) {
  fetchUrl(`courses/${idCourse}/modulos/${idModule}/documents`, (json) => callback(json))
}

export function getDocument(idCourse, idModule, idDocument, callback) {
  fetchUrl(`courses/${idCourse}/modulos/${idModule}/documents/${idDocument}`, (json) => callback(json))
}

export function deleteDocument(idCourse, idModule, idDocument, success, errors) {
  deleteUrl(`courses/${idCourse}/modulos/${idModule}/documents/`,idDocument, success, errors)
}

export function savePositionVideo(idCourse, idModule, idVideo, data, success, errors) {
  submitUrl(`courses/${idCourse}/modulos/${idModule}/videos/${idVideo}/position_video`, '' , data, success, errors)
}

export function getPositionVideo(idCourse, idModule, idVideo, callback) {
  fetchUrl(`courses/${idCourse}/modulos/${idModule}/videos/${idVideo}/position_video`, (json) => callback(json))
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

export function getStudentActivity(idCourse, idModule, idActivity, callback) {
  fetchUrl(`courses/${idCourse}/modulos/${idModule}/activities/${idActivity}/question_student`, (json) => callback(json))
}

export function saveStudentActivity(idCourse, idModule, idActivity, answer_student, callback) {
  submitUrl(`courses/${idCourse}/modulos/${idModule}/activities/${idActivity}/answer_student`, '', answer_student, (json) => callback(json))
}

export function getProfile(callback) {
  fetchUrl(`profile`, (json) => callback(json))
}

export function getRegistry(idCourse, callback) {
  fetchUrl(`courses/${idCourse}/registry`, (json) => callback(json))
}

export function saveRegistry(idCourse, success, errors) {
  submitUrl(`courses/${idCourse}/registry`, '', '', success, errors)
}

export function saveActivity(idCourse, idModule, idActivity, data, success, errors) {
  submitUrl(`courses/${idCourse}/modulos/${idModule}/activities`, idActivity, data, success, errors)
}

export function getComment(idCourse, callback) {
  fetchUrl(`courses/${idCourse}/comment`, (json) => callback(json))
}

export function saveComment(idCourse, data, success, errors) {
  submitUrl(`courses/${idCourse}/comment`, '', data, success, errors)
}

export function getComments(idCourse, callback) {
  fetchUrl(`courses/${idCourse}/comments`, (json) => callback(json))
}

export function getCourseStudents(idCourse, callback) {
  fetchUrl(`courses/${idCourse}/students`, (json) => callback(json))
}

export function getStudentCourses(idStudent, callback) {
  fetchUrl(`students/${idStudent}/grades`, (json) => callback(json))
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

function deleteUrl(url, id, successCallback, errorCallback) {
  let response = null
  fetch('http://192.168.99.100:3000/api/v1/' + url + id, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': 'Bearer ' + localStorage.getItem('auth_token')},
    })
    .then((res) => {
      if (res.status < 400) {
        if (successCallback) successCallback(response)
      } else {
        if (errorCallback) errorCallback(response)
      }
    })
    .catch(erro => { console.log(erro) })

}

export function saveDocument(courseId, moduleId, files, successCallback, errorCallback) {
  var data = new FormData()
  if (files) {
    data.append('file', files[0])
    data.append('fileName', files[0].name)
  } else {
    data.append('fileName', '')
  }
  var url = `courses/${courseId}/modulos/${moduleId}/documents`

  let response = null
  data.append('_method', 'POST')
  fetch('http://192.168.99.100:3000/api/v1/' + url, {
      method: 'POST',
      headers: {'authorization': 'Bearer ' + localStorage.getItem('auth_token')},
      body: data
    })
    .then((res) => {
      return res.json().then(response => {
        if (res.status < 400) {
          if (successCallback) successCallback(response)
        } else {
          if (errorCallback) errorCallback(response)
        }
        return response
      })
    })
    .catch(erro => { console.log(erro) })
}

export function download(url, fileName) {
  fetch('http://192.168.99.100:3000/api/v1/' + url, {
      headers: {'authorization': 'Bearer ' + localStorage.getItem('auth_token')},
    })
    .then(res => res.blob())
    .then(blob => {
      var windowUrl = window.URL || window.webkitURL
      var binaryData = []
      binaryData.push(blob)
      var urlDownload = windowUrl.createObjectURL(new Blob(binaryData))
      var anchor = document.createElement('a')
      anchor.href = urlDownload
      anchor.download = fileName
      anchor.click()
      windowUrl.revokeObjectURL(urlDownload)
    })
    .catch(erro => { console.log(erro) })
}
