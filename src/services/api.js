import * as http from './http'

export const NETWORK_STATUSES = {
  WAITING: 0,
  GETTING: 1,
  SUBMITTING: 2,
  SUCCESS: 3,
  ERROR: 4
}

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
