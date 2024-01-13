import { PrismaClient } from 'generated/client'

export class AccountService {
    private readonly db: PrismaClient = new PrismaClient()

    async finOneUser({ id }: { id: string }) {
        return this.db.user.findFirst({
            where: {
                id: id,
            },
        })
    }

    async createUser({ password }: { password: string }) {
        return this.db.user.create({
            data: {
                password: password,
            },
        })
    }
}
