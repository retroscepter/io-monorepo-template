import { Supermap } from 'supersets'
import { WebSocket, WebSocketServer } from 'ws'

import { Gameserver } from '../gameserver'
import { ListenerOpts } from '../types/listener-opts.interface'
import { Connection } from './connection'
import { DEFAULT_PROTOCOLS } from './const/protocols'
import { Protocols } from './protocol/protocols'

export class Listener {
    server: WebSocketServer | null = null

    readonly protocols = new Protocols()
    readonly connections = new Supermap<number, Connection>()

    constructor(readonly gameserver: Gameserver, readonly opts: ListenerOpts) {}

    start() {
        if (this.server) {
            this.stop()
        }

        this.protocols.register(...DEFAULT_PROTOCOLS)

        this.server = new WebSocketServer({
            port: this.opts.port,
            host: this.opts.host
        })
        this.#addListeners()
    }

    stop() {
        this.#closeAllConnections()
        this.#removeListeners()
        this.server = null
    }

    #addListeners() {
        this.server?.addListener(
            'connection',
            this.#onConnectionOpen.bind(this)
        )
    }

    #removeListeners() {
        this.server?.removeAllListeners('connection')
    }

    #createConnection(socket: WebSocket) {
        const connection = new Connection(this, socket)
        this.connections.set(connection.id, connection)
        connection.start()

        return connection
    }

    #removeConnection(connection: Connection) {
        this.connections.delete(connection.id)
    }

    #closeAllConnections() {
        for (const [, connection] of this.connections) {
            connection.close()
        }
    }

    #onConnectionOpen(socket: WebSocket) {
        this.#createConnection(socket)
    }

    handleConnectionClose(connection: Connection) {
        this.#removeConnection(connection)
    }
}
