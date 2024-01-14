import { PrismaClient } from 'generated/client'

export class MessageService {
    private readonly db = new PrismaClient()

    async saveMessages({
        text,
        userId,
        dialogId,
    }: {
        text: string
        userId: string
        dialogId: string
    }) {
        return this.db.message.create({
            data: {
                text,
                user: {
                    connect: {
                        id: userId,
                    },
                },
                dialog: {
                    connect: {
                        id: dialogId,
                    },
                },
            },
        })
    }

    getDialogMessages(
        cond: { dialogId: string },
        options: { skip: number; take: number }
    ) {
        return this.db.message.findMany({
            where: {
                dialogId: cond.dialogId,
            },
            take: options.take,
            skip: options.skip,
            orderBy: {
                createdAt: 'desc',
            },
        })
    }
}
