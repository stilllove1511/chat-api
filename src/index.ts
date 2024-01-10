import { Server } from 'socket.io'
import { EventLogger } from './config/logging'

interface ServerToClientEvents {
    receiveMessage: (message: string) => void
}

interface ClientToServerEvents {
    sendMessage: (message: string) => void
}

const io = new Server<ClientToServerEvents, ServerToClientEvents>()

new EventLogger(io).config()

io.on('connection', (socket) => {
    const dialogId = socket.handshake.headers.dialogId as string

    socket.join(dialogId)

    socket.on('sendMessage', (message) => {
        io.to(dialogId).emit('receiveMessage', message)
    })
})

io.listen(3000)
