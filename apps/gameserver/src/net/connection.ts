import { Reader } from 'binlingo'
import { WebSocket } from 'ws'

import { Player } from '../player'
import { rand } from '../utils/math.utils'
import { Listener } from './listener'
import { Protocol } from './protocol/protocol'
import { bufferToArrayBuffer } from './util/binary'

let lastId = 0

export class Connection {
    readonly id = lastId++

    protocol: Protocol | null = null
    player: Player | null = null

    heartbeatInterval = 0

    #missedHeartbeats = 0
    #lastHeartbeatCheckAt = 0

    constructor(readonly listener: Listener, readonly socket: WebSocket) {}

    start() {
        this.#createHeartbeatInterval()
        this.#addListeners()
    }

    update(now: number) {
        if (this.#missedHeartbeats > 2) {
            this.close()
        }

        if (now - this.#lastHeartbeatCheckAt > this.heartbeatInterval) {
            this.#missedHeartbeats++
            this.#lastHeartbeatCheckAt = now
        }
    }

    #addListeners() {
        this.socket.addListener('message', this.#onMessage.bind(this))
        this.socket.addListener('close', this.#onClose.bind(this))
    }

    #removeListeners() {
        this.socket.removeAllListeners('message')
        this.socket.removeAllListeners('close')
    }

    #createHeartbeatInterval() {
        this.heartbeatInterval = rand(
            this.listener.opts.heartbeatIntervalMin,
            this.listener.opts.heartbeatIntervalMax
        )
    }

    #decideProtocol(reader: Reader) {
        const protocol = this.listener.protocols.decide(this, reader)

        if (protocol) {
            this.protocol = protocol
            this.sendHello(this.createPlayer())
        } else {
            this.close()
        }
    }

    createPlayer() {
        if (this.player) {
            throw new Error('connection already has player')
        }

        this.player = this.listener.gameserver.createPlayer(this)

        return this.player
    }

    removePlayer() {
        if (!this.player) {
            throw new Error('connection does not have a player')
        }

        this.listener.gameserver.removePlayer(this.player)
    }

    send(data: any) {
        this.socket.send(data)
    }

    close(code?: number, data?: string | Buffer) {
        this.#removeListeners()
        this.socket.close(code, data)
        this.#onClose()
    }

    sendHello(player: Player) {
        this.protocol?.sendHello(player)
    }

    sendHeartbeatAck() {
        this.protocol?.sendHeartbeatAck()
    }

    onHeartbeat() {
        this.#missedHeartbeats = 0
        this.sendHeartbeatAck()
    }

    #onMessage(data: any) {
        if (data instanceof Buffer) {
            data = bufferToArrayBuffer(data)
        }

        if (data instanceof ArrayBuffer) {
            const reader = new Reader(data)

            if (reader.length === 0) {
                return this.close()
            }

            if (this.protocol) {
                this.protocol.onMessage(reader)
            } else {
                this.#decideProtocol(reader)
            }
        }
    }

    #onClose() {
        if (this.player) {
            this.removePlayer()
        }

        this.#removeListeners()
        this.listener.handleConnectionClose(this)
    }
}
