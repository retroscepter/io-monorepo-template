import { DynWriter, Reader } from 'binlingo'
import { FunctionComponent, useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket'

import { CONNECTION_URL } from '../../const/connection'

export const GameConnection: FunctionComponent = () => {
    const [heartbeatTimer, setHeartbeatTimer] = useState<NodeJS.Timer | null>(
        null
    )

    const { sendMessage, lastMessage } = useWebSocket(CONNECTION_URL, {
        onOpen: () => onOpen(),
        onClose: () => onClose(),
        shouldReconnect: () => true
    })

    useEffect(() => {
        if (lastMessage !== null) {
            onMessageEvent(lastMessage)
        }
    }, [lastMessage])

    const createHeartbeatTimer = (interval: number) => {
        if (heartbeatTimer !== null) {
            removeHeartbeatTimer()
        }

        setHeartbeatTimer(setInterval(sendHeartbeat, interval))
    }

    const removeHeartbeatTimer = () => {
        if (heartbeatTimer !== null) {
            clearInterval(heartbeatTimer)
            setHeartbeatTimer(null)
        }
    }

    const sendProtocol = () => {
        const writer = new DynWriter()

        writer.writeUint8(1)

        sendMessage(writer.finalize())
    }

    const sendHeartbeat = () => {
        const writer = new DynWriter()

        writer.writeUint8(0)

        sendMessage(writer.finalize())
    }

    const onOpen = () => {
        sendProtocol()
    }

    const onClose = () => {
        removeHeartbeatTimer()
    }

    const onMessageEvent = async (event: MessageEvent) => {
        if (event.data instanceof Blob) {
            const arrayBuffer = await event.data.arrayBuffer()
            const reader = new Reader(arrayBuffer)

            onMessage(reader)
        }
    }

    const onMessage = (reader: Reader) => {
        const op = reader.readUint8()

        switch (op) {
            case 0:
                return onHello(reader)
            case 1:
                return onHeartbeatAck()
        }
    }

    const onHello = (reader: Reader) => {
        const heartbeatInterval = reader.readUint16()
        const playerId = reader.readUint32()

        sendHeartbeat()
        createHeartbeatTimer(heartbeatInterval)

        console.log({ heartbeatInterval, playerId })
    }

    const onHeartbeatAck = () => {
        console.log('heartbeat ack')
    }

    return null
}
