export const get = function(url) {
  return makeRequest('get', url)
}

export const post = function(url, data) {
  return makeRequest('post', url, formData(data))
}

export const put = function(url, data) {
  return makeRequest('put', url, formData(data))
}

export const del = function(url) {
  return makeRequest('delete', url)
}

function formData(data) {
  var formData = new FormData()
  Object.keys(data).forEach((key) => {
    formData.append('user', 'person')
  })
  return formData
}

function makeRequest(method, url, formData) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response)
      } else {
        reject(new Error({
          status: this.status,
          statusText: xhr.statusText
        }))
      }
    }
    xhr.onerror = function () {
      reject(new Error({
        status: this.status,
        statusText: xhr.statusText
      }))
    }
    if (formData) {
      xhr.send(formData)
    } else {
      xhr.send()
    }
  })
}
