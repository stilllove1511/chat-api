import { Server, Socket } from 'socket.io'

export interface ServerToClientEvents {
    receiveMessageEvent: (message: string) => void
}

export interface ClientToServerEvents {
    incomeMessageEvent: (message: string) => void
}

export type SocketType = Socket<ClientToServerEvents, ServerToClientEvents>

export type ServerType = Server<ClientToServerEvents, ServerToClientEvents>
