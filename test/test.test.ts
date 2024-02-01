import { describe, expect } from '@jest/globals'
import { PrismaClient } from '@root/generated/client'
import { UserController } from '@src/controller/user.controller'
import { UserService } from '@src/service/user.service'

describe('test', () => {
    it('test', async () => {
        const db = new PrismaClient()
        const userService = new UserService(db)
        const userController = new UserController(userService)
        const key = 'test'
        jest.spyOn(db.user, 'findMany').mockImplementation(
            () =>
                new Promise((resolve) => {
                    resolve([
                        {
                            id: key,
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
                id: key,
            },
        ])
    })
})
