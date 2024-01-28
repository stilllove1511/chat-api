import { UserService } from '@src/service/user.service'
import { AppQueryRequest } from '@src/util/type'
import { Request, Response } from 'express'

export class UserController {
    constructor(private readonly userService: UserService) {}

    async search(
        req: AppQueryRequest<{
            search: string
        }>,
        res: Response
    ) {
        const { search } = req.query

        const users = await this.userService.searchUser({ id: search })

        return res.json(users)
    }
}
