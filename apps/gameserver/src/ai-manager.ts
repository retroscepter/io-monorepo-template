import { Gameserver } from './gameserver'
import { PlayerAI } from './player-ai'
import { AIOpts } from './types/ai-opts.interface'

export class AIManager {
    readonly aiPlayers = new Map<number, PlayerAI>()

    #updateTimer: NodeJS.Timer | null = null

    constructor(readonly gameserver: Gameserver, readonly opts: AIOpts) {}

    start() {
        this.#createUpdateTimer()
        this.#createDefaultPlayers()
    }

    stop() {
        this.removeAllPlayers()
        this.#removeUpdateTimer()
    }

    update() {
        for (const [, player] of this.aiPlayers) {
            player.update()
        }
    }

    #createUpdateTimer() {
        if (this.#updateTimer) {
            this.#removeUpdateTimer()
        }

        this.#updateTimer = setInterval(
            this.update.bind(this),
            this.opts.updateInterval
        )
    }

    #removeUpdateTimer() {
        if (this.#updateTimer) {
            clearInterval(this.#updateTimer)
            this.#updateTimer = null
        }
    }

    #createDefaultPlayers() {
        for (let i = 0; i < this.opts.count; i++) {
            this.createPlayer()
        }
    }

    createPlayer() {
        const player = new PlayerAI(this.gameserver)

        this.aiPlayers.set(player.id, player)
        this.gameserver.addPlayer(player)

        return player
    }

    removePlayer(aiPlayer: PlayerAI) {
        this.aiPlayers.delete(aiPlayer.id)
        this.gameserver.removePlayer(aiPlayer)
    }

    removeAllPlayers() {
        for (const [, player] of this.aiPlayers) {
            this.removePlayer(player)
        }
    }
}
