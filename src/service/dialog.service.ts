import { PrismaClient } from 'generated/client'

export class DialogService {
    constructor(private readonly db: PrismaClient) {}

    findAllDialogs(cond: { userId: string }) {
        return this.db.dialog.findMany({
            where: {
                users: {
                    some: {
                        id: cond.userId,
                    },
                },
            },
            include: {
                users: {
                    where: {
                        id: {
                            not: cond.userId,
                        },
                    },
                    select: {
                        id: true,
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
            select: {
                id: true,
                users: {
                    select: {
                        id: true,
                    },
                },
            },
        })
    }

    findDialogWithMessages(
        cond: { id: string },
        option: {
            messagesTake: number
            messageSkip: number
        }
    ) {
        return this.db.dialog.findFirst({
            where: {
                id: cond.id,
            },
            include: {
                messages: {
                    take: option.messagesTake,
                    skip: option.messageSkip,
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
            },
        })
    }

    findByUserIds(userIds: string[]) {
        return this.db.dialog.findFirst({
            where: {
                users: {
                    every: {
                        id: {
                            in: userIds,
                        },
                    },
                },
            },
        })
    }
}
