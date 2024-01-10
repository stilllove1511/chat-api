import { Server } from 'socket.io'
import { EventLogger } from './config/logging'

interface ServerToClientEvents {
    receiveMessage: (message: string) => void
}

interface ClientToServerEvents {
    chat: (id: string) => void
    sendMessage: (message: string) => void
}

const io = new Server<ClientToServerEvents, ServerToClientEvents>()

new EventLogger(io).config()

io.on('connection', (socket) => {
    // init socket chat dialog
    socket.on('chat', (dialogId) => {
        socket.join(dialogId)
        socket.on('sendMessage', (message) => {
            socket.to(dialogId).emit('receiveMessage', message)
        })
    })
})

io.listen(3000)
