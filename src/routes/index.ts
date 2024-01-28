import { AccountController } from '@src/controller/account.controller'
import { DialogController } from '@src/controller/dialog.controller'
import { UserController } from '@src/controller/user.controller'
import { DialogService } from '@src/service/dialog.service'
import { UserService } from '@src/service/user.service'
import { Request, Response } from 'express'
import { Application } from 'express'
import { PrismaClient } from 'generated/client'

const db = new PrismaClient()

const dialogService = new DialogService(db)
const userService = new UserService(db)

const accountController = new AccountController(userService)
const dialogController = new DialogController(dialogService)
const userController = new UserController(userService)

export const configRestPath = (app: Application) => {
    app.get('/health_check', (req: Request, res: Response) => {
        res.send('OK')
    })

    //account
    app.post('/account/login', accountController.login.bind(accountController))
    app.post(
        '/account/register',
        accountController.register.bind(accountController)
    )

    //dialog
    app.get(
        '/dialog/get_all',
        dialogController.findAllDialogs.bind(dialogController)
    )
    app.get(
        '/dialog/:id/messages',
        dialogController.getDialogMessages.bind(dialogController)
    )
    app.post(
        '/dialog/create',
        dialogController.createDialog.bind(dialogController)
    )

    //user
    app.get('/user/search', userController.search.bind(accountController))
}
