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

export function saveUser(success, errors) {
  submitUrl(`users`, null, {email:'patyfurtado_1989@hotmail.com', password:'123456', confirmation_password: '123456'}, success, errors)
}

export function fetchUrl(url, callback) {
  fetch('http://192.168.99.100:3000/api/v1/' + url + '.json')
    .then(res => { return res.json() })
    .then(callback)
    .catch(erro => { console.log(erro) })
}

export function submitUrl(url, id, data, success, errors) {
  var response = null
  fetch('http://192.168.99.100:3000/api/v1/' + url + (id ? '/' + id : ''), {
      method: (id ? 'PATCH' : 'POST'),
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then(res => {
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
