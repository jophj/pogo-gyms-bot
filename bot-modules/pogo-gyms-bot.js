const Promise = require('bluebird')
const BotModule = require('../pogo-gyms-bot/bot-module')
const GymsRepo = require('../repositories/gyms.js')

function locationResultMapper(gym) {
  return {
    type: 'location',
    id: gym.id,
    latitude: gym.latitude,
    longitude: gym.longitude,
    title: gym.name,
    thumb_url: gym.imageUrl
  }
}

class PogoGymsBotModule extends BotModule {
  initModule() {
    this.bot.on('inline_query', (ctx) => {
      const query = ctx.update.inline_query || ''
      const results = GymsRepo.searchGym(query.query)
      const telegramResults = results.map(locationResultMapper)
      ctx.answerInlineQuery(telegramResults.slice(0,50))
    })
  }
}



module.exports = PogoGymsBotModule
