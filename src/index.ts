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
    const userId = socket.handshake.headers.user as string
    const receiverId = socket.handshake.query.receiver as string

    socket.join(userId)

    socket.on('sendMessage', (message) => {
        socket.to(receiverId).emit('receiveMessage', message)
    })
})

io.listen(3000)
