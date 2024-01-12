import { Server } from 'socket.io'
import { PrismaClient } from 'generated/client'
import { EventLogger } from '@src/config/logging'
import { MessageService } from '@src/service/message.service'

interface ServerToClientEvents {
    receiveMessage: (message: string) => void
}

interface ClientToServerEvents {
    sendMessage: (message: string) => void
}

const io = new Server<ClientToServerEvents, ServerToClientEvents>()

new EventLogger(io).config()

const db = new PrismaClient()

const messageService = new MessageService(db)

io.of('/chat').on('connection', async (socket) => {
    const userId = socket.handshake.headers.user as string
    const dialogId = socket.handshake.query.dialogId as string

    socket.join(dialogId)

    socket.on('sendMessage', (message) => {
        socket.to(dialogId).emit('receiveMessage', message)
        messageService.saveMessages({
            text: message,
            userId,
            dialogId: dialogId,
        })
    })
})

io.listen(3000)
