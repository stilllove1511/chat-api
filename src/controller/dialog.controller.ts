import { DialogService } from '@src/service/dialog.service'
import { Request, Response } from 'express'

const dialogService = new DialogService()
export class DialogController {
    async findAllDialogs(req: Request, res: Response) {
        const userId = req.headers.authorization
        const dialogs = await dialogService.findAllDialogs({
            userId: userId,
        })

        return res.json(dialogs)
    }
}
