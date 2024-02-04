import { Request, Response } from 'express'
import { Application } from 'express'
import {
    accountController,
    dialogController,
    userController,
} from '../core/controller'

export const configRestPath = (app: Application) => {
    app.get('/health_check', (req: Request, res: Response) => {
        res.send('OK')
    })

    //account
    app.post('/account/login', (req, res) => accountController.login(req, res))
    app.post('/account/register', (req, res) =>
        accountController.register(req, res)
    )

    //dialog
    app.get('/dialog/get_all', (req, res) =>
        dialogController.findAllDialogs(req, res)
    )
    app.get('/dialog/:id/messages', (req, res) =>
        dialogController.getDialogMessages(req, res)
    )
    app.post('/dialog/create', (req, res) =>
        dialogController.createDialog(req, res)
    )

    //user
    app.get('/user/search', (req, res) => userController.search(req, res))
}
