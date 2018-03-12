export const getNextId = function(list) {
  let nextId = 1
  if (list.length) {
    nextId = list.reduce((a, b) => {
      return Math.max(a.id, b.id)
    }).id + 1
  }
  return nextId
}
