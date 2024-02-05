import { PrismaClient } from '@prisma/client'
import { AccountController } from '../controller/account.controller'
import { DialogController } from '../controller/dialog.controller'
import { UserController } from '../controller/user.controller'
import { DialogService } from '../service/dialog.service'
import { UserService } from '../service/user.service'
import { ChatController } from '../controller/chat.controller'
import { NotificationService } from '../service/notification.service'
import { MessageService } from '../service/message.service'

export const db = new PrismaClient()

export const dialogService = new DialogService(db)
export const userService = new UserService(db)
export const messageService = new MessageService(db)
const notificationService = new NotificationService()

export const accountController = new AccountController(userService)
export const dialogController = new DialogController(dialogService)
export const userController = new UserController(userService)
export const chatController = new ChatController(
    messageService,
    notificationService,
    userService,
    dialogService
)
