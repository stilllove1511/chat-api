import { PrismaClient } from 'generated/client'

export class MessageService {
    constructor(private readonly db: PrismaClient) {}

    saveMessages({
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
}
