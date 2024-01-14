import { DialogService } from '@src/service/dialog.service'
import { MessageService } from '@src/service/message.service'
import { SocketType } from '@src/util/type'

const messageService = new MessageService()
const dialogService = new DialogService()

export class ChatHandler {
    chat(socket: SocketType) {
        try {
            const userId = socket.handshake.headers.user as string
            const dialogId = socket.handshake.query.dialogId as string

            socket.join(dialogId)

            socket.on('incomeMessageEvent', (message) => {
                socket.to(dialogId).emit('receiveMessageEvent', message)
                messageService.saveMessages({
                    text: message,
                    userId,
                    dialogId: dialogId,
                })
            })
        } catch (error) {
            socket.disconnect()
            console.log('🚀 ~ ChatHandler ~ chat ~ error:', error)
        }
    }

    async initDialog(socket: SocketType) {
        try {
            const userId = socket.handshake.headers.user as string
            const chatWith = socket.handshake.query.chatWith as string
            const message = socket.handshake.query.message as string
            socket.join(userId)

            const dialog = await (async () => {
                const existedDialog = dialogService.findByUserIds([
                    userId,
                    chatWith,
                ])
                if (existedDialog) {
                    return existedDialog
                }

                const newDialog = await dialogService.createDialog({
                    userIds: [userId, chatWith],
                })

                return newDialog
            })()

            socket.join(dialog.id)

            socket.to(dialog.id).emit('receiveMessageEvent', message)

            messageService.saveMessages({
                text: message,
                userId,
                dialogId: dialog.id,
            })

            socket.on('incomeMessageEvent', (message) => {
                socket.to(dialog.id).emit('receiveMessageEvent', message)
                messageService.saveMessages({
                    text: message,
                    userId,
                    dialogId: dialog.id,
                })
            })
        } catch (error) {
            socket.disconnect()
            console.log('🚀 ~ ChatHandler ~ initDialog ~ error:', error)
        }
    }
}
