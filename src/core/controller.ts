import { PrismaClient } from '@root/generated/client'
import { AccountController } from '@src/controller/account.controller'
import { DialogController } from '@src/controller/dialog.controller'
import { UserController } from '@src/controller/user.controller'
import { DialogService } from '@src/service/dialog.service'
import { UserService } from '@src/service/user.service'

export const db = new PrismaClient()

export const dialogService = new DialogService(db)
export const userService = new UserService(db)

export const accountController = new AccountController(userService)
export const dialogController = new DialogController(dialogService)
export const userController = new UserController(userService)
