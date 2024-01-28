import { Server, Socket } from 'socket.io'
import { Request } from 'express'
import { SOCKET_EVENT } from '@src/util/enum'

export interface ServerToClientEvents {
    [SOCKET_EVENT.SERVER_SEND_MESSAGE_EVENT]: (message: string) => void
}

export interface ClientToServerEvents {
    [SOCKET_EVENT.CLIENT_SEND_MESSAGE_EVENT]: (message: string) => void
}

export type SocketType = Socket<ClientToServerEvents, ServerToClientEvents>

export type ServerType = Server<ClientToServerEvents, ServerToClientEvents>

export type AppBodyRequest<Body> = Request & {
    body: Body
}

export type AppQueryRequest<Query> = Request & {
    query: Request['query'] & Query
}
