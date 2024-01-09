import { Server } from 'socket.io'

interface ServerToClientEvents {
    receiveMessage: (message: string) => void
}

interface ClientToServerEvents {
    joinChat: () => void
    sendMessage: (message: string) => void
}

interface InterServerEvents {}

interface SocketData {
    name: string
    age: number
}

const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>()

io.on('connection', (socket) => {
    console.log('one user connected')

    socket.on('joinChat', () => {
        socket.join('chat')
        console.log('one user joint chat')
    })

    socket.on('sendMessage', (message) => {
        socket.to('chat').emit('receiveMessage', message)
        console.log('one user sendMessage to room:', message)
    })
})

io.listen(3000)
