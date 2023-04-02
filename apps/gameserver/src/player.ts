import { Gameserver } from './gameserver'
import { Card } from './match/card'
import { Match } from './match/match'
import { Connection } from './net/connection'

let lastId = 0

export class Player {
    readonly id = lastId++
    readonly hand: Card[] = []

    match: Match | null = null

    constructor(
        readonly gameserver: Gameserver,
        readonly connection?: Connection
    ) {}
}
