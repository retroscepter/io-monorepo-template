import { Reader } from 'binlingo'

import { Connection } from '../connection'
import { Protocol } from './protocol'

export class Protocols {
    readonly #store = new Map<number, typeof Protocol>()

    register(...protocols: (typeof Protocol)[]) {
        for (const protocol of protocols) {
            this.#store.set(protocol.id, protocol)
        }
    }

    decide(connection: Connection, reader: Reader) {
        const id = reader.readUint8()
        const ProtocolMatch = this.#store.get(id)

        return ProtocolMatch ? new ProtocolMatch(connection) : null
    }
}
