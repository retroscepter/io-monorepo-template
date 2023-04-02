import { AIManager } from './ai-manager'
import { Match } from './match/match'
import { Connection } from './net/connection'
import { Listener } from './net/listener'
import { Player } from './player'
import { GameserverOpts } from './types/gameserver-opts.interface'

export class Gameserver {
    readonly listener = new Listener(this, this.opts.listener)
    readonly ai = new AIManager(this, this.opts.ai)
    readonly match = new Match(this)

    readonly players = new Map<number, Player>()

    constructor(readonly opts: GameserverOpts) {}

    start() {
        this.listener.start()
        this.match.start()
        this.ai.start()
    }

    stop() {
        this.ai.stop()
        this.match.stop()
        this.listener.stop()
    }

    addPlayer(player: Player) {
        this.players.set(player.id, player)
        this.match.addPlayer(player)
    }

    createPlayer(connection: Connection) {
        const player = new Player(this, connection)
        this.addPlayer(player)

        return player
    }

    removePlayer(player: Player) {
        if (player.match) {
            player.match.removePlayer(player)
        }

        this.players.delete(player.id)
    }
}
