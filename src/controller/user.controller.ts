import { UserService } from '../service/user.service'
import { AppQueryRequest, AppResponse } from '../util/type'

export class UserController {
    constructor(private readonly userService: UserService) {}

    async search(
        req: AppQueryRequest<{
            search: string
        }>,
        res: AppResponse
    ) {
        const { search } = req.query

        const users = await this.userService.searchUser({
            id: search as string,
        })

        return res.json(users)
    }
}
