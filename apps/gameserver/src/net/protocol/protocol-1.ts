import { DynWriter, Reader } from 'binlingo'

import { Player } from '../../player'
import { Protocol } from './protocol'

export class Protocol1 extends Protocol {
    static readonly id = 1

    sendHello(player: Player) {
        const writer = new DynWriter()

        writer.writeUint8(0)
        writer.writeUint32(player.id)

        this.send(writer.finalize())
    }

    onMessage(reader: Reader) {
        if (reader.length === 0) {
            return this.connection.close()
        }

        const op = reader.readUint8()
    }
}
