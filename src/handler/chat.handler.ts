import { DialogService } from '@src/service/dialog.service'
import { MessageService } from '@src/service/message.service'
import { SocketType } from '@src/util/type'

const messageService = new MessageService()
const dialogService = new DialogService()

export class ChatHandler {
    chat(socket: SocketType) {
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
    }

    async initDialog(socket: SocketType) {
        const userId = socket.handshake.headers.user as string
        const chatWith = socket.handshake.query.chatWith as string
        const message = socket.handshake.query.message as string
        socket.join(userId)

        const dialog = await dialogService.createDialog({
            userIds: [userId, chatWith],
        })

        socket.join(dialog.id)

        socket.to(dialog.id).emit('receiveMessageEvent', message)

        messageService.saveMessages({
            text: message,
            userId,
            dialogId: dialog.id,
        })
    }
}
