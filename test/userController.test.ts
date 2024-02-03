import { describe, expect } from '@jest/globals'
import { UserController } from '@src/controller/user.controller'
import { UserService } from '@src/service/user.service'

describe('userController', () => {
    it('search user', async () => {
        const userService = new UserService(undefined)
        const userController = new UserController(userService)
        const key = 'test'
        const listUser = [
            {
                id: 'test1',
            },
            {
                id: 'test2',
            },
            {
                id: 'test3',
            },
            {
                id: '2132',
            },
            {
                id: '4342',
            },
        ]

        jest.spyOn(userService, 'searchUser').mockImplementation(
            ({ id }) =>
                new Promise((resolve) => {
                    resolve(listUser.filter((user) => user.id.includes(id)))
                }) as any
        )

        expect(
            await userController.search(
                {
                    query: {
                        search: key,
                    },
                },
                {
                    json: (data) => data,
                }
            )
        ).toEqual(listUser.filter((user) => user.id.includes(key)))
    })
})      
