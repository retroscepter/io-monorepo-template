import { DynWriter, Reader } from 'binlingo'
import { FunctionComponent, useEffect } from 'react'
import useWebSocket from 'react-use-websocket'

import { CONNECTION_URL } from '../../const/connection'

export const GameConnection: FunctionComponent = () => {
    const { sendMessage, lastMessage } = useWebSocket(CONNECTION_URL, {
        onOpen: () => sendProtocol(),
        shouldReconnect: () => true
    })

    useEffect(() => {
        if (lastMessage !== null) {
            onMessageEvent(lastMessage)
        }
    }, [lastMessage])

    const sendProtocol = () => {
        const writer = new DynWriter()

        writer.writeUint8(1)

        sendMessage(writer.finalize())
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
    }

    return null
}
