import { Server } from 'socket.io'

export class EventLogger {
    constructor(private readonly server: Server) {}

    private logEvent() {
        this.server.use((socket, next) => {
            socket.onAny((event, ...args) => {
                console.log(
                    `[${new Date().toLocaleTimeString()}] ${
                        socket.id
                    }: ${event}`
                )
            })

            socket.on('disconnect', (socket) => {
                console.log(
                    `[${new Date().toLocaleTimeString()}] Connection closed`
                )
            })

            next()
        })
    }

    private logConnection() {
        this.server.on('connection', (socket) => {
            console.log(
                `[${new Date().toLocaleTimeString()}] Connection established: ${
                    socket.id
                }`
            )
        })
    }

    public config() {
        this.logEvent()
        this.logConnection()
    }
}
