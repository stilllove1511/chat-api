import { MessageService } from '@src/service/message.service'
import { SocketType } from '@src/util/type'

export class ChatHandler {
    private readonly messageService = new MessageService()
    chat(socket: SocketType) {
        const userId = socket.handshake.headers.user as string
        const dialogId = socket.handshake.query.dialogId as string

        socket.join(dialogId)

        socket.on('sendMessage', (message) => {
            socket.to(dialogId).emit('receiveMessage', message)
            this.messageService.saveMessages({
                text: message,
                userId,
                dialogId: dialogId,
            })
        })
    }
}
