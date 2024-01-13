import { AccountService } from '@src/service/account.service'
import { Request, Response } from 'express'

const accountService = new AccountService()
export class AccountController {
    async login(req: Request, res: Response) {
        const { id } = req.body

        const user = await accountService.finOneUser({ id })

        if (!user) {
            return res.status(401).json({
                message: 'Username or password is incorrect',
            })
        }

        return res.json(user)
    }

    async register(req: Request, res: Response) {
        const { id } = req.body
        const user = await accountService.createUser({ id: id, password: '1' })

        return res.json(user)
    }
}
