import { PrismaClient } from 'generated/client'

export class UserService {
    private readonly db: PrismaClient = new PrismaClient()

    async finOneUser({ id }: { id: string }) {
        return this.db.user.findFirst({
            where: {
                id: id,
            },
        })
    }

    async createUser({ id, password }: { id: string; password: string }) {
        return this.db.user.create({
            data: {
                id: id,
                password: password,
            },
        })
    }
}