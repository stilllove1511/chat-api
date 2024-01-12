import { Server, Socket } from 'socket.io'

export interface ServerToClientEvents {
    receiveMessage: (message: string) => void
}

export interface ClientToServerEvents {
    sendMessage: (message: string) => void
}

export type SocketType = Socket<ClientToServerEvents, ServerToClientEvents>

export type ServerType = Server<ClientToServerEvents, ServerToClientEvents>
