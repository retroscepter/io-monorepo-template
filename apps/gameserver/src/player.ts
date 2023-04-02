import { Gameserver } from './gameserver'
import { Match } from './match/match'
import { Connection } from './net/connection'

let lastId = 0

export class Player {
    readonly id = lastId++

    match: Match | null = null

    constructor(
        readonly gameserver: Gameserver,
        readonly connection?: Connection
    ) {}
}
