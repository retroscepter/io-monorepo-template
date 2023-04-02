import { readFileSync } from 'fs'

import { GameserverOpts } from './types/gameserver-opts.interface'

export const configLoader = (): GameserverOpts => {
    if (process.env.CONFIG_PATH) {
        const configPath = process.env.CONFIG_PATH
        const configData = readFileSync(configPath, { encoding: 'utf-8' })

        return JSON.parse(configData)
    }

    return {
        listener: {
            port: parseInt(process.env.LISTENER_PORT || '8080'),
            host: process.env.LISTENER_HOST || '0.0.0.0',
            updateInterval: parseInt(
                process.env.LISTENER_UPDATE_INTERVAL || '100'
            ),
            heartbeatIntervalMin: parseInt(
                process.env.LISTENER_HEARTBEAT_INTERVAL_MIN || '1000'
            ),
            heartbeatIntervalMax: parseInt(
                process.env.LISTENER_HEARTBEAT_INTERVAL_MAX || '3000'
            )
        },
        ai: {
            count: parseInt(process.env.AI_COUNT || '10'),
            updateInterval: parseInt(process.env.AI_UPDATE_INTERVAL || '100')
        }
    }
}
