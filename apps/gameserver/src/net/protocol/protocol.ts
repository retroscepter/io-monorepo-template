import { Reader } from 'binlingo'

import { Player } from '../../player'
import { Connection } from '../connection'

export class Protocol {
    static readonly id: number = 0

    constructor(readonly connection: Connection) {}

    send(data: any) {
        this.connection.send(data)
    }

    sendHello(player: Player) {
        throw new Error('Protocol#onHello should be implemented')
    }

    onMessage(reader: Reader) {
        throw new Error('Protocol#onMessage should be implemented')
    }
}
