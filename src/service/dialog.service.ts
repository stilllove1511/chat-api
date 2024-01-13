import { PrismaClient } from 'generated/client'

export class DialogService {
    private readonly db: PrismaClient = new PrismaClient()

    findAllDialogs(cond: { userId: string }) {
        return this.db.dialog.findMany({
            where: {
                users: {
                    some: {
                        id: cond.userId,
                    },
                },
            },
        })
    }

    createDialog(dialog: { userIds: string[] }) {
        return this.db.dialog.create({
            data: {
                users: {
                    connect: dialog.userIds.map((userId) => ({
                        id: userId,
                    })),
                },
            },
        })
    }
}
