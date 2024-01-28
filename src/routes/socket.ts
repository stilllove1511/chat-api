import { ChatController } from '@src/controller/chat.controller'
import { MessageService } from '@src/service/message.service'
import { ServerType } from '@src/util/type'
import { PrismaClient } from 'generated/client'

const db = new PrismaClient()
const messageService = new MessageService(db)
const chatController = new ChatController(messageService)
export const configSocketPath = (io: ServerType) => {
    io.on('connection', chatController.chat.bind(chatController))
}
