import { ChatHandler } from '@src/handler/chat.handler'
import { ServerType } from '@src/util/type'

const chatHandler = new ChatHandler()
export const configSocketPath = (io: ServerType) => {
    io.of('/chat').on('connection', chatHandler.chat)

    io.of('/initDialog').on('connection', chatHandler.initDialog)
}
