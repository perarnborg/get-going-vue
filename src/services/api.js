import * as http from './http'

export function getItems() {
  return new Promise((resolve, reject) => {
    http
      .get('/items.json')
      .then(response => {
        console.log(response)
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
