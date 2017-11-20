const fs = require('fs')
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
  console.log(g)
  if (callback) callback()
}

async function Main() {
  const gyms = require('../gyms.json')

  eachLimit(gyms, 1, addCity, function(err) {
    if (err) {
      console.log(err)
    }
    else {
      console.log('All', gyms.length, 'gyms processed')
      fs.writeFile('gyms-with-city.json', JSON.stringify(gyms), (err) => console.log('Gyms saved in gyms-with-city.json', err))
    }
  })
}

Main()
  .then()
  .catch()
