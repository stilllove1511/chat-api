import { Server, Socket } from 'socket.io'
import { Request, Response } from 'express'
import { SOCKET_EVENT } from '@src/util/enum'

export interface ServerToClientEvents {
    [SOCKET_EVENT.SERVER_SEND_MESSAGE_EVENT]: (message: string) => void
}

export interface ClientToServerEvents {
    [SOCKET_EVENT.CLIENT_SEND_MESSAGE_EVENT]: (message: string) => void
}

export type SocketType = Socket<ClientToServerEvents, ServerToClientEvents>

export type ServerType = Server<ClientToServerEvents, ServerToClientEvents>

export type AppBodyRequest<Body> =
    | Request
    | (Request & {
          body: Body
      })
    | {
          body: Body
      }

export type AppQueryRequest<Query> =
    | Request
    | (Request & {
          query: Request['query'] & Query
      })
    | {
          query: Request['query'] & Query
      }

export type AppResponse<Data = Record<string, any>> =
    | Response
    | {
          json?: (data: Data) => void
          status?: (code: number) => {
              json: (data: Data) => void
          }
      }
