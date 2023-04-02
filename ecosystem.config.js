const { join } = require('path')

const config = require('./config/config.json')

const gameserverDir = join(__dirname, 'apps/gameserver')
const gameserverScript = join(gameserverDir, 'dist/main.js')

let gameserverApp = null

if (config.gameserver) {
    const gameserverConfigPath = config.gameserver.config

    gameserverApp = {
        name: withNamePrefix('gameserver'),
        script: gameserverScript,
        env: {
            CONFIG_PATH: gameserverConfigPath
        }
    }
}

function withNamePrefix(name) {
    return `${config.name}-${name}`
}

module.exports = {
    apps: [gameserverApp]
}
