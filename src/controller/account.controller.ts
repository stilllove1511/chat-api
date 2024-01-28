import { UserService } from '@src/service/user.service'
import { Request, Response } from 'express'

export class AccountController {
    constructor(private readonly userService: UserService) {}

    async login(req: Request, res: Response) {
        const { id } = req.body

        const user = await this.userService.finOneUser({ id })

        if (!user) {
            return res.status(401).json({
                message: 'Username or password is incorrect',
            })
        }

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
