import { Request, Response } from 'express'
import { DialogService } from '../service/dialog.service'
import { AppBodyRequest } from '../util/type'

export class DialogController {
    constructor(private readonly dialogService: DialogService) {}

    async findAllDialogs(req: Request, res: Response) {
        const userId = req.headers.authorization
        const dialogs = await this.dialogService.findAllDialogs({
            userId: userId,
        })

        return res.json(dialogs)
    }

    async getDialogMessages(req: Request, res: Response) {
        const dialogId = req.params.id as string
        const { page, limit } = req.query as { page: string; limit: string }

        const dialog = await this.dialogService.findDialogWithMessages(
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

    async createDialog(
        req: AppBodyRequest<{
            userIds: string[]
        }>,
        res: Response
    ) {
        const { userIds } = req.body

        const dialogFind = await this.dialogService.findByUserIds(userIds)

        if (dialogFind) {
            return res.status(400).json({
                message: 'Dialog already exist',
            })
        }

        const dialog = await this.dialogService.createDialog({
            userIds,
        })

        return res.json(dialog)
    }
}
