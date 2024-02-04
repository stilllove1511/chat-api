import { PrismaClient } from '@prisma/client'

export class UserService {
    constructor(private readonly db: PrismaClient) {}

    finOneUser({ id }: { id: string }) {
        return this.db.user.findFirst({
            where: {
                id: id,
            },
        })
    }

    createUser({ id, password }: { id: string; password: string }) {
        return this.db.user.create({
            data: {
                id: id,
                password: password,
            },
        })
    }

    searchUser({ id }: { id: string }) {
        return this.db.user.findMany({
            where: {
                id: {
                    contains: id,
                },
            },
            select: {
                id: true,
            },
        })
    }

    getFCMToken({ id }: { id: string }) {
        return this.db.user.findFirst({
            where: {
                id: id,
            },
            select: {
                FCMToken: true,
            },
        })
    }

    saveFCMToken({ id, FCMToken }: { id: string; FCMToken: string }) {
        return this.db.user.update({
            where: {
                id: id,
            },
            data: {
                FCMToken: FCMToken,
            },
        })
    }
}
