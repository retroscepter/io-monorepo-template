import { Supermap } from 'supersets'

import { Gameserver } from '../gameserver'
import { Player } from '../player'

let lastId = 0

export class Match {
    readonly id = lastId++

    readonly players = new Supermap<number, Player>()

    constructor(readonly gameserver: Gameserver) {}

    start() {
        // Nothing here
    }

    addPlayer(player: Player) {
        if (this.players.has(player.id)) {
            throw new Error('player is already at table')
        }

        if (player.match !== null && player.match !== this) {
            throw new Error('player is at another table')
        }

        this.players.set(player.id, player)

        player.match = this
    }

    removePlayer(player: Player) {
        if (!this.players.has(player.id) || player.match !== this) {
            throw new Error('player is not at table')
        }

        player.match = null

        this.players.delete(player.id)
    }
}
