const querystring = require('querystring')
const Promise = require('bluebird')
const eachLimit = require('async/eachLimit')
const fetch = require('node-fetch')

const api = 'https://nominatim.openstreetmap.org/reverse'

async function addCity (g, callback) {
  const params = {
    lat: 43.313176,
    lon: 11.328049,
    format: 'json'
  }
  const res = await fetch(`${api}?${querystring.stringify(params)}`, {
    headers: { 'User-Agent': 'pogo-gyms-bot' }
  })
  const body = await res.json()
  g.city = body.address.city
  callback()
}

async function Main() {
  const gyms = require('../gyms.json').slice(0, 1)

  eachLimit(gyms, 1, addCity, function(err) {
    console.log(err, gyms)
  })

} 

Main()
  .then()
  .catch()
