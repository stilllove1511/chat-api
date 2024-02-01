import { describe, expect, test } from '@jest/globals'
import { PrismaClient, PrismaPromise } from '@root/generated/client'
import { UserController } from '@src/controller/user.controller'
import { UserService } from '@src/service/user.service'

describe('test', () => {
    it('test', async () => {
        const db = new PrismaClient()
        const userService = new UserService(db)
        const userController = new UserController(userService)
        const searchKey = 'test'
        jest.spyOn(db.user, 'findMany').mockImplementation(
            (key) =>
                new Promise((resolve) => {
                    resolve([
                        {
                            id: searchKey,
                        },
                    ])
                }) as any
        )

        expect(
            await userController.search(
                {
                    query: {
                        search: 'test',
                    },
                },
                {
                    json: (data: any) => data,
                }
            )
        ).toEqual([
            {
                id: searchKey,
            },
        ])
    })
})
