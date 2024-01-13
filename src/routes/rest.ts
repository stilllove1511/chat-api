import { AccountController } from '@src/controller/account.controller'
import { DialogController } from '@src/controller/dialog.controller'
import { Request, Response } from 'express'
import { Application } from 'express'

const accountController = new AccountController()
const dialogController = new DialogController()

export const configRestPath = (app: Application) => {
    app.get('/health_check', (req: Request, res: Response) => {
        res.send('OK')
    })

    app.post('/account/login', accountController.login)
    app.post('/account/register', accountController.register)

    app.get('/dialog/get_all', dialogController.findAllDialogs, ()=>{
        console.log('error')
    })
}
