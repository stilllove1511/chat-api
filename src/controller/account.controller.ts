import { Request, Response } from 'express'
import { UserService } from '../service/user.service'
import { AppBodyRequest } from '../util/type'

export class AccountController {
    constructor(private readonly userService: UserService) {}

    async login(
        req: AppBodyRequest<{
            id: string
            FCMToken: string
        }>,
        res: Response
    ) {
        const { id } = req.body

        const user = await this.userService.finOneUser({ id })

        if (!user) {
            return res.status(401).json({
                message: 'Username or password is incorrect',
            })
        }

        await this.userService.saveFCMToken({
            id,
            FCMToken: req.body.FCMToken,
        })

        return res.json(user)
    }

    async register(req: Request, res: Response) {
        const { id } = req.body
        const user = await this.userService.finOneUser({ id })
        if (user)
            return res.status(400).json({ message: 'User already exists' })

        const userCreated = await this.userService.createUser({
            id: id,
            password: '1',
        })

        return res.json(userCreated)
    }
}
