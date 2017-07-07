const db = require('../gyms.json')

function searchGym(queryString) {
  if (!queryString) return []
  const results = db.filter(g => {
    let tokens = queryString.trim().split(' ')
    return tokens.every(t => {
      return g.name.toLowerCase().indexOf(t.toLowerCase()) > -1
    })
  })

  return results
}

module.exports = {
  searchGym: searchGym
}
