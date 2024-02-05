import { PrismaClient } from '@prisma/client'
import { ServerType } from '../util/type'
import { chatController } from '../core/controller'

const db = new PrismaClient()
export const configSocketPath = (io: ServerType) => {
    io.on('connection', chatController.chat.bind(chatController))
}
