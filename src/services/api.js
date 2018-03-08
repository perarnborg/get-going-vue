import * as http from './http'

export function getItems() {
  return new Promise((resolve, reject) => {
    http.get('/items.json')
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}
