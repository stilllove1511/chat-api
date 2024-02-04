import { PrismaClient } from '@prisma/client'
import { ChatController } from '../controller/chat.controller'
import { MessageService } from '../service/message.service'
import { ServerType } from '../util/type'

const db = new PrismaClient()
const messageService = new MessageService(db)
const chatController = new ChatController(messageService)
export const configSocketPath = (io: ServerType) => {
    io.on('connection', chatController.chat.bind(chatController))
}
