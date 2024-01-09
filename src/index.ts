import { Server } from 'socket.io'

interface ServerToClientEvents {
    receiveMessage: (message: string) => void
}

interface ClientToServerEvents {
    chat: (id: string) => void
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

// config event logging
io.use((socket, next) => {
    socket.onAny((event, ...args) => {
        // logging with timestamp
        console.log(
            `[${new Date().toLocaleTimeString()}] ${socket.id}: ${event}`
        )
    })

    next()
})


io.on('connection', (socket) => {
    console.log(
        `[${new Date().toLocaleTimeString()}] Connection established: ${
            socket.id
        }`
    )

    // init socket chat dialog
    socket.on('chat', (dialogId) => {
        socket.join(dialogId)
        socket.on('sendMessage', (message) => {
            socket.to(dialogId).emit('receiveMessage', message)
        })
    })
})

// io.on('connection', (socket) => {
//     console.log('one user connected')

//     socket.on('joinChat' as any, () => {
//         socket.join('chat')
//         socket.to('chat').emit('receiveMessage', 'one user connected')
//     })

//     socket.on('sendMessage', (message) => {
//         socket.to('chat').emit('receiveMessage', message)
//     })
// })

io.listen(3000)
