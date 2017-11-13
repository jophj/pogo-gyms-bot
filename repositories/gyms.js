const lunr = require('lunr')
require("lunr-languages/lunr.stemmer.support")(lunr)
require("lunr-languages/lunr.it")(lunr)

const gyms = require('../gyms.json')
const db = {}

console.log('Initializing index for', gyms.length, 'gyms')
var idx = lunr(function () {
  this.use(lunr.it)
  this.field('name')
  this.field('city')

  gyms.forEach(function (g) {
    db[g.id] = g
    this.add(g)
  }, this)
})
console.log('...done.')

function searchGym(queryString) {
  if (!queryString) return []

  const results = idx
    .search(queryString)
    .map(r => db[r.ref])

  return results
}

module.exports = {
  searchGym: searchGym
}
