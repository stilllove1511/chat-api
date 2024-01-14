import { ChatHandler } from '@src/handler/chat.handler'
import { ServerType } from '@src/util/type'

const chatHandler = new ChatHandler()
export const configSocketPath = (io: ServerType) => {
    io.on('connection', chatHandler.chat)
}
