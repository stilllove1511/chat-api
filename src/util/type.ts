import { Server, Socket } from 'socket.io'

export interface ServerToClientEvents {
    serverReceiveMessageEvent: (message: string) => void
}

export interface ClientToServerEvents {
    clientSendMessageEvent: (message: string) => void
}

export type SocketType = Socket<ClientToServerEvents, ServerToClientEvents>

export type ServerType = Server<ClientToServerEvents, ServerToClientEvents>
