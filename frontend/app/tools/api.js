export function getCourses(callback) {
  fetchUrl('courses.json', (json) => callback(json))
}

export function saveCourse(id, data, success, errors) {
  submitUrl('courses', id, data, success, errors)
}

export function fetchUrl(url, callback) {
  fetch('http://192.168.99.100:3000/' + url)
    .then(res => { return res.json() })
    .then(callback)
    .catch(erro => { console.log(erro) })
}

export function submitUrl(url, id, data, success, errors) {
  var response = null
  fetch('http://192.168.99.100:3000/' + url + (id ? '/' + id : ''), {
      method: (id ? 'PATCH' : 'POST'),
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then(res => {
      response = res
      return res
    })
    .then(json => {
      if (response.status < 400) success(json)
      else errors(json)

    })
    .catch(erro => { console.log(erro) })
}
