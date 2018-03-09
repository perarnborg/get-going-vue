import * as http from './http'

export function getItems() {
  return new Promise((resolve, reject) => {
    http.get('/items.json')
      .then(response => {
        resolve(JSON.parse(response))
      })
      .catch(error => {
        reject(error)
      })
  })
}
