import { MessageService } from '@src/service/message.service'
import { SocketType } from '@src/util/type'

export class ChatController {
    constructor(private readonly messageService: MessageService) {}

    chat(socket: SocketType) {
        try {
            const userId = socket.handshake.headers.authorization as string
            const dialogId = socket.handshake.query.dialogId as string

            socket.join(dialogId)

            socket.on('clientSendMessageEvent', (message) => {
                socket.to(dialogId).emit('serverReceiveMessageEvent', message)
                try {
                    this.messageService.saveMessages({
                        text: message,
                        userId,
                        dialogId: dialogId,
                    })
                } catch (error) {
                    console.log(error)
                }
            })
        } catch (error) {
            socket.disconnect()
            console.log(error)
        }
    }
}
