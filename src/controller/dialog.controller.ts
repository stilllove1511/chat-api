import { DialogService } from '@src/service/dialog.service'
import { MessageService } from '@src/service/message.service'
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

    async getDialogMessages(req: Request, res: Response) {
        const dialogId = req.params.id as string
        const { page, limit } = req.query as { page: string; limit: string }

        const dialog = await dialogService.findDialogWithMessages(
            {
                id: dialogId,
            },
            {
                messageSkip: (Number(page) - 1) * Number(limit),
                messagesTake: Number(limit),
            }
        )

        if (!dialog) {
            return res.status(400).json({
                message: 'Dialog not found',
            })
        }

        return res.json(dialog)
    }
}
