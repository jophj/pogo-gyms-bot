const BotModuleManager = require('./pogo-gyms-bot/bot-module-manager')

var envConfigs = require('./environment-config.json')
var config = envConfigs.development
if (process.env.NODE_ENV) {
  config = envConfigs[process.env.NODE_ENV] || envConfigs['development']
}

const botModuleManager = new BotModuleManager(config.token);

if (config.botModules.length) {
  config.botModules.forEach(function(botModulePath) {
    const botModule = require(botModulePath)
    botModuleManager.registerBotModule(botModule)
  })
}
