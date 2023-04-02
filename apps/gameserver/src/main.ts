import { configLoader } from './config'
import { Gameserver } from './gameserver'

function main() {
    const gameserver = new Gameserver(configLoader())

    gameserver.start()
}

main()
