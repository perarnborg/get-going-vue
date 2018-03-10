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

export function updateItem(item) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(item)
    }, 1000)
  })
}

export function createItem(item) {
  return new Promise((resolve) => {
    setTimeout(() => {
      item.id = Math.floor(Math.random() * 1000)
      resolve(item)
    }, 1000)
  })
}
