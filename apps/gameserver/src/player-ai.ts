import { Gameserver } from './gameserver'
import { Player } from './player'

export class PlayerAI extends Player {
    constructor(gameserver: Gameserver) {
        super(gameserver)
    }

    get aiOpts() {
        return this.gameserver.ai.opts
    }

    update() {
        // Nothing here
    }
}
